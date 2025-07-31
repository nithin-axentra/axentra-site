// Initialize EmailJS with your public key
document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("yzevaxhNLSHzs1nYz");
  }

  // Elements
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const openBtn = document.getElementById('open-contact');
  const popup = document.getElementById('contact-popup');
  const emailBtn = document.getElementById('open-form');
  const emailModal = document.getElementById('email-modal');
  const closeModal = document.getElementById('close-modal');
  const form = document.getElementById('contactForm');
  const statusDiv = document.getElementById('form-status');

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Toggle contact popup
  openBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
  });

  // Open email modal
  emailBtn.addEventListener('click', () => {
    emailModal.style.display = 'block';
    popup.style.display = 'none';
    statusDiv.textContent = '';
    emailModal.setAttribute('aria-hidden', 'false');
  });

  // Close modal
  closeModal.addEventListener('click', () => {
    emailModal.style.display = 'none';
    emailModal.setAttribute('aria-hidden', 'true');
  });

  // Click outside popup to close
  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target) && e.target !== openBtn) {
      popup.style.display = 'none';
    }
  });

  // Form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    statusDiv.style.color = '#333';
    statusDiv.textContent = 'Sending...';

    emailjs.send("service_zxu1ddf", "template_0r9mzoh", {
      from_name: this.from_name.value,
      from_phone: this.from_phone.value,
      message: this.message.value,
    })
    .then(function(response) {
      statusDiv.style.color = 'green';
      statusDiv.textContent = 'Message sent! We will get back to you soon.';
      form.reset();
      setTimeout(() => {
        emailModal.style.display = 'none';
        emailModal.setAttribute('aria-hidden', 'true');
      }, 1400);
    }, function(error) {
      statusDiv.style.color = 'red';
      statusDiv.textContent = 'Failed to send. Please try again or email directly at axentra.cx@gmail.com';
      console.error('EmailJS error:', error);
    });
  });

  // Mobile dropdown toggles
  document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth < 992) {
        e.preventDefault();
        const dropdown = link.parentNode.querySelector('.dropdown-content');
        dropdown.classList.toggle('active');
      }
    });
  });
});