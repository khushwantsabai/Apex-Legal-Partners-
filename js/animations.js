document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll reveals
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.classList.add('active');
      
      // If it's a grid container with cards, stagger them
      if (entry.target.classList.contains('grid') || entry.target.classList.contains('testimonial-grid') || entry.target.classList.contains('why-grid')) {
        const children = Array.from(entry.target.children);
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.1}s`;
          child.classList.add('active');
        });
      }

      observer.unobserve(entry.target);
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterOptions = { threshold: 0.5 };
  
  const runCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        el.innerText = Math.ceil(current) + (el.getAttribute('data-suffix') || '');
        requestAnimationFrame(updateCounter);
      } else {
        el.innerText = target + (el.getAttribute('data-suffix') || '');
      }
    };
    updateCounter();
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, counterOptions);

  statNumbers.forEach(num => {
    // Add raw number to data-target, e.g. "25+" -> data-target="25" data-suffix="+"
    const text = num.innerText;
    const val = parseInt(text);
    const suffix = text.replace(/[0-9,]/g, '');
    num.setAttribute('data-target', val);
    num.setAttribute('data-suffix', suffix);
    num.innerText = "0" + suffix;
    counterObserver.observe(num);
  });

  // Page Transition Logic
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Ignore links that open in a new tab, empty links, or anchor links on the same page
      if (
        link.target === '_blank' || 
        href.startsWith('#') || 
        href === '' || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:')
      ) {
        return;
      }
      
      // If it's an internal link, intercept it
      if (href.endsWith('.html') || !href.includes('//')) {
        e.preventDefault();
        document.body.classList.add('fade-out');
        
        setTimeout(() => {
          window.location.href = href;
        }, 300); // 300ms matches the fadeOutPage animation duration
      }
    });
  });
});
