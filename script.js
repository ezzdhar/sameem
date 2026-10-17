document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero-slider .slide");
  const dots = document.querySelectorAll(".hero-slider .dot");
  const title = document.getElementById("hero-title");
  const desc = document.getElementById("hero-desc");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  let current = 0;
  let autoSlide;

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

  function restartTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => showSlide(current + 1), 5000);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(current + 1);
      restartTimer();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(current - 1);
      restartTimer();
    });
  }
  dots.forEach((dot, i) => dot.addEventListener("click", () => {
    showSlide(i);
    restartTimer();
  }));

  autoSlide = setInterval(() => showSlide(current + 1), 5000);
  showSlide(0); 
});

// Mobile menu & slider arrow hiding
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const closeMenu = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove("hidden");
    document.body.classList.add("menu-open");
  }

  function closeMenuHandler() {
    mobileMenu.classList.add("hidden");
    document.body.classList.remove("menu-open");
  }

  menuBtn?.addEventListener("click", openMenu);
  closeMenu?.addEventListener("click", closeMenuHandler);

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenuHandler);
  });
});

// Active nav link highlighter across all pages
document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-menu a, #mobileMenu nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPath = href.split("/").pop();

    const isMatch = (linkPath === currentPath) || 
                    ((currentPath === "" || currentPath === "/") && linkPath === "index.html") ||
                    (currentPath === "kitchen.html" && linkPath === "windo.html");

    if (isMatch) {
      link.classList.add("active");
    }
  });
});

// Testimonials section
document.addEventListener("DOMContentLoaded", () => {
  const testimonialSlides = document.querySelectorAll(".testimonial-slider .slide");
  const nextBtn = document.querySelector(".arrow.arrow-next, .arrow.left");
  const prevBtn = document.querySelector(".arrow.arrow-prev, .arrow.right");
  
  if (testimonialSlides.length === 0) return;
  
  let testimonialIndex = 0;
  let testInterval;
  
  function showTestimonial(i) {
    testimonialIndex = (i + testimonialSlides.length) % testimonialSlides.length;
    testimonialSlides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === testimonialIndex);
    });
  }
  
  function resetTestInterval() {
    clearInterval(testInterval);
    testInterval = setInterval(() => {
      showTestimonial(testimonialIndex + 1);
    }, 4500);
  }
  
  // In RTL: next arrow advances to next testimonial, prev goes to previous
  nextBtn?.addEventListener("click", () => {
    showTestimonial(testimonialIndex + 1);
    resetTestInterval();
  });
  
  prevBtn?.addEventListener("click", () => {
    showTestimonial(testimonialIndex - 1);
    resetTestInterval();
  });
  
  testInterval = setInterval(() => {
    showTestimonial(testimonialIndex + 1);
  }, 4500);

  const wrapper = document.querySelector(".testimonial-wrapper");
  wrapper?.addEventListener("mouseenter", () => clearInterval(testInterval));
  wrapper?.addEventListener("mouseleave", () => resetTestInterval());
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
  let isLightboxOpen = false;
  let touchStart = 0, touchEnd = 0;

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
  
  // Create counter element if it doesn't exist
  if (!document.querySelector(".lightbox-counter")) {
    const counter = document.createElement("div");
    counter.className = "lightbox-counter";
    lightbox.appendChild(counter);
  }
  const counter = document.querySelector(".lightbox-counter");

  function updateCounter() {
    counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  }

  function openLightbox(index) {
    currentIndex = index;
    isLightboxOpen = true;
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    lightboxImg.src = currentImages[currentIndex];
    updateCounter();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    isLightboxOpen = false;
    document.body.style.overflow = "auto";
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex];
    updateCounter();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex];
    updateCounter();
  }

  document.getElementById("close").onclick = closeLightbox;
  document.getElementById("next").onclick = nextImage;
  document.getElementById("prev").onclick = prevImage;

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!isLightboxOpen) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextImage();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      prevImage();
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeLightbox();
    }
  });

  // Click on background to close
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Touch/Swipe support for mobile
  lightbox.addEventListener("touchstart", (e) => {
    touchStart = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (e) => {
    touchEnd = e.changedTouches[0].screenX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  });

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
      let isLightboxOpen = false;
      let touchStart = 0, touchEnd = 0;

      // Create counter element if it doesn't exist
      if (!document.querySelector(".lightbox-counter")) {
        const counter = document.createElement("div");
        counter.className = "lightbox-counter";
        lightbox.appendChild(counter);
      }
      const counter = document.querySelector(".lightbox-counter");

      function updateCounter() {
        counter.textContent = `${currentIndex + 1} / ${kitchenImages.length}`;
      }

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
        isLightboxOpen = true;
        lightboxImg.src = kitchenImages[currentIndex];
        lightbox.classList.remove("hidden");
        lightbox.classList.add("flex");
        updateCounter();
        document.body.style.overflow = "hidden";
      }

      function closeLightbox() {
        lightbox.classList.add("hidden");
        lightbox.classList.remove("flex");
        isLightboxOpen = false;
        document.body.style.overflow = "auto";
      }

      function nextImage() {
        currentIndex = (currentIndex + 1) % kitchenImages.length;
        lightboxImg.src = kitchenImages[currentIndex];
        updateCounter();
      }

      function prevImage() {
        currentIndex = (currentIndex - 1 + kitchenImages.length) % kitchenImages.length;
        lightboxImg.src = kitchenImages[currentIndex];
        updateCounter();
      }

      document.getElementById("close").onclick = closeLightbox;

      document.getElementById("next").onclick = nextImage;

      document.getElementById("prev").onclick = prevImage;

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (!isLightboxOpen) return;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          nextImage();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          prevImage();
        } else if (e.key === "Escape") {
          e.preventDefault();
          closeLightbox();
        }
      });

      // Click on background to close
      lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });

      // Touch/Swipe support for mobile
      lightbox.addEventListener("touchstart", (e) => {
        touchStart = e.changedTouches[0].screenX;
      });

      lightbox.addEventListener("touchend", (e) => {
        touchEnd = e.changedTouches[0].screenX;
        const diff = touchStart - touchEnd;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            nextImage();
          } else {
            prevImage();
          }
        }
      });

      renderKitchenGallery();
    });

