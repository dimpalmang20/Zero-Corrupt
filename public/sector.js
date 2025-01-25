const sectorQuestions = {
    "Public Administration": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Full name of the Official", type: "text" },
        { label: "Department/Office Name", type: "text" },
        { label: "Description of the issue", type: "textarea" },
        { label: "Upload proof (photo/video)", type: "file" },
        { label: "Location (City/Area)", type: "text" },
    ],
    "Healthcare": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Hospital/Clinic Name", type: "text" },
        { label: "Type of Issue (e.g., Negligence, Overcharging)", type: "text" },
        { label: "Staff Involved (Doctor/Nurse Name)", type: "text" },
        { label: "Upload proof (photo/video)", type: "file" },
        { label: "Location (City/Area)", type: "text" },
    ],
    "Education": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "School/College Name", type: "text" },
        { label: "Type of Issue (e.g., Harassment, Poor Infrastructure)", type: "text" },
        { label: "Staff/Department Involved", type: "text" },
        { label: "Upload proof (photo/video)", type: "file" },
        { label: "Location (City/Area)", type: "text" },
    ],
    "Justice System": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Police Station/Court Name", type: "text" },
        { label: "Case Reference (if any)", type: "text" },
        { label: "Type of Issue (e.g., Bribery, Delay)", type: "textarea" },
        { label: "Upload proof (photo/video)", type: "file" },
        { label: "Location (City/Area)", type: "text" },
    ],
    "Environmental Protection": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Type of Issue (e.g., Pollution, Illegal Logging)", type: "text" },
        { label: "Location of Violation", type: "text" },
        { label: "Description of Violation", type: "textarea" },
        { label: "Upload proof (photo/video)", type: "file" },
        { label: "Exact Location Coordinates (optional)", type: "text" },
    ],
    "Womens Safety": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Nature of Complaint (e.g., Harassment, Domestic Violence)", type: "text" },
        { label: "Name of the Accused (if known)", type: "text" },
        { label: "Upload proof (photo/video)", type: "file" },
        { label: "Location (City/Area)", type: "text" },
    ],
    "Agriculture": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Type of Issue (e.g., Fraudulent Seeds, Poor Quality)", type: "text" },
        { label: "Dealer/Organization Name", type: "text" },
        { label: "Description of the Complaint", type: "textarea" },
        { label: "Upload proof (photo/video)", type: "file" },
        { label: "Location (City/Area)", type: "text" },
    ],
    "Cultural Heritage": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Name of the Site/Monument", type: "text" },
        { label: "Type of Issue (e.g., Defacement, Poor Maintenance)", type: "text" },
        { label: "Description of the Issue", type: "textarea" },
        { label: "Upload proof (photo/video)", type: "file" },
        { label: "Location (City/Area)", type: "text" },
    ],
};

const params = new URLSearchParams(window.location.search);
const sector = params.get("sector");

document.getElementById("sector-title").innerText = sector.replace(/-/g, ' ').toUpperCase();

const form = document.getElementById("sector-form");
const questions = sectorQuestions[sector];

questions.forEach((q) => {
    const label = document.createElement("label");
    label.innerText = q.label;

    const input = document.createElement(q.type === "textarea" ? "textarea" : "input");
    input.type = q.type;
    input.name = q.label.toLowerCase().replace(/\s+/g, '-');

    form.insertBefore(label, form.querySelector("button"));
    form.insertBefore(input, form.querySelector("button"));
});

// Add Privacy Policy and Checkbox
const privacyLink = document.createElement("a");
privacyLink.href = "privacy-policy.pdf";
privacyLink.target = "_blank";
privacyLink.innerText = "View Privacy Policy";

const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.required = true;

const checkboxLabel = document.createElement("label");
checkboxLabel.innerText = " I agree to the Privacy Policy";

form.insertBefore(privacyLink, form.querySelector("button"));
form.insertBefore(checkbox, form.querySelector("button"));
form.insertBefore(checkboxLabel, form.querySelector("button"));
