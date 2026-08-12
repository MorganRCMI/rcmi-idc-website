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
        workbookFile: "rcmi_content.xlsx",
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
            }
        }
    };
})();
