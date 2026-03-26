
(function () {
    var sandboxHelpers = {};

    function getWorkbookContract() {
        if (!window.workbookContract || !window.workbookContract.datasets) {
            console.warn("[Workbook Contract] window.workbookContract is unavailable.");
            return null;
        }
        return window.workbookContract;
    }

    function getDatasetContract(datasetKey) {
        var workbookContract = getWorkbookContract();
        if (!workbookContract || !workbookContract.datasets || !workbookContract.datasets[datasetKey]) {
            console.warn("[Workbook Contract] Missing dataset contract for: " + datasetKey);
            return null;
        }
        return workbookContract.datasets[datasetKey];
    }

    function fetchText(path) {
        return fetch(path).then(function (response) {
            if (!response.ok) {
                console.warn("[Workbook Contract] Missing expected file: " + path + " (" + response.status + ")");
                throw new Error("HTTP " + response.status + " while loading " + path);
            }
            return response.text();
        });
    }

    function parseCsv(text) {
        var rows = [];
        var row = [];
        var cell = "";
        var inQuotes = false;

        for (var index = 0; index < text.length; index += 1) {
            var char = text[index];
            var nextChar = text[index + 1];

            if (char === "\"") {
                if (inQuotes && nextChar === "\"") {
                    cell += "\"";
                    index += 1;
                } else {
                    inQuotes = !inQuotes;
                }
                continue;
            }

            if (char === "," && !inQuotes) {
                row.push(cell);
                cell = "";
                continue;
            }

            if ((char === "\n" || char === "\r") && !inQuotes) {
                if (char === "\r" && nextChar === "\n") {
                    index += 1;
                }
                row.push(cell);
                cell = "";
                if (row.some(function (value) { return value !== ""; })) {
                    rows.push(row);
                }
                row = [];
                continue;
            }

            cell += char;
        }

        if (cell !== "" || row.length) {
            row.push(cell);
            if (row.some(function (value) { return value !== ""; })) {
                rows.push(row);
            }
        }

        if (!rows.length) {
            return { headers: [], records: [] };
        }

        var headers = rows[0].map(function (header) {
            return header.trim();
        });

        var records = rows.slice(1).map(function (values) {
            var record = {};
            headers.forEach(function (header, idx) {
                record[header] = values[idx] !== undefined ? values[idx] : "";
            });
            return record;
        });

        return { headers: headers, records: records };
    }

    function isActiveCell(value) {
        if (typeof value === "boolean") {
            return value;
        }
        return String(value || "").trim().toLowerCase() === "yes";
    }

    function bySortOrder(a, b) {
        return (a.sortOrder || 0) - (b.sortOrder || 0);
    }

    function activeSorted(items) {
        return (items || []).filter(function (item) {
            return item.isActive;
        }).sort(bySortOrder);
    }

    function pickValues(record, keys) {
        return keys.map(function (key) {
            return record[key];
        }).filter(function (value) {
            return String(value || "").trim() !== "";
        });
    }

    function validateHeaders(datasetKey, headers) {
        var contract = getDatasetContract(datasetKey);
        if (!contract) {
            return false;
        }

        var missing = contract.requiredHeaders.filter(function (header) {
            return headers.indexOf(header) === -1;
        });

        if (missing.length) {
            console.warn("[Workbook Contract] " + datasetKey + " is missing required headers: " + missing.join(", "));
        }

        return missing.length === 0;
    }

    function warnMissingConditionalHeaders(datasetKey, rowType, row, rowIndex) {
        var contract = getDatasetContract(datasetKey);
        var expected = [];
        var missing;

        if (contract && contract.conditionalRequired && contract.conditionalRequired[rowType]) {
            expected = contract.conditionalRequired[rowType];
        }

        missing = expected.filter(function (header) {
            return String(row[header] || "").trim() === "";
        });

        if (missing.length) {
            console.warn("[Workbook Contract] " + datasetKey + " row " + (rowIndex + 2) + " (" + rowType + ") is missing required values: " + missing.join(", "));
        }
    }

    function normalizeRow(row, headerMap) {
        var normalized = {};
        Object.keys(headerMap).forEach(function (header) {
            var key = headerMap[header];
            normalized[key] = row[header] !== undefined ? row[header] : "";
        });
        return normalized;
    }

    function loadDataset(datasetKey) {
        var contract = getDatasetContract(datasetKey);

        if (!contract) {
            return Promise.reject(new Error("Missing workbook contract for dataset: " + datasetKey));
        }

        return fetchText(contract.file).then(function (text) {
            var parsed = parseCsv(text);
            validateHeaders(datasetKey, parsed.headers);

            return parsed.records.map(function (row, index) {
                if (datasetKey === "research") {
                    warnMissingConditionalHeaders(datasetKey, row["Row Type"], row, index);
                }
                return normalizeRow(row, contract.headerMap);
            });
        });
    }

    function transformFacultyRecords(rows) {
        return rows.map(function (row) {
            return {
                id: row.id,
                isActive: isActiveCell(row.isActive),
                sortOrder: Number(row.sortOrder) || 0,
                name: row.name || "",
                category: row.category || "",
                title: row.title || "",
                department: row.department || "",
                summaryLabel: row.summaryLabel || "Research Interests",
                summaryText: row.summaryText || "",
                email: row.email || "",
                fallbackIcon: row.fallbackIcon || "ID",
                education: pickValues(row, ["education1", "education2", "education3", "education4"]),
                tags: pickValues(row, ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"]),
                highlightHeading: row.highlightHeading || "",
                highlightText: row.highlightText || "",
                office: row.office || "",
                phone: row.phone || "",
                imagePath: row.imagePath || "",
                imageAltText: row.imageAltText || row.name || ""
            };
        });
    }

    function transformResearchRecords(rows) {
        var areas = [];
        var projects = [];
        var infrastructure = [];

        rows.forEach(function (row) {
            var normalized = {
                id: row.projectId,
                isActive: isActiveCell(row.isActive),
                sortOrder: Number(row.sortOrder) || 0
            };

            if (row.rowType === "area") {
                areas.push({
                    id: normalized.id,
                    isActive: normalized.isActive,
                    sortOrder: normalized.sortOrder,
                    title: row.title || "",
                    summary: row.summary || "",
                    icon: row.icon || "•",
                    bullets: pickValues(row, ["bullet1", "bullet2", "bullet3", "bullet4", "bullet5"])
                });
                return;
            }

            if (row.rowType === "project") {
                projects.push({
                    id: normalized.id,
                    isActive: normalized.isActive,
                    sortOrder: normalized.sortOrder,
                    title: row.title || "",
                    piFacultyId: row.piFacultyId || "",
                    piName: row.piName || "",
                    department: row.department || "",
                    description: row.description || "",
                    tags: pickValues(row, ["tag1", "tag2", "tag3", "tag4"]),
                    projectStatus: row.projectStatus || "Current",
                    projectUrl: row.projectUrl || "",
                    fundingSource: row.fundingSource || "",
                    grantNumber: row.grantNumber || "",
                    startDate: row.startDate || "",
                    endDate: row.endDate || "",
                    primaryPublicationLabel: row.primaryPublicationLabel || "",
                    primaryPublicationUrl: row.primaryPublicationUrl || ""
                });
                return;
            }

            if (row.rowType === "infrastructure") {
                infrastructure.push({
                    id: normalized.id,
                    isActive: normalized.isActive,
                    sortOrder: normalized.sortOrder,
                    name: row.infrastructureName || "",
                    description: row.description || "",
                    icon: row.icon || "•",
                    department: row.department || ""
                });
                return;
            }

            console.warn("[Workbook Contract] research row with unknown Row Type: " + (row.rowType || "(blank)"));
        });

        return { areas: areas, projects: projects, infrastructure: infrastructure };
    }

    function transformPublicationRecords(rows) {
        return rows.map(function (row) {
            return {
                id: row.publicationId,
                projectId: row.projectId || "",
                isActive: isActiveCell(row.isActive),
                sortOrder: Number(row.sortOrder) || 0,
                title: row.title || "",
                authors: row.authors || "",
                authorsShort: row.authorsShort || "",
                year: row.year || "",
                publicationType: row.publicationType || "",
                department: row.department || "",
                journalOrSource: row.journalOrSource || "",
                citationText: row.citationText || "",
                doi: row.doi || "",
                abstract: row.abstract || "",
                featuredLabel: row.featuredLabel || "",
                fullTextUrl: row.fullTextUrl || "",
                projectDisplayOverride: row.projectDisplayOverride || ""
            };
        });
    }

    function buildPublicationIndex(publications) {
        var index = new Map();

        publications.forEach(function (publication) {
            var current;
            if (!publication.isActive) {
                return;
            }
            current = index.get(publication.projectId) || [];
            current.push(publication);
            current.sort(bySortOrder);
            index.set(publication.projectId, current);
        });

        return index;
    }

    function warnMissingProjectLinks(projects, publications) {
        var projectIds = new Set((projects || []).map(function (project) {
            return project.id;
        }).filter(Boolean));

        (publications || []).forEach(function (publication) {
            if (!publication.projectId) {
                console.warn("[Workbook Contract] publication " + (publication.id || "(missing Publication ID)") + " is missing Project ID");
                return;
            }
            if (!projectIds.has(publication.projectId)) {
                console.warn("[Workbook Contract] publication " + (publication.id || "(missing Publication ID)") + " references unknown Project ID: " + publication.projectId);
            }
        });
    }

    function renderTagRow(tags, className) {
        var values = (tags || []).filter(Boolean);
        var resolvedClassName = className || "tag-row";

        if (!values.length) {
            return "";
        }

        return '<div class="' + resolvedClassName + '">' + values.map(function (tag) {
            return '<span class="tag">' + tag + "</span>";
        }).join("") + "</div>";
    }

    function getSiteRoutes() {
        var siteConfig = window.rcmiSiteConfig || {};
        var routes = siteConfig.routes || {};

        return {
            about: routes.about || "../docs/about.html",
            faculty: routes.faculty || "./faculty-prototype.html",
            research: routes.research || "./research-prototype.html",
            publications: routes.publications || "./publications-prototype.html",
            opportunities: routes.opportunities || "../docs/opportunities.html"
        };
    }

    function renderFooter(currentPage) {
        var year = new Date().getFullYear();
        var routes = getSiteRoutes();
        return '\n            <footer class="site-footer">\n                <div class="shell">\n                    <div class="footer-grid">\n                        <div class="footer-block">\n                            <h4>RCMI IDC</h4>\n                            <p>Center for Urban Health Disparities Research and Innovation</p>\n                            <p>Morgan State University</p>\n                        </div>\n                        <div class="footer-block">\n                            <h4>Quick Links</h4>\n                            <a href="' + routes.about + '">About RCMI & IDC</a>\n                            <a href="' + routes.faculty + '"' + (currentPage === "faculty" ? ' aria-current="page"' : "") + '>Faculty & Staff</a>\n                            <a href="' + routes.research + '"' + (currentPage === "research" ? ' aria-current="page"' : "") + '>Research Projects</a>\n                            <a href="' + routes.publications + '"' + (currentPage === "publications" ? ' aria-current="page"' : "") + '>Publications</a>\n                        </div>\n                        <div class="footer-block">\n                            <h4>Contact</h4>\n                            <p>Portage Avenue Campus, Room 113</p>\n                            <p>1700 E Cold Spring Lane</p>\n                            <p>Baltimore, MD 21251</p>\n                            <p>Phone: 443-885-4534</p>\n                        </div>\n                        <div class="footer-block">\n                            <h4>Connect</h4>\n                            <a href="mailto:diane.hughes@morgan.edu">Email Us</a>\n                            <a href="https://www.morgan.edu/rcmi">RCMI Program</a>\n                            <a href="' + routes.opportunities + '">Apply for Funding</a>\n                        </div>\n                    </div>\n                    <div class="footer-note">&copy; ' + year + ' Morgan State University RCMI IDC. All rights reserved.</div>\n                </div>\n            </footer>\n        ';
    }

    sandboxHelpers.loadDataset = loadDataset;
    sandboxHelpers.activeSorted = activeSorted;
    sandboxHelpers.buildPublicationIndex = buildPublicationIndex;
    sandboxHelpers.warnMissingProjectLinks = warnMissingProjectLinks;
    sandboxHelpers.transformFacultyRecords = transformFacultyRecords;
    sandboxHelpers.transformResearchRecords = transformResearchRecords;
    sandboxHelpers.transformPublicationRecords = transformPublicationRecords;
    sandboxHelpers.renderTagRow = renderTagRow;
    sandboxHelpers.renderFooter = renderFooter;

    window.rcmiSandboxHelpers = sandboxHelpers;

})();
