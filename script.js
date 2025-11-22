/* =========================================================
   MASTER JS FILE  
   - Navbar  
   - Hero Slider  
   - Scroll Animations  
   - Mobile Fixes  
   - Read More Toggle  
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     HERO SLIDERb
  ========================================================= */
  const backgrounds = document.querySelectorAll('.hero-bg');
  const contents = document.querySelectorAll('.hero-content');
  const indicatorsContainer = document.getElementById('sliderIndicators');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let current = 0;
  const totalSlides = backgrounds.length;

  // Create slider indicators
  backgrounds.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('indicator');
    if (index === 0) dot.classList.add('active');

    dot.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(dot);
  });

  const indicators = indicatorsContainer.querySelectorAll('button');

  // Go to specific slide
  function goToSlide(index) {
    backgrounds.forEach(bg => bg.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    indicators.forEach(dot => dot.classList.remove('active'));

    backgrounds[index].classList.add('active');
    contents[index].classList.add('active');
    indicators[index].classList.add('active');

    current = index;
  }

  // Next & Prev
  function nextSlide() {
    current = (current + 1) % totalSlides;
    goToSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + totalSlides) % totalSlides;
    goToSlide(current);
  }

  // Auto Slide
  setInterval(nextSlide, 6000);

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  goToSlide(0);


  /* =========================================================
     NAVBAR SCROLL EFFECT
  ========================================================= */
  const navbar = document.getElementById('mainNav');

  const shrinkNavbar = () => {
    if (window.scrollY > 100) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };

  shrinkNavbar();
  window.addEventListener('scroll', shrinkNavbar);


  /* =========================================================
     AOS INITIALIZATION
  ========================================================= */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1200,
      once: true
    });
  }


  /* =========================================================
     NAVBAR TOGGLER
  ========================================================= */
  const togglerEl = document.getElementById('toggler-id');
  const toggleSlide = document.getElementById('navbarResponsive');

  let i = false;

  const onClickEvent = () => {
    if (!i) {
      togglerEl.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      toggleSlide.classList.remove('collapsing');
      toggleSlide.classList.add('show');
    } else {
      togglerEl.innerHTML = `<i class="fa-solid fa-bars"></i>`;
      toggleSlide.classList.remove('show');
      toggleSlide.classList.add('collapsing');
    }

    i = !i;
  };

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.addEventListener('click', onClickEvent));
  togglerEl.addEventListener('click', onClickEvent);


  /* =========================================================
     MOBILE TESTIMONIAL CAROUSEL FIX
  ========================================================= */
  const carousel = document.querySelector("#testimonialCarousel");

  if (carousel && window.innerWidth <= 767) {
    const items = carousel.querySelectorAll(".carousel-item");
    const inner = carousel.querySelector(".carousel-inner");

    items.forEach(item => {
      const testimonials = item.querySelectorAll(".col-md-6");

      if (testimonials.length === 2) {
        const newSlide = document.createElement("div");
        newSlide.classList.add("carousel-item");
        newSlide.appendChild(testimonials[1]);
        inner.appendChild(newSlide);
      }
    });

    const firstSlide = inner.querySelector(".carousel-item");
    if (firstSlide) firstSlide.classList.add("active");
  }

});
  

/* =========================================================
   HERO DOTS LOGIC (2nd Script)
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const dots = Array.from(document.querySelectorAll('.slider-dots button'));
  const slides = Array.from(document.querySelectorAll('.hero-bg'));

  if (!slides.length) {
    console.warn('No slides found.');
    return;
  }
  if (!dots.length) {
    console.warn('No dots found.');
    return;
  }

  if (dots.length !== slides.length) {
    console.warn('Mismatch.', { dots: dots.length, slides: slides.length });
  }

  const count = Math.min(dots.length, slides.length);
  let current = slides.findIndex(s => s.classList.contains('active'));

  if (current === -1 || current >= count) current = 0;

  function showSlide(index) {
    index = ((index % count) + count) % count;

    slides.forEach((s, i) =>
      i < count && s.classList.toggle('active', i === index)
    );
    dots.forEach((d, i) =>
      i < count && d.classList.toggle('active', i === index)
    );

    current = index;
  }

  dots.slice(0, count).forEach((dot, i) => {
    dot.addEventListener('click', e => {
      e.preventDefault();
      showSlide(i);
    });
  });

  const nextBtn = document.querySelector('.slider-arrow.next');
  const prevBtn = document.querySelector('.slider-arrow.prev');

  nextBtn?.addEventListener('click', () => showSlide(current + 1));
  prevBtn?.addEventListener('click', () => showSlide(current - 1));

  showSlide(current);
});


/* =========================================================
   ABOUT SECTION REVEAL
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about-section");

  function revealSection() {
    if (aboutSection.getBoundingClientRect().top < window.innerHeight - 150) {
      aboutSection.classList.add("visible");
      window.removeEventListener("scroll", revealSection);
    }
  }

  window.addEventListener("scroll", revealSection);
  revealSection();
});


/* =========================================================
   SERVICE CARD ANIMATION
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");

  function showCards() {
    const triggerBottom = window.innerHeight * 0.9;

    cards.forEach((card, index) => {
      if (card.getBoundingClientRect().top < triggerBottom) {
        setTimeout(() => card.classList.add("show"), index * 300);
      }
    });
  }

  showCards();
  window.addEventListener("scroll", showCards);
});


/* =========================================================
   FEATURE ITEMS ANIMATION
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const features = document.querySelectorAll(".feature-item");

  function showFeatures() {
    const triggerBottom = window.innerHeight * 0.9;

    features.forEach((feature, index) => {
      if (feature.getBoundingClientRect().top < triggerBottom) {
        setTimeout(() => feature.classList.add("show"), index * 200);
      }
    });
  }

  showFeatures();
  window.addEventListener("scroll", showFeatures);
});


/* =========================================================
   CLOSE NAVBAR ON LINK CLICK (BOOTSTRAP)
========================================================= */
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});


/* =========================================================
   READ MORE BUTTON
========================================================= */
const readMoreBtn = document.querySelector(".read-more-btn");
const extraContent = document.querySelector(".extra-content");

if (readMoreBtn && extraContent) {
  if (window.innerWidth <= 768) {
    extraContent.classList.add("show");
    readMoreBtn.style.display = "none";
  } else {
    readMoreBtn.addEventListener("click", () => {
      extraContent.classList.toggle("show");
      readMoreBtn.innerHTML =
        extraContent.classList.contains("show") ? "Read Less " : "Read More ";
    });
  }
}


/* =========================================================
   SERVICE SECTION HEADING + CARDS
========================================================= */
const cards = document.querySelectorAll('.service-card');
const heading = document.querySelector('.services-section .section-heading');

function revealServices() {
  const windowHeight = window.innerHeight;

  if (heading.getBoundingClientRect().top < windowHeight - 50) {
    heading.style.animationPlayState = 'running';
  }

  cards.forEach((card, index) => {
    if (card.getBoundingClientRect().top < windowHeight - 100 &&
        !card.classList.contains('visible')) {

      setTimeout(() => card.classList.add('visible'), index * 200);
    }
  });
}

window.addEventListener('scroll', revealServices);
window.addEventListener('load', revealServices);
