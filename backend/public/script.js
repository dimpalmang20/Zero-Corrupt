// Scroll to a specific section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  }
  
  // Handle form submission
  function submitReport(event) {
    event.preventDefault();
  
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
  
    alert(`Report Submitted:\nDescription: ${description}\nLocation: ${location}`);
  
    // Clear form fields
    document.getElementById("description").value = "";
    document.getElementById("location").value = "";
  }
  let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  slides.forEach((slide, index) => {
    slide.style.display = 'none';
  });

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = 'block';

  dots.forEach(dot => {
    dot.className = dot.className.replace(' active', '');
  });

  dots[slideIndex - 1].className += ' active';

  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
}


// Scroll to a specific section
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

function redirectToForm(sector) {
  window.location.href = `form.html?sector=${sector}`;
}

document.getElementById("complaint-form")?.addEventListener("submit", function(event) {
  event.preventDefault();
  document.getElementById("success-message").style.display = "block";
});

function initMap() {
  // Create a map centered on India
  const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 20.5937, lng: 78.9629 }, // Coordinates for India
      zoom: 5, // Zoom level
  });

  // Set up the autocomplete feature
  const input = document.getElementById("address");
  const autocomplete = new google.maps.places.Autocomplete(input);

  // Bind autocomplete to map bounds
  autocomplete.bindTo("bounds", map);

  // Add a marker for the selected location
  const marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29),
  });

  // Update the marker and map when a location is selected
  autocomplete.addListener("place_changed", () => {
      marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
          alert("No details available for the selected location!");
          return;
      }

      // Center the map and set the marker
      map.setCenter(place.geometry.location);
      map.setZoom(15); // Zoom into the location
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
  });
  
  }

  const form = document.getElementById('sector-form'); 
const sectorSelect = document.getElementById('sector'); 
const descriptionInput = document.getElementById('description');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const sector = sectorSelect.value;
  const description = descriptionInput.value;

  // Store data in Firestore
  db.collection('Reports')
    .add({
      sector: sector,
      description: description,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() 
    })
    .then(() => {
      alert('Data submitted successfully!');
      // Clear form fields (optional)
      sectorSelect.value = '';
      descriptionInput.value = '';
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert('Error submitting data. Please try again.');
    });
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("Footer Loaded!");
});
