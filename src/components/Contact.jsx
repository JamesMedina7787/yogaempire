import React, { useRef} from "react";
import emailjs from "emailjs-com";
import "../contact-form.css"
import myImage from '../assets/x3crow.png'

const Contact = () => {
	
	const formRef = useRef();
	
	const sendEmail = (e) => {
		e.preventDefault();
		
		emailjs
		   .sendForm(
		           "Sbp_XPmOM_d87a8iK",
			       "template_xfcc2lo",
					formRef.current,
				   "service_tgt098t"
		   )
		   .then(
		   (result) =>{
			   console.log("email delivered:", result.text);
			   alert("message sent!");
		   },
		   (error) => {
			   console.error("error sending email:", error.text);
			   alert("something f'd up")
		   }
		   );
		  e.target.reset();
	};
	
	
  return (
    <section>
      <h2>Contact Us</h2>
	  <img src={myImage} alt="Gia" />;
      <form ref={formRef} onSubmit={sendEmail}>
	  
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
