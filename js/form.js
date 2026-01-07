/* =========================================================
   GREENLIVING STORE — Form Validation
   File: js/form.js
   Purpose:
   - Client-side validation for the Contact/Order form
   - Demonstrates JavaScript DOM manipulation and validation logic
   ========================================================= */

'use strict';

/* ---------- Validation Helpers ---------- */
function isEmail(value) {
  // Simple email pattern suitable for coursework demos
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

function setFieldError(field, message) {
  field.classList.add('field-error');
  const errorEl = field.parentElement.querySelector('.error-text');
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(field) {
  field.classList.remove('field-error');
  const errorEl = field.parentElement.querySelector('.error-text');
  if (errorEl) errorEl.textContent = '';
}

/* ---------- Main Validation ---------- */
function validateContactForm(form) {
  let ok = true;

  const name = form.querySelector('#fullName');
  const email = form.querySelector('#email');
  const phone = form.querySelector('#phone');
  const topic = form.querySelector('#topic');
  const message = form.querySelector('#message');
  const consent = form.querySelector('#consent');

  // Clear previous errors
  [name, email, phone, topic, message].forEach(clearFieldError);

  // Full name
  if (!name.value.trim() || name.value.trim().length < 3) {
    setFieldError(name, 'Please enter your full name (min 3 characters).');
    ok = false;
  }

  // Email
  if (!isEmail(email.value)) {
    setFieldError(email, 'Please enter a valid email address.');
    ok = false;
  }

  // Phone (optional, but validate if present)
  if (phone.value.trim() && !/^\+?[0-9\-\s]{7,15}$/.test(phone.value.trim())) {
    setFieldError(phone, 'Phone should be 7–15 digits (you may include +, spaces, or hyphens).');
    ok = false;
  }

  // Topic
  if (!topic.value) {
    setFieldError(topic, 'Please select a topic.');
    ok = false;
  }

  // Message
  if (!message.value.trim() || message.value.trim().length < 10) {
    setFieldError(message, 'Message should be at least 10 characters.');
    ok = false;
  }

  // Consent checkbox (required)
  const consentError = form.querySelector('#consentError');
  if (!consent.checked) {
    consentError.textContent = 'Please agree to be contacted back.';
    ok = false;
  } else {
    consentError.textContent = '';
  }

  return ok;
}

/* ---------- Setup ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // demo: prevent actual navigation

    const success = document.getElementById('formSuccess');
    success.hidden = true;

    if (validateContactForm(form)) {
      // Demonstrate dynamic content update:
      // - Show a success message
      // - Reset form fields
      success.hidden = false;
      form.reset();

      // Scroll to the success message for better UX
      success.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
