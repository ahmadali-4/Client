import React from "react";
import "../ContactUs/contact.css";

function ContactUs() {
  return (
    <div id="div-container contact-us">
      <div id="row">
        <h1>Contact Us</h1>
      </div>
      <div id="contact-in">
        <div id="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13730.912181302727!2d73.149107!3d30.6416211!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc37ea3d85326203!2sCOMSATS%20University%20Islamabad%20-%20Sahiwal%20Campus!5e0!3m2!1sen!2s!4v1671305560425!5m2!1sen!2s"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div id="contact-form">
          <form>
            <input type="text" placeholder="Name" id="Contact-form-text" />
            <input type="text" placeholder="Email" id="Contact-form-text" />
            <textarea
              type="text"
              placeholder="Message"
              id="Contact-form-textarea"
            ></textarea>
            <input type="Submit" name="Submit" id="Contact-form-btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
