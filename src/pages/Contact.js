// src/pages/Contact.js
import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-content">
        <h2>Contact Us</h2>
        <img src="/images/Contact Us-small.jpg" alt="Contact Us" />
        <form action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="10d455ab-caff-42c6-81d0-0af63b3109f5" />
          <h2>Name</h2>
          <input type="text" name="name" required />
          <h2>Email</h2>
          <input type="email" name="email" required />
          <h2>Message</h2>
          <textarea name="message" required></textarea>
          <button type="submit">Submit Form</button>
        </form>
        <h3>Other Contact Options</h3>
        <ul>
          <li><strong>Email:</strong> Payne.Whitlock3@gmail.com</li>
          <li><strong>Phone:</strong> +1 803-634-2637</li>
        </ul>
      </div>
    </section>
  );
}

export default Contact;
