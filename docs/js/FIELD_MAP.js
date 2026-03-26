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
            facultyCategories: ["Leadership", "Principal Investigators", "Research Staff"],
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
                    "Title": "title",
                    "Department": "department",
                    "Summary Label": "summaryLabel",
                    "Summary Text": "summaryText",
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
                    "Internal Notes": "internalNotes"
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
                    "Funding Source": "fundingSource",
                    "Grant Number": "grantNumber",
                    "Start Date": "startDate",
                    "End Date": "endDate",
                    "Infrastructure Name": "infrastructureName",
                    "Primary Publication Label": "primaryPublicationLabel",
                    "Primary Publication URL": "primaryPublicationUrl",
                    "Internal Notes": "internalNotes"
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
                    "Internal Notes": "internalNotes"
                }
            }
        }
    };
})();
