// DOM Elements
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const mobileToggle = document.getElementById("mobile-toggle");
const navMenu = document.getElementById("nav-menu");
const menuFilters = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll(".menu-item");
const contactForm = document.querySelector(".contact-form");
const newsletterForm = document.querySelector(".newsletter-form");

// Navbar scroll effect
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const correspondingLink = document.querySelector(
      `.nav-link[href="#${sectionId}"]`,
    );

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (correspondingLink) {
        correspondingLink.classList.add("active");
      }
    }
  });
}

// Smooth scroll to sections
function handleSmoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href");

  if (targetId.startsWith("#")) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  // Close mobile menu if open
  navMenu.classList.remove("active");
  mobileToggle.classList.remove("active");
}

// Mobile menu toggle
function toggleMobileMenu() {
  navMenu.classList.toggle("active");
  mobileToggle.classList.toggle("active");
}

// Menu filtering
function filterMenuItems(category) {
  menuItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");

    if (category === "all" || itemCategory === category) {
      item.style.display = "block";
      item.classList.add("fade-in");
    } else {
      item.style.display = "none";
      item.classList.remove("fade-in");
    }
  });
}

// Handle menu filter clicks
function handleFilterClick(e) {
  const category = this.getAttribute("data-category");

  // Update active filter button
  menuFilters.forEach((btn) => btn.classList.remove("active"));
  this.classList.add("active");

  // Filter menu items
  filterMenuItems(category);
}

// Handle contact form submission
function handleContactFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Basic validation
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Simulate form submission
  alert("Thank you for your message! We'll get back to you soon.");
  this.reset();
}

// Handle newsletter form submission
function handleNewsletterSubmit(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const email = formData.get("email");

  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate subscription
  alert("Thank you for subscribing to our newsletter!");
  this.reset();
}

// Add to cart functionality (placeholder)
function handleAddToCart(e) {
  e.preventDefault();
  const menuItem = this.closest(".menu-item");
  const itemTitle = menuItem.querySelector(".menu-item-title").textContent;

  // Simulate adding to cart
  alert(`${itemTitle} has been added to your cart!`);
}

// Order online button click
function handleOrderClick(e) {
  e.preventDefault();
  // Simulate order process
  alert("Redirecting to our ordering system...");
}

// Intersection Observer for animations
function createIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll(
    ".menu-item, .location-card, .testimonial-card, .about-img, .hero-img",
  );

  elementsToAnimate.forEach((el) => observer.observe(el));
}

// Initialize everything when DOM is loaded
function init() {
  // Event listeners for scroll effects
  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    updateActiveNavLink();
  });

  // Event listeners for navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", handleSmoothScroll);
  });

  // Mobile menu toggle
  mobileToggle.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      navMenu.classList.remove("active");
      mobileToggle.classList.remove("active");
    }
  });

  // Menu filtering
  menuFilters.forEach((btn) => {
    btn.addEventListener("click", handleFilterClick);
  });

  // Add to cart buttons
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", handleAddToCart);
  });

  // Order online buttons
  const orderBtns = document.querySelectorAll(".order-btn, .primary-btn");
  orderBtns.forEach((btn) => {
    if (btn.textContent.includes("Order")) {
      btn.addEventListener("click", handleOrderClick);
    }
  });

  // Form submissions
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit);
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSubmit);
  }

  // View Menu button scroll to menu section
  const viewMenuBtns = document.querySelectorAll(".secondary-btn");
  viewMenuBtns.forEach((btn) => {
    if (btn.textContent.includes("Menu")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const menuSection = document.querySelector("#menu");
        if (menuSection) {
          const offsetTop = menuSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    }
  });

  // Initialize intersection observer for animations
  createIntersectionObserver();

  // Set initial active nav link
  updateActiveNavLink();
}

// Enhanced mobile menu styles (injected via JavaScript for better UX)
function addMobileMenuStyles() {
  const style = document.createElement("style");
  style.textContent = `
        @media (max-width: 767px) {
            .nav-menu {
                position: fixed;
                top: 100%;
                left: 0;
                right: 0;
                background-color: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                padding: var(--spacing-lg);
                box-shadow: var(--shadow-lg);
                flex-direction: column;
                gap: var(--spacing-md);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all var(--transition-normal);
                z-index: 999;
            }
            
            .nav-menu.active {
                display: flex;
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
  document.head.appendChild(style);
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    addMobileMenuStyles();
    init();
  });
} else {
  addMobileMenuStyles();
  init();
}

// Add smooth page transitions
window.addEventListener("beforeunload", () => {
  document.body.style.opacity = "0";
});

// Preload hero images for better performance
function preloadImages() {
  const imageUrls = [
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&crop=center",
  ];

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// Initialize image preloading
preloadImages();
