(function () {
    var siteConfig = window.rcmiSiteConfig || {};
    var dataBasePath = siteConfig.dataBasePath || ".";

    function resolveDataFile(fileName) {
        if (dataBasePath === "." || dataBasePath === "./" || !dataBasePath) {
            return "./" + fileName;
        }
        if (dataBasePath.charAt(dataBasePath.length - 1) === "/") {
            return dataBasePath + fileName;
        }
        return dataBasePath + "/" + fileName;
    }

    window.workbookContract = {
        workbookFile: "idc_content.xlsx",
        lookups: {
            facultyCategories: ["RCMI Leadership", "RCMI IDC leadership", "IDC Pilot Faculties"],
            summaryLabels: ["Research Interests", "Role & Expertise"],
            researchRowTypes: ["area", "project", "infrastructure"],
            projectStatuses: ["Current", "Archived", "Planned"],
            publicationTypes: ["Journal Article", "Review Article", "Conference Paper", "Book Chapter", "Report", "Preprint", "Other"]
        },
        pages: {
            faculty: {
                title: "Faculty & Researchers",
                description: "Meet our distinguished team of scientists dedicated to advancing health disparities research"
            },
            research: {
                title: "Research Excellence",
                description: "Advancing biomedical science and addressing health disparities through innovative research"
            },
            publications: {
                title: "Publications",
                description: "Browse publications connected to RCMI-supported research projects and investigators."
            }
        },
        datasets: {
            faculty: {
                file: resolveDataFile("faculty.csv"),
                requiredHeaders: [
                    "Faculty ID",
                    "Is Active",
                    "Sort Order",
                    "Full Name",
                    "Category",
                    "Title",
                    "Department",
                    "Summary Label",
                    "Summary Text",
                    "Email",
                    "Fallback Icon"
                ],
                headerMap: {
                    "Faculty ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Full Name": "name",
                    "Category": "category",
                    "Designation": "designation",
                    "Title": "title",
                    "Department": "department",
                    "Summary Label": "summaryLabel",
                    "Summary Text": "summaryText",
                    "Bio": "bio",
                    "Achievements": "achievements",
                    "Funding Highlights": "fundingHighlights",
                    "Spotlight Title": "spotlightTitle",
                    "Spotlight Citation": "spotlightCitation",
                    "Spotlight Abstract": "spotlightAbstract",
                    "Spotlight Funding": "spotlightFunding",
                    "Spotlight URL": "spotlightUrl",
                    "ORCID URL": "orcidUrl",
                    "Google Scholar URL": "googleScholarUrl",
                    "NCBI URL": "ncbiUrl",
                    "Email": "email",
                    "Fallback Icon": "fallbackIcon",
                    "Education 1": "education1",
                    "Education 2": "education2",
                    "Education 3": "education3",
                    "Education 4": "education4",
                    "Tag 1": "tag1",
                    "Tag 2": "tag2",
                    "Tag 3": "tag3",
                    "Tag 4": "tag4",
                    "Tag 5": "tag5",
                    "Tag 6": "tag6",
                    "Highlight Heading": "highlightHeading",
                    "Highlight Text": "highlightText",
                    "Office": "office",
                    "Phone": "phone",
                    "Image Path": "imagePath",
                    "Image Alt Text": "imageAltText",
                    "Internal Notes": "internalNotes",
                    "Year Funded": "yearFunded",
                    "Program Type": "programType"
                }
            },
            research: {
                file: resolveDataFile("research.csv"),
                requiredHeaders: [
                    "Row Type",
                    "Project ID",
                    "Is Active",
                    "Sort Order"
                ],
                conditionalRequired: {
                    area: ["Title", "Summary", "Icon"],
                    project: ["Title", "PI Faculty ID", "PI Name", "Department", "Description"],
                    infrastructure: ["Infrastructure Name", "Description", "Icon"]
                },
                headerMap: {
                    "Row Type": "rowType",
                    "Project ID": "projectId",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Title": "title",
                    "Summary": "summary",
                    "Icon": "icon",
                    "Bullet 1": "bullet1",
                    "Bullet 2": "bullet2",
                    "Bullet 3": "bullet3",
                    "Bullet 4": "bullet4",
                    "Bullet 5": "bullet5",
                    "PI Faculty ID": "piFacultyId",
                    "PI Name": "piName",
                    "Department": "department",
                    "Description": "description",
                    "Tag 1": "tag1",
                    "Tag 2": "tag2",
                    "Tag 3": "tag3",
                    "Tag 4": "tag4",
                    "Project Status": "projectStatus",
                    "Project URL": "projectUrl",
                    "Registry Label": "registryLabel",
                    "Funding Source": "fundingSource",
                    "Grant Number": "grantNumber",
                    "Start Date": "startDate",
                    "End Date": "endDate",
                    "Infrastructure Name": "infrastructureName",
                    "Primary Publication Label": "primaryPublicationLabel",
                    "Primary Publication URL": "primaryPublicationUrl",
                    "Internal Notes": "internalNotes",
                    "Featured Research": "featuredResearch"
                }
            },
            publications: {
                file: resolveDataFile("publications.csv"),
                requiredHeaders: [
                    "Publication ID",
                    "Project ID",
                    "Is Active",
                    "Sort Order",
                    "Title",
                    "Authors",
                    "Year",
                    "Publication Type",
                    "Full Text URL"
                ],
                headerMap: {
                    "Publication ID": "publicationId",
                    "Project ID": "projectId",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Title": "title",
                    "Authors": "authors",
                    "Authors Short": "authorsShort",
                    "Year": "year",
                    "Publication Type": "publicationType",
                    "Department": "department",
                    "Journal or Source": "journalOrSource",
                    "Citation Text": "citationText",
                    "DOI": "doi",
                    "Abstract": "abstract",
                    "Featured Label": "featuredLabel",
                    "Full Text URL": "fullTextUrl",
                    "Project Display Override": "projectDisplayOverride",
                    "Internal Notes": "internalNotes",
                    "Program Type": "programType"
                }
            },
            events: {
                file: resolveDataFile("events.csv"),
                requiredHeaders: [
                    "Event ID",
                    "Is Active",
                    "Sort Order",
                    "Title",
                    "Event Date",
                    "Flyer URL"
                ],
                headerMap: {
                    "Event ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Title": "title",
                    "Series": "series",
                    "Event Date": "eventDate",
                    "End Date": "endDate",
                    "Format": "format",
                    "Description": "description",
                    "Flyer URL": "flyerUrl",
                    "Registration Link": "registrationLink",
                    "Contact": "contact"
                }
            },
            rccLeadership: {
                file: resolveDataFile("rcc/rcc_leadership.csv"),
                requiredHeaders: [
                    "Leader ID",
                    "Is Active",
                    "Sort Order",
                    "Name",
                    "Role",
                    "Title",
                    "Bio"
                ],
                headerMap: {
                    "Leader ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Name": "name",
                    "Role": "role",
                    "Title": "title",
                    "Bio": "bio",
                    "Photo Path": "photoPath",
                    "Photo Alt": "photoAlt"
                }
            },
            rccRoster: {
                file: resolveDataFile("rcc/rcc_roster.csv"),
                requiredHeaders: [
                    "Member ID",
                    "Is Active",
                    "Sort Order",
                    "Name",
                    "Department",
                    "Rank",
                    "Rank Level",
                    "Expertise"
                ],
                headerMap: {
                    "Member ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Name": "name",
                    "Department": "department",
                    "Rank": "rank",
                    "Rank Level": "rankLevel",
                    "Expertise": "expertise",
                    "Is Chair": "isChair",
                    "Initials": "initials",
                    "Photo Path": "photoPath"
                }
            },
            rccStaff: {
                file: resolveDataFile("rcc/rcc_staff.csv"),
                requiredHeaders: [
                    "Staff ID",
                    "Is Active",
                    "Sort Order",
                    "Core",
                    "Name",
                    "Role"
                ],
                headerMap: {
                    "Staff ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Core": "core",
                    "Name": "name",
                    "Role": "role",
                    "Initials": "initials",
                    "Photo Path": "photoPath"
                }
            },
            rccMcbPricingTiers: {
                file: resolveDataFile("rcc/rcc_mcb_pricing_tiers.csv"),
                requiredHeaders: [
                    "Tier ID",
                    "Is Active",
                    "Sort Order",
                    "Label",
                    "Price"
                ],
                headerMap: {
                    "Tier ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Label": "label",
                    "Price": "price",
                    "Period": "period",
                    "Description": "description",
                    "Featured": "featured"
                }
            },
            rccMcbServices: {
                file: resolveDataFile("rcc/rcc_mcb_services.csv"),
                requiredHeaders: [
                    "Row Type",
                    "Category ID",
                    "Is Active",
                    "Sort Order"
                ],
                conditionalRequired: {
                    category: ["Icon", "Title"],
                    item: ["Item ID", "Service Name"]
                },
                headerMap: {
                    "Row Type": "rowType",
                    "Category ID": "categoryId",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Icon": "icon",
                    "Title": "title",
                    "Item ID": "itemId",
                    "Service Name": "serviceName",
                    "Price": "price"
                }
            },
            rccMcbOtherServices: {
                file: resolveDataFile("rcc/rcc_mcb_other_services.csv"),
                requiredHeaders: [
                    "Item ID",
                    "Is Active",
                    "Sort Order",
                    "Icon",
                    "Title",
                    "Description"
                ],
                headerMap: {
                    "Item ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Icon": "icon",
                    "Title": "title",
                    "Description": "description"
                }
            },
            rccArfAnimalHousing: {
                file: resolveDataFile("rcc/rcc_arf_animal_housing.csv"),
                requiredHeaders: [
                    "Row ID",
                    "Is Active",
                    "Sort Order",
                    "Species",
                    "Animal Count"
                ],
                headerMap: {
                    "Row ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Species": "species",
                    "Animals Per Cage": "animalsPerCage",
                    "Cages Per Rack": "cagesPerRack",
                    "Racks": "racks",
                    "Animal Count": "animalCount"
                }
            },
            rccArfEquipment: {
                file: resolveDataFile("rcc/rcc_arf_equipment.csv"),
                requiredHeaders: [
                    "Item ID",
                    "Is Active",
                    "Sort Order",
                    "Icon",
                    "Title",
                    "Description"
                ],
                headerMap: {
                    "Item ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Icon": "icon",
                    "Title": "title",
                    "Description": "description"
                }
            },
            rccArfTraining: {
                file: resolveDataFile("rcc/rcc_arf_training.csv"),
                requiredHeaders: [
                    "Item ID",
                    "Is Active",
                    "Sort Order",
                    "Icon",
                    "Title",
                    "Description",
                    "Frequency"
                ],
                headerMap: {
                    "Item ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Icon": "icon",
                    "Title": "title",
                    "Description": "description",
                    "Frequency": "frequency"
                }
            },
            rccBbsuResources: {
                file: resolveDataFile("rcc/rcc_bbsu_resources.csv"),
                requiredHeaders: [
                    "Item ID",
                    "Is Active",
                    "Sort Order",
                    "Icon",
                    "Title",
                    "Description"
                ],
                headerMap: {
                    "Item ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Icon": "icon",
                    "Title": "title",
                    "Description": "description",
                    "Sub Items": "subItems"
                }
            },
            rccBbsuServices: {
                file: resolveDataFile("rcc/rcc_bbsu_services.csv"),
                requiredHeaders: [
                    "Item ID",
                    "Is Active",
                    "Sort Order",
                    "Text"
                ],
                headerMap: {
                    "Item ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Text": "text"
                }
            },
            rccMcbEquipment: {
                file: resolveDataFile("rcc/rcc_mcb_equipment.csv"),
                requiredHeaders: [
                    "Row Type",
                    "Category ID",
                    "Is Active",
                    "Sort Order"
                ],
                conditionalRequired: {
                    category: ["Icon", "Title"],
                    item: ["Item ID", "Description"]
                },
                headerMap: {
                    "Row Type": "rowType",
                    "Category ID": "categoryId",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Icon": "icon",
                    "Title": "title",
                    "Note": "note",
                    "Open By Default": "openByDefault",
                    "Start Number": "startNumber",
                    "Item ID": "itemId",
                    "Description": "description",
                    "Sub Items": "subItems"
                }
            },
            researchProjects: {
                file: resolveDataFile("research-project/research_projects.csv"),
                requiredHeaders: [
                    "Project ID",
                    "Is Active",
                    "Sort Order",
                    "Project Number",
                    "Card Title",
                    "Full Title",
                    "PI ID"
                ],
                headerMap: {
                    "Project ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Project Number": "projectNumber",
                    "Status": "status",
                    "Card Title": "cardTitle",
                    "Full Title": "fullTitle",
                    "Card Summary": "cardSummary",
                    "Detail Summary": "detailSummary",
                    "Description": "description",
                    "Tag 1": "tag1",
                    "Tag 2": "tag2",
                    "Tag 3": "tag3",
                    "Tag 4": "tag4",
                    "PI ID": "piId",
                    "PI Name": "piName",
                    "Department": "department",
                    "Funding Source": "fundingSource",
                    "Grant Number": "grantNumber",
                    "Start Date": "startDate",
                    "End Date": "endDate",
                    "Link Label 1": "linkLabel1",
                    "Link URL 1": "linkUrl1",
                    "Link Label 2": "linkLabel2",
                    "Link URL 2": "linkUrl2"
                }
            },
            researchProjectPis: {
                file: resolveDataFile("research-project/research_project_pis.csv"),
                requiredHeaders: [
                    "PI ID",
                    "Is Active",
                    "Sort Order",
                    "Name",
                    "Title",
                    "Bio"
                ],
                headerMap: {
                    "PI ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Name": "name",
                    "Title": "title",
                    "Department": "department",
                    "Email": "email",
                    "Photo Path": "photoPath",
                    "Photo Alt": "photoAlt",
                    "Fallback Icon": "fallbackIcon",
                    "Office": "office",
                    "Phone": "phone",
                    "Education 1": "education1",
                    "Education 2": "education2",
                    "Education 3": "education3",
                    "Education 4": "education4",
                    "Tag 1": "tag1",
                    "Tag 2": "tag2",
                    "Tag 3": "tag3",
                    "Tag 4": "tag4",
                    "Tag 5": "tag5",
                    "Tag 6": "tag6",
                    "Highlight Heading": "highlightHeading",
                    "Highlight Text": "highlightText",
                    "Bio": "bio",
                    "Achievements": "achievements",
                    "Funding Highlights": "fundingHighlights",
                    "Spotlight Title": "spotlightTitle",
                    "Spotlight Citation": "spotlightCitation",
                    "Spotlight Abstract": "spotlightAbstract",
                    "Spotlight Funding": "spotlightFunding",
                    "Spotlight URL": "spotlightUrl",
                    "ORCID URL": "orcidUrl",
                    "Google Scholar URL": "googleScholarUrl",
                    "NCBI URL": "ncbiUrl"
                }
            },
            cecTeam: {
                file: resolveDataFile("cec/cec_team.csv"),
                requiredHeaders: [
                    "Member ID",
                    "Is Active",
                    "Sort Order",
                    "Group",
                    "Name"
                ],
                headerMap: {
                    "Member ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Group": "group",
                    "Name": "name",
                    "Badge": "badge",
                    "Designation": "designation",
                    "Photo Path": "photoPath",
                    "Initials": "initials"
                }
            },
            cecTrainingEvents: {
                file: resolveDataFile("cec/cec_training_events.csv"),
                requiredHeaders: [
                    "Event ID",
                    "Is Active",
                    "Sort Order",
                    "Title",
                    "Date"
                ],
                headerMap: {
                    "Event ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Icon": "icon",
                    "Title": "title",
                    "Date": "date",
                    "Description": "description",
                    "Color": "color"
                }
            },
            cecPartners: {
                file: resolveDataFile("cec/cec_partners.csv"),
                requiredHeaders: [
                    "Partner ID",
                    "Is Active",
                    "Sort Order",
                    "Set",
                    "Name"
                ],
                headerMap: {
                    "Partner ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Set": "set",
                    "Name": "name",
                    "Photo Path": "photoPath",
                    "Initials": "initials",
                    "Is Logo": "isLogo",
                    "Profile URL": "profileUrl"
                }
            },
            cecSeedFundingDeadlines: {
                file: resolveDataFile("cec/cec_seed_funding_deadlines.csv"),
                requiredHeaders: [
                    "Deadline ID",
                    "Is Active",
                    "Sort Order",
                    "Award Type",
                    "Year",
                    "Dates"
                ],
                headerMap: {
                    "Deadline ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Award Type": "awardType",
                    "Year": "year",
                    "Dates": "dates"
                }
            },
            cecSeedFundingResources: {
                file: resolveDataFile("cec/cec_seed_funding_resources.csv"),
                requiredHeaders: [
                    "Resource ID",
                    "Is Active",
                    "Sort Order",
                    "Award Type",
                    "Label",
                    "URL"
                ],
                headerMap: {
                    "Resource ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Award Type": "awardType",
                    "Icon": "icon",
                    "Label": "label",
                    "URL": "url"
                }
            },
            cecResourceLinks: {
                file: resolveDataFile("cec/cec_resource_links.csv"),
                requiredHeaders: [
                    "Link ID",
                    "Is Active",
                    "Sort Order",
                    "Group",
                    "Label",
                    "URL"
                ],
                headerMap: {
                    "Link ID": "id",
                    "Is Active": "isActive",
                    "Sort Order": "sortOrder",
                    "Group": "group",
                    "Label": "label",
                    "URL": "url"
                }
            }
        }
    };
})();
