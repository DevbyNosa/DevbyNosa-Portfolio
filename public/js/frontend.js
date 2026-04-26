
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".middle-nav a");


const observerOptions = {
  root: null, 
  threshold: 0.6, 
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      
      const id = entry.target.getAttribute("id");

     
      navLinks.forEach((link) => {
        link.classList.remove("active");
        
       
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
};


const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

const revealItems = document.querySelectorAll(
  'section[id], .project-card, .service-card, .experience-card, .contact-link, .blog-card, .about-image, .about-text, .contact-form'
);
const revealObserverOptions = {
  root: null,
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px',
};

const revealObserverCallback = (entries, revealObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      revealObserver.unobserve(entry.target);
    }
  });
};

const revealObserver = new IntersectionObserver(revealObserverCallback, revealObserverOptions);
revealItems.forEach((item) => {
  item.classList.add('reveal-hidden');
  revealObserver.observe(item);
});

    // Hamburger menu toggle

  const hamburgerIcon = document.querySelector(".menu-toggle");
  const middleNavBar = document.querySelector(".middle-nav");

  hamburgerIcon.addEventListener("click", () => {
    middleNavBar.classList.toggle("active");
  })
