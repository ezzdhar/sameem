

const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")

let index = 0

function showSlide(i){

slides.forEach(slide => slide.classList.remove("active"))
dots.forEach(dot => dot.classList.remove("active"))

slides[i].classList.add("active")
dots[i].classList.add("active")

}

document.getElementById("next").onclick = ()=>{

index++

if(index >= slides.length){
index = 0
}

showSlide(index)

}

document.getElementById("prev").onclick = ()=>{

index--

if(index < 0){
index = slides.length - 1
}

showSlide(index)

}

dots.forEach((dot,i)=>{

dot.onclick = ()=>{

index = i
showSlide(index)

}

})




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
    sliding: ["images/fr9.png", "images/fr8.png", "images/fr7.png", "images/fr4.png", "images/fr5.png", "images/fr6.png"  , "images/fr3.png", "images/fr2.png", "images/fr1.png" ],
    casement: ["images/ca1.png" , "images/ca2.png", "images/ca3.png", "images/ca4.png", "images/ca5.png", "images/ca6.png", "images/ca7.png", "images/ca8.png", "images/ca9.png"],
    tilt: ["images/ti1.png", "images/ti2.png", "images/ti3.png", "images/ti4.png", "images/ti5.png", "images/ti6.png", "images/ti7.png", "images/ti8.png", "images/ti9.png"],
    fixed: ["images/fx1.png","images/fx2.png","images/fx3.png","images/fx4.png","images/fx5.png","images/fx6.png","images/fx7.png","images/fx8.png","images/fx9.png"]
  };

  const tabs = document.querySelectorAll(".tab");
  const gallery = document.getElementById("gallery");

  let currentImages = [];
  let currentIndex = 0;

  function renderImages(category) {
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
