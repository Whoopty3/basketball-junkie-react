// src/pages/Contact.js
import React from 'react';
import '../styles/Contact.css';  // Correct import for Contact CSS

function Contact() {
  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <form action="https://api.web3forms.com/submit" method="POST">
        <input type="hidden" name="access_key" value="10d455ab-caff-42c6-81d0-0af63b3109f5"/>
        
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="status-message">
        {/* Success or error messages can be added dynamically here via JavaScript */}
      </div>
    </section>
  );
}

export default Contact;
