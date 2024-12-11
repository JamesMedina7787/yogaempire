import React, { useRef} from "react";
import emailjs from "emailjs-com";
import "../contact-form.css"
import myImage from '../assets/x3crow.png'

const Contact = () => {
	
//	const formRef = useRef();
	
//	const sendEmail = (e) => {
		
//	}
	
	
  return (
    <section>
      <h2>Contact Us</h2>
	  <img src={myImage} alt="Gia" />;
      <form>
	  
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Message:
          <textarea name="message" required></textarea>
        </label>
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default Contact;
