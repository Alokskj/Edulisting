import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current)
    emailjs
      .sendForm(
        "service_6lc0x8e",
        "template_hizs5qh",
        form.current,
        "Cpi-QwJIIClq6X8I-"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" className="border-2 " />
      <label>Email</label>
      <input type="email" name="user_email" className="border-2 " />
      <label>Message</label>
      <textarea name="message" className="border-2 " />
      <input type="submit" value="Send" />
    </form>
  );
};
