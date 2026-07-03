document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  
  // Scroll behavior
  const handleScroll = () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check on load

  // Mobile menu toggle
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavToggle.classList.toggle('open');
      mobileNavOverlay.classList.toggle('open');
      document.body.style.overflow = mobileNavOverlay.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Mobile dropdown toggle
  const dropdownToggles = document.querySelectorAll('.mobile-nav-overlay .has-dropdown > a');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggle.parentElement.classList.toggle('active');
    });
  });
});
