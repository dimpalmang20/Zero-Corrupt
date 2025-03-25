// Get Firestore from global scope
const db = window.db;
const addDoc = window.addDoc;
const collection = window.collection;
const serverTimestamp = window.serverTimestamp;

const sectorQuestions = {
    "Public Administration": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Full name of the Official", type: "text" },
        { label: "Department/Office Name", type: "text" },
        { label: "Description of the issue", type: "textarea" },
        { label: "Location (City/Area)", type: "text" },
    ],
    "Healthcare": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Hospital/Clinic Name", type: "text" },
        { label: "Type of Issue (e.g., Negligence, Overcharging)", type: "text" },
        { label: "Staff Involved (Doctor/Nurse Name)", type: "text" },
        { label: "Location (City/Area)", type: "text" },
    ],
    "Education": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "School/College Name", type: "text" },
        { label: "Type of Issue (e.g., Harassment, Poor Infrastructure)", type: "text" },
        { label: "Staff/Department Involved", type: "text" },
        { label: "Location (City/Area)", type: "text" },
    ],
    "Justice System": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Police Station/Court Name", type: "text" },
        { label: "Case Reference (if any)", type: "text" },
        { label: "Type of Issue (e.g., Bribery, Delay)", type: "textarea" },
        { label: "Location (City/Area)", type: "text" },
    ],
    "Environmental Protection": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Type of Issue (e.g., Pollution, Illegal Logging)", type: "text" },
        { label: "Location of Violation", type: "text" },
        { label: "Description of Violation", type: "textarea" },
        { label: "Exact Location Coordinates (optional)", type: "text" },
    ],
    "Womens Safety": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Nature of Complaint (e.g., Harassment, Domestic Violence)", type: "text" },
        { label: "Name of the Accused (if known)", type: "text" },
        { label: "Location (City/Area)", type: "text" },
    ],
    "Agriculture": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Type of Issue (e.g., Fraudulent Seeds, Poor Quality)", type: "text" },
        { label: "Dealer/Organization Name", type: "text" },
        { label: "Description of the Complaint", type: "textarea" },
        { label: "Location (City/Area)", type: "text" },
    ],
    "Cultural Heritage": [
        { label: "Enter you Full Name(Name Middle SirName)", type: "text" },
        { label: "Name of the Site/Monument", type: "text" },
        { label: "Type of Issue (e.g., Defacement, Poor Maintenance)", type: "text" },
        { label: "Description of the Issue", type: "textarea" },
        { label: "Location (City/Area)", type: "text" },
    ],
};

// Get sector from URL
const params = new URLSearchParams(window.location.search);
const sector = params.get("sector");

if (!sector || !sectorQuestions[sector]) {
    document.getElementById("sector-title").innerText = "Invalid Sector";
    alert("Invalid sector selected!");
} else {
    document.getElementById("sector-title").innerText = sector.replace(/-/g, ' ').toUpperCase();
}

const form = document.getElementById("sector-form");
const questions = sectorQuestions[sector];

// Create form fields dynamically
questions.forEach((q) => {
    const label = document.createElement("label");
    label.innerText = q.label;

    const input = document.createElement(q.type === "textarea" ? "textarea" : "input");
    input.type = q.type;
    input.name = q.label.toLowerCase().replace(/\s+/g, '-');

    form.insertBefore(label, form.querySelector("button"));
    form.insertBefore(input, form.querySelector("button"));
});

// Privacy Policy Checkbox
const privacyLink = document.createElement("a");
privacyLink.href = "privacy-policy.pdf";
privacyLink.target = "_blank";
privacyLink.innerText = "View Privacy Policy";

const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.required = true;

const checkboxLabel = document.createElement("label");
checkboxLabel.innerText = " I agree to the Privacy Policy";
checkboxLabel.appendChild(checkbox);

form.insertBefore(privacyLink, form.querySelector("button"));
form.insertBefore(checkbox, form.querySelector("button"));
form.insertBefore(checkboxLabel, form.querySelector("button"));

// Form Submit Event
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page reload

    // Collect form data
    const formData = {};
    let allFieldsValid = true;

    for (const q of sectorQuestions[sector]) {
        const inputName = q.label.toLowerCase().replace(/\s+/g, '-');
        const input = document.querySelector(`[name="${inputName}"]`);

        if (!input || !input.value.trim()) {
            allFieldsValid = false;
            alert(`Please fill the required field: ${q.label}`);

            return; // Stop execution if a field is empty
        }

        formData[inputName] = input.value.trim();
    }

    if (!allFieldsValid) return;

    try {
        // Save data to Firestore
        await addDoc(collection(db, "sectors"), {
            sector: sector,
            data: formData,
            timestamp: serverTimestamp(),
          });
          
        alert("Data submitted successfully!");
        window.location.href = "success.html"; // Redirect to success page
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("An error occurred. Please try again.");
    }
});