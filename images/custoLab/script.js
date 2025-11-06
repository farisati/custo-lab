// Custom Script for Navbar and Hero Animation
document.addEventListener("DOMContentLoaded", () => {
  const backgrounds = document.querySelectorAll('.hero-bg');
  const contents = document.querySelectorAll('.hero-content');
  const indicatorsContainer = document.getElementById('sliderIndicators');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let current = 0;
  const totalSlides = backgrounds.length;

  // Create slider indicators dynamically
  backgrounds.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('indicator');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(dot);
  });

  const indicators = indicatorsContainer.querySelectorAll('button');

  // Function to go to a specific slide
  function goToSlide(index) {
    // Remove active class from all
    backgrounds.forEach(bg => bg.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    indicators.forEach(dot => dot.classList.remove('active'));

    // Add active to selected
    backgrounds[index].classList.add('active');
    contents[index].classList.add('active');
    indicators[index].classList.add('active');

    current = index;
  }

  // Next/Prev controls
  function nextSlide() {
    current = (current + 1) % totalSlides;
    goToSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + totalSlides) % totalSlides;
    goToSlide(current);
  }

  // Auto-slide every 6 seconds
  setInterval(nextSlide, 6000);

  // Add event listeners for buttons
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Start with first slide
  goToSlide(0);

  // 2. Navbar Shrink/Darken on Scroll
  const navbar = document.getElementById('mainNav');
  const shrinkNavbar = () => {
    if (window.scrollY > 100) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  shrinkNavbar();
  window.addEventListener('scroll', shrinkNavbar);

  // 3. Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1200,
      once: true
    });
  }


 


  // toggler action
  const togglerEl = document.getElementById('toggler-id');
  const toggleSlide = document.getElementById('navbarResponsive')

let i = false;
const onClickEvent = () => {
  if (!i) {
    togglerEl.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    
    if (toggleSlide.classList.contains('collapsing')) {
      toggleSlide.classList.remove('collapsing');
    }
    toggleSlide.classList.add('show');
  } else {
    togglerEl.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    
    if (toggleSlide.classList.contains('show')) {
      toggleSlide.classList.remove('show'); 
    }
    toggleSlide.classList.add('collapsing');
  }

  i = !i;
}

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', onClickEvent);
});

togglerEl.addEventListener('click', onClickEvent);


// ✅ Mobile Testimonial Carousel Fix
  const carousel = document.querySelector("#testimonialCarousel");
  if (!carousel) return;

  // Only apply on mobile
  if (window.innerWidth <= 767) {
    const items = carousel.querySelectorAll(".carousel-item");
    const inner = carousel.querySelector(".carousel-inner");

    items.forEach(item => {
      const testimonials = item.querySelectorAll(".col-md-6");
      if (testimonials.length === 2) {
        // Create a new slide for the 2nd testimonial
        const newSlide = document.createElement("div");
        newSlide.classList.add("carousel-item");

        // Move the 2nd testimonial into the new slide
        newSlide.appendChild(testimonials[1]);
        inner.appendChild(newSlide);
      }
    });

    // Make sure the first slide is active
    const firstSlide = inner.querySelector(".carousel-item");
    if (firstSlide) firstSlide.classList.add("active");
  }

});







document.addEventListener('DOMContentLoaded', () => {
  const dots = Array.from(document.querySelectorAll('.slider-dots button'));
  const slides = Array.from(document.querySelectorAll('.hero-bg'));

  // Basic checks
  if (!slides.length) {
    console.warn('No slides found: querySelectorAll(".hero-bg") returned 0.');
    return;
  }
  if (!dots.length) {
    console.warn('No dots found: querySelectorAll(".slider-dots button") returned 0.');
    return;
  }

  // If counts don't match, we use the smaller count but warn dev.
  if (dots.length !== slides.length) {
    console.warn('Mismatch between number of dots and slides.',
      { dots: dots.length, slides: slides.length });
  }

  const count = Math.min(dots.length, slides.length);

  // Find currently active slide (if any)
  let current = slides.findIndex(s => s.classList.contains('active'));
  if (current === -1 || current >= count) current = 0;

  function showSlide(index) {
    // normalize index (wrap-around)
    index = ((index % count) + count) % count;
    slides.forEach((s, i) => {
      if (i < count) s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      if (i < count) d.classList.toggle('active', i === index);
    });
    current = index;
  }

  // Click handlers for dots
  dots.slice(0, count).forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(i);
    });
  });

  // Optional: sync with existing next/prev arrows (if you use them on desktop)
  const nextBtn = document.querySelector('.slider-arrow.next');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  if (nextBtn) nextBtn.addEventListener('click', () => showSlide(current + 1));
  if (prevBtn) prevBtn.addEventListener('click', () => showSlide(current - 1));

  // Optional: autoplay (uncomment to enable)
  // let autoplayInterval = setInterval(() => showSlide(current + 1), 5000);
  // // Pause autoplay when user interacts
  // dots.forEach(d => d.addEventListener('click', () => clearInterval(autoplayInterval)));

  // Initialize UI
  showSlide(current);
});






document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about-section");

  function revealSection() {
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) {
      aboutSection.classList.add("visible");
      window.removeEventListener("scroll", revealSection);
    }
  }

  window.addEventListener("scroll", revealSection);
  revealSection();
});




document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");

  function showCards() {
    const triggerBottom = window.innerHeight * 0.9;

    cards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        // Reduced delay for faster sequence
        setTimeout(() => {
          card.classList.add("show");
        }, index * 300); // was 200ms, now faster
      }
    });
  }

  showCards();
  window.addEventListener("scroll", showCards);
});



document.addEventListener("DOMContentLoaded", () => {
  const features = document.querySelectorAll(".feature-item");

  function showFeatures() {
    const triggerBottom = window.innerHeight * 0.9;

    features.forEach((feature, index) => {
      const featureTop = feature.getBoundingClientRect().top;
      if (featureTop < triggerBottom) {
        // Faster, smoother stagger animation
        setTimeout(() => {
          feature.classList.add("show");
        }, index * 200);
      }
    });
  }

  showFeatures();
  window.addEventListener("scroll", showFeatures);
});



document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });


  const readMoreBtn = document.querySelector(".read-more-btn");
const extraContent = document.querySelector(".extra-content");

// ✅ Disable Read More toggle on mobile (show all content)
if (readMoreBtn && extraContent) {
  if (window.innerWidth <= 768) {
    // On mobile: show full content and hide button
    extraContent.classList.add("show");
    readMoreBtn.style.display = "none";
  } else {
    // On desktop: enable toggle functionality
    readMoreBtn.addEventListener("click", () => {
      extraContent.classList.toggle("show");
      const expanded = extraContent.classList.contains("show");
      readMoreBtn.innerHTML = expanded ? "Read Less " : "Read More ";
    });
  }
}



const cards = document.querySelectorAll('.service-card');
const heading = document.querySelector('.services-section .section-heading');

function revealServices() {
  const windowHeight = window.innerHeight;

  // Animate heading
  if (heading.getBoundingClientRect().top < windowHeight - 50) {
    heading.style.animationPlayState = 'running';
  }

  // Animate cards with stagger
  cards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < windowHeight - 100 && !card.classList.contains('visible')) {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 200); // 200ms stagger
    }
  });
}

window.addEventListener('scroll', revealServices);
window.addEventListener('load', revealServices);
