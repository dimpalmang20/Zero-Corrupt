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
