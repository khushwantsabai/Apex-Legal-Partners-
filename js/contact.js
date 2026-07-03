document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page reload

      // Basic validation check
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        statusDiv.textContent = 'Please fill out all required fields.';
        statusDiv.className = 'form-message error';
        return;
      }

      // Simulate a network request / successful submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Show success message
        statusDiv.textContent = 'Thank you! Your message has been sent successfully. We will contact you shortly.';
        statusDiv.className = 'form-message success';
        
        // Reset form
        form.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
          statusDiv.style.display = 'none';
          // reset class to allow re-showing if needed
          setTimeout(() => {
            statusDiv.style.display = '';
            statusDiv.className = 'form-message';
          }, 100);
        }, 5000);

      }, 1500); // 1.5s simulated delay
    });
  }
});
