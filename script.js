document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero-slider .slide");
  const dots = document.querySelectorAll(".hero-slider .dot");
  const title = document.getElementById("hero-title");
  const desc = document.getElementById("hero-desc");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  let current = 0;

  if (slides.length === 0) return; 

  function showSlide(index){
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === current);
      slide.style.zIndex = i === current ? 1 : 0;
    });

    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));

    if (title) title.innerText = slides[current].dataset.title || "";
    if (desc) desc.innerText = slides[current].dataset.desc || "";
  }

  if (nextBtn) nextBtn.addEventListener("click", () => showSlide(current + 1));
  if (prevBtn) prevBtn.addEventListener("click", () => showSlide(current - 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

  const autoSlide = setInterval(() => showSlide(current + 1), 5000);

  showSlide(0); 
});


// customer section
document.addEventListener("DOMContentLoaded", () => {
    const testimonialSlides = document.querySelectorAll(".testimonial-slider .slide");
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");
    
    let testimonialIndex = 0;
    
    function showTestimonial(i) {
        testimonialSlides.forEach(slide => slide.classList.remove("active"));
        testimonialSlides[i].classList.add("active");
    }
    
  
    rightArrow?.addEventListener("click", () => {
        testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
        showTestimonial(testimonialIndex);
    });
    
    leftArrow?.addEventListener("click", () => {
        testimonialIndex = (testimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonial(testimonialIndex);
    });
    
    setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
        showTestimonial(testimonialIndex);
    }, 2000);
});


  const elements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));


// windo page

    document.addEventListener("DOMContentLoaded", function () {

  const imagesData = {
    sliding: ["images/fr3.png", "images/fr2.png", "images/fr1.png", "images/fr4.png", "images/fr5.png", "images/fr6.png"  , "images/fr7.png", "images/fr8.png", "images/fr9.png", "images/fr11.png", "images/fr22.png", "images/fr33.png", "images/fr99.png"  ],
    casement: ["images/ca1.png" , "images/ca2.png", "images/ca3.png", "images/ca4.png", "images/ca5.png", "images/ca6.png", "images/ca7.png", "images/ca8.png", "images/ca9.png"],
    tilt: ["images/ti1.png", "images/ti2.png", "images/ti3.png", "images/ti4.png", "images/ti5.png", "images/ti6.png", "images/ti7.png", "images/ti8.png", "images/ti9.png", "images/tii1.png", "images/tii2.png", "images/tii3.png"],
    fixed: ["images/fx1.png","images/fx2.png","images/fx3.png","images/fx4.png","images/fx5.png","images/fx6.png","images/fx7.png","images/fx8.png","images/fx9.png"]
  };

  const tabs = document.querySelectorAll(".tab");
  const gallery = document.getElementById("gallery");

  let currentImages = [];
  let currentIndex = 0;

  function renderImages(category) {
    if (!gallery) return;
    gallery.innerHTML = "";
    currentImages = imagesData[category];

    currentImages.forEach((src, index) => {
      const div = document.createElement("div");
      div.className = "overflow-hidden rounded-xl cursor-pointer";

      div.innerHTML = `
        <img src="${src}" 
             class="w-full h-64  hover:scale-105 transition duration-300"
             onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
      `;

      div.onclick = () => openLightbox(index);

      gallery.appendChild(div);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-category");
      renderImages(category);
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  function openLightbox(index) {
    currentIndex = index;
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    lightboxImg.src = currentImages[currentIndex];
  }

  document.getElementById("close").onclick = () => {
    lightbox.classList.add("hidden");
  };

  document.getElementById("next").onclick = () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex];
  };

  document.getElementById("prev").onclick = () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex];
  };


  renderImages("sliding");

    });

// kitchen page gallery
    document.addEventListener("DOMContentLoaded", function () {
      if (!document.body.classList.contains("kitchen-page")) return;

      const kitchenImages = [
        "images/kit1.png",
        "images/kit2.png",
        "images/kit3.png",
        "images/kit4.png",
        "images/kit5.png",
        "images/kit6.png",
        "images/kit7.png",
        "images/kit8.png",
        "images/kit9.png"
      ];

      const gallery = document.getElementById("gallery");
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightboxImg");
      let currentIndex = 0;

      function renderKitchenGallery() {
        if (!gallery) return;
        gallery.innerHTML = "";

        kitchenImages.forEach((src, index) => {
          const div = document.createElement("div");
          div.className = "overflow-hidden rounded-xl cursor-pointer";

          div.innerHTML = `
            <img src="${src}"
                 class="w-full h-64 md:h-72 object-cover hover:scale-105 transition duration-300"
                 onerror="this.src='https://via.placeholder.com/500x400?text=Image+Not+Found'">
          `;

          div.onclick = () => openLightbox(index);
          gallery.appendChild(div);
        });
      }

      function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = kitchenImages[currentIndex];
        lightbox.classList.remove("hidden");
        lightbox.classList.add("flex");
      }

      document.getElementById("close").onclick = () => {
        lightbox.classList.add("hidden");
      };

      document.getElementById("next").onclick = () => {
        currentIndex = (currentIndex + 1) % kitchenImages.length;
        lightboxImg.src = kitchenImages[currentIndex];
      };

      document.getElementById("prev").onclick = () => {
        currentIndex = (currentIndex - 1 + kitchenImages.length) % kitchenImages.length;
        lightboxImg.src = kitchenImages[currentIndex];
      };

      lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
          lightbox.classList.add("hidden");
        }
      });

      renderKitchenGallery();
    });
