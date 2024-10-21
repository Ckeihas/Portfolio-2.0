import React, { useRef, useState } from 'react'
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
import emailjs from '@emailjs/browser';
import './Contact.scss'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';
import HamburgerMenu from '../../components/mobileMenu/HamburgerMenu';


const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const location = useLocation();
  const tabletView = window.innerWidth
  const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(formRef.current){
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
          publicKey: PUBLIC_KEY,
        })
        .then(
          () => {
            console.log('SUCCESS!');
            setError(false)
            setSuccess(true)
          },
          (error) => {
              setError(true)
              setSuccess(false)
            console.log('FAILED...', error.text);
          },
        );
      }
    };

    useGSAP(() => {
      gsap.fromTo('#contact', {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.5
      })
    }, [])
  return (
    <section className='contact-cont' id='contact'>
      <Navbar 
      backgroundColor='black'
      currentLinkTextColor='white'
      textColor='black'
      currentPath={location.pathname}
      />
      <HamburgerMenu lineColors='black'/>
      <div className="contact-wrapper">
        <div className='contactInfo-cont'>
          <h1>Contact Me</h1>
          <h4>Email</h4>
          <h3>christian.keihas@outlook.com</h3>
          <h4>Phone</h4>
          <h3>+358400863199</h3>
        </div>

        <div className="contactForm-cont">
          <form 
          ref={formRef}
          onSubmit={sendEmail}
          className='form'>
            <input 
            type='name'
            placeholder='Name'
            className='inputName'
            name="from_name"
            />
            <input 
            type='email'
            placeholder='Email'
            className='inputEmail'
            name="user_email"
            />
            <textarea 
            placeholder='Message'
            className='inputText' 
            rows={tabletView < 1200 ? 10 : 25}
            name="message"
            />

            <button type='submit' className='submitBtn'>Send</button>
            {error && <p className="error">Something went wrong</p>}
            {success && <p className='success'>Email sent successfully</p>}
          </form>
        </div>
      </div>
      
    </section>
  )
}

export default Contact