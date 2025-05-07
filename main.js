const arrow = document.getElementById("next-arrow");
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const next = entry.target.getAttribute("data-next");
      if (next) {
        arrow.href = next;
        arrow.classList.remove("hidden");
      } else {
        arrow.classList.add("hidden");
      }
    }
  });
}, {
  threshold: 0.6
});

sections.forEach(section => observer.observe(section));

function smoothScrollTo(target, duration = 1500) {
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY;
    const distance = end - start;
    const startTime = performance.now();

    function easeInOutQuad(t) {
      return t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
    }

    function scroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(progress);
      window.scrollTo(0, start + distance * eased);

      if (elapsed < duration) {
        requestAnimationFrame(scroll);
      }
    }

    requestAnimationFrame(scroll);
  }

  document.querySelectorAll('a.scroll-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        console.log(target)
        smoothScrollTo(target, 1500); // můžeš si upravit čas v ms
      }
    });
  });

  function resizeSVG() {
    const totalHeight = document.body.scrollHeight;
    const svg = document.getElementById('svg-path');
    svg.style.height = `${totalHeight}px`;
    svg.setAttribute('viewBox', `0 0 1000 ${totalHeight}`);
  }
  
  function updateParallax() {
    const svgBg = document.getElementById('svg-bg');
    const scrollY = window.scrollY;
    // Parallax efekt: čím větší číslo, tím pomalejší posun
    svgBg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
  
  // Při načtení a resize
  window.addEventListener('load', () => {
    resizeSVG();
    updateParallax();
  });
  
  window.addEventListener('resize', resizeSVG);
  window.addEventListener('scroll', updateParallax);
  