// Contact Form Validation and Submission Handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const btnSpinner = document.getElementById("btnSpinner");
  const formStatus = document.getElementById("formStatus");

  const fields = {
    firstName: {
      input: document.getElementById("firstName"),
      error: document.getElementById("firstNameError"),
      validate: (val) => {
        val = val.trim();
        if (!val) return "يرجى إدخال الاسم الأول.";
        if (val.length < 2) return "الاسم الأول يجب أن يحتوي على حرفين على الأقل.";
        if (!/^[A-Za-z\u0600-\u06FF\s]+$/.test(val)) return "الاسم الأول يجب أن يحتوي على حروف فقط بدون أرقام أو رموز.";
        return "";
      }
    },
    lastName: {
      input: document.getElementById("lastName"),
      error: document.getElementById("lastNameError"),
      validate: (val) => {
        val = val.trim();
        if (!val) return "يرجى إدخال الاسم الأخير.";
        if (val.length < 2) return "الاسم الأخير يجب أن يحتوي على حرفين على الأقل.";
        if (!/^[A-Za-z\u0600-\u06FF\s]+$/.test(val)) return "الاسم الأخير يجب أن يحتوي على حروف فقط بدون أرقام أو رموز.";
        return "";
      }
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("emailError"),
      validate: (val) => {
        val = val.trim();
        if (!val) return "يرجى إدخال البريد الإلكتروني.";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(val)) return "صيغة البريد الإلكتروني غير صحيحة (مثال: name@example.com).";
        return "";
      }
    },
    phone: {
      input: document.getElementById("phone"),
      error: document.getElementById("phoneError"),
      validate: (val) => {
        val = val.trim().replace(/[\s-]/g, "");
        if (!val) return "يرجى إدخال رقم الهاتف.";
        // Egyptian mobile (010, 011, 012, 015) or standard phone format 10-14 digits with optional +20
        const phoneRegex = /^(01[0125][0-9]{8}|(\+?20|0020)?1[0125][0-9]{8}|[0-9]{10,14})$/;
        if (!phoneRegex.test(val)) return "يرجى إدخال رقم هاتف صحيح (مثال: 01012345678).";
        return "";
      }
    },
    message: {
      input: document.getElementById("message"),
      error: document.getElementById("messageError"),
      validate: (val) => {
        val = val.trim();
        if (!val) return "يرجى كتابة رسالتك أو تفاصيل استفسارك.";
        if (val.length < 10) return "يجب أن تحتوي الرسالة على 10 أحرف على الأقل لتوضيح طلبك.";
        return "";
      }
    }
  };

  function showFieldError(key, message) {
    const field = fields[key];
    if (!field || !field.input) return;
    field.input.classList.add("input-error");
    field.input.classList.remove("input-success");
    if (field.error) {
      field.error.innerHTML = `<span>⚠️</span> <span>${message}</span>`;
      field.error.classList.remove("hidden");
    }
  }

  function clearFieldError(key) {
    const field = fields[key];
    if (!field || !field.input) return;
    field.input.classList.remove("input-error");
    field.input.classList.add("input-success");
    if (field.error) {
      field.error.textContent = "";
      field.error.classList.add("hidden");
    }
  }

  function resetFieldState(key) {
    const field = fields[key];
    if (!field || !field.input) return;
    field.input.classList.remove("input-error", "input-success");
    if (field.error) {
      field.error.textContent = "";
      field.error.classList.add("hidden");
    }
  }

  function validateSingleField(key, isTouched = true) {
    const field = fields[key];
    if (!field || !field.input) return true;
    const value = field.input.value;
    const errorMsg = field.validate(value);
    if (errorMsg) {
      if (isTouched) {
        showFieldError(key, errorMsg);
      }
      return false;
    } else {
      if (value.trim()) {
        clearFieldError(key);
      } else {
        resetFieldState(key);
      }
      return true;
    }
  }

  // Attach live input & blur events to each field
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    if (!field.input) return;

    let touched = false;

    field.input.addEventListener("blur", function () {
      touched = true;
      validateSingleField(key, true);
    });

    field.input.addEventListener("input", function () {
      if (touched || field.input.classList.contains("input-error")) {
        validateSingleField(key, true);
      }
    });
  });

  function setStatus(type, message) {
    if (!formStatus) return;
    formStatus.className = "p-4 rounded-xl text-center text-sm font-medium transition-all block";
    if (type === "success") {
      formStatus.classList.add("bg-green-50", "text-green-800", "border", "border-green-200");
    } else if (type === "error") {
      formStatus.classList.add("bg-red-50", "text-red-800", "border", "border-red-200");
    } else if (type === "info") {
      formStatus.classList.add("bg-amber-50", "text-amber-800", "border", "border-amber-200");
    }
    formStatus.innerHTML = message;
    formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function setLoading(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    if (loading) {
      submitBtn.classList.add("opacity-75", "cursor-not-allowed");
      if (btnText) btnText.textContent = "جاري الإرسال...";
      if (btnSpinner) btnSpinner.classList.remove("hidden");
    } else {
      submitBtn.classList.remove("opacity-75", "cursor-not-allowed");
      if (btnText) btnText.textContent = "ابدأ مشروعك الآن";
      if (btnSpinner) btnSpinner.classList.add("hidden");
    }
  }

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    let firstInvalidInput = null;

    Object.keys(fields).forEach((key) => {
      const fieldValid = validateSingleField(key, true);
      if (!fieldValid) {
        isValid = false;
        if (!firstInvalidInput && fields[key].input) {
          firstInvalidInput = fields[key].input;
        }
      }
    });

    if (!isValid) {
      setStatus("error", "⚠️ يرجى تصحيح الأخطاء الموضحة أدناه قبل الإرسال.");
      if (firstInvalidInput) {
        firstInvalidInput.focus();
        firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Hide any previous status
    if (formStatus) formStatus.classList.add("hidden");

    const firstName = fields.firstName.input.value.trim();
    const lastName = fields.lastName.input.value.trim();
    const email = fields.email.input.value.trim();
    const phone = fields.phone.input.value.trim();
    const message = fields.message.input.value.trim();

    setLoading(true);
    setStatus("info", "جاري إرسال رسالتك، يرجى الانتظار...");

    const payload = {
      "الاسم بالكامل": `${firstName} ${lastName}`,
      "الاسم الأول": firstName,
      "الاسم الأخير": lastName,
      "البريد الإلكتروني": email,
      "رقم الهاتف": phone,
      "الرسالة": message,
      _subject: `طلب تواصل جديد من موقع Sameem UPVC: ${firstName} ${lastName}`,
      _template: "table",
      _captcha: "false"
    };

    try {
      const endpoint = "https://formsubmit.co/ajax/info@sameemupvc.com";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success === "true" || data.success === true || data.status === "success")) {
        setStatus(
          "success",
          "🎉 <strong>تم استلام رسالتك بنجاح!</strong><br>شكراً لتواصلك مع صميم UPVC، سنقوم بالرد عليك عبر البريد الإلكتروني أو الهاتف في أقرب وقت."
        );
        contactForm.reset();
        Object.keys(fields).forEach((key) => resetFieldState(key));
      } else {
        const msg = String(data.message || "");
        if (msg.toLowerCase().includes("activate") || msg.toLowerCase().includes("activation")) {
          setStatus(
            "info",
            "📧 <strong>تنبيه تفعيل:</strong> تم إرسال رسالة تفعيل إلى <b>info@sameemupvc.com</b> لأول مرة.<br>يرجى فتح بريد Hostinger والضغط على رابط التفعيل (Activate Form) لمرة واحدة فقط لتصلك جميع الرسائل القادمة تلقائياً."
          );
        } else {
          setStatus(
            "error",
            `⚠️ تعذر إرسال الرسالة تلقائياً. يمكنك التواصل معنا مباشرة عبر <a href="https://api.whatsapp.com/send?phone=201210508418" target="_blank" class="underline font-bold text-[#B18E48]">واتساب</a> أو الاتصال على <a href="tel:+201210508418" class="underline font-bold text-[#B18E48]" dir="ltr">+20 121 050 8418</a>.`
          );
        }
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus(
        "error",
        `⚠️ حدث خطأ في الاتصال. يمكنك مراسلتنا مباشرة على <a href="mailto:info@sameemupvc.com" class="underline font-bold text-[#B18E48]">info@sameemupvc.com</a> أو عبر <a href="https://api.whatsapp.com/send?phone=201210508418" target="_blank" class="underline font-bold text-[#B18E48]">واتساب</a>.`
      );
    } finally {
      setLoading(false);
    }
  });
});
