import Angular from '../../assets/angular.png'
import Azure from '../../assets/azure.png'
import CSharp from '../../assets/c-sharp.png'
import CSS from '../../assets/css-3.png'
import Expo from '../../assets/expo_logo.png'
import Firebase from '../../assets/firebase.png'
import Git from '../../assets/Git-Logo.png'
import GCP from '../../assets/google-cloud.png'
import HTML from '../../assets/html-5.png'
import Javascript from '../../assets/js.png'
import MongoDB from '../../assets/mongodb.png'
import NET from '../../assets/NET_Core.png'
import Nextjs from '../../assets/nextjs.png'
import Nodejs from '../../assets/nodejs.png'
import Reactjs from '../../assets/react.png'
import ReactNative from '../../assets/react-native-1.svg'
import Tailwind from '../../assets/tailwind.png'
import Sass from '../../assets/sass.png'
import Typescript from '../../assets/typescript.png'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'


gsap.registerPlugin(CustomEase)
gsap.registerPlugin(ScrollTrigger);



import './Skills.scss'
import Navbar from '../../components/Navbar'
import { useLocation } from 'react-router-dom'
import HamburgerMenu from '../../components/mobileMenu/HamburgerMenu'

const techStack = [
    Typescript,
    Javascript,
    CSharp,
    Reactjs,
    ReactNative,
    Nextjs,
    Angular,
    CSS,
    HTML,
    Tailwind,
    Sass,
    Nodejs,
    NET,
    Azure,
    Git,
    GCP,
    Firebase,
    Expo,
    MongoDB
]

const Skills = () => {
    
    const location = useLocation();
    useGSAP(() => {
        const tl = gsap.timeline({});

        const mm = gsap.matchMedia();
        CustomEase.create('slowMiddle', 'M0,0 C0.2,0.8 0.8,0.2 1,1');

        //Animate screen 738 and below
        mm.add("(max-width: 738px)", () => {
            tl.to('#header', {
                display: 'flex',
                x: '160%',
                opacity: 1,
                fontSize: 200,
                duration: 3,
                ease: 'slowMiddle'
            })
            tl.to('#header', {
                display: 'none',
            })
            tl.fromTo('#tech', {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: 'power2.inOut'
                
            })
        })

        mm.add('(min-width: 739px) and (max-width: 1224px)', () => {
            tl.to('#header', {
                display: 'flex',
                x: '200%',
                opacity: 1,
                fontSize: 400,
                duration: 3,
                ease: 'slowMiddle'
            })
            tl.to('#header', {
                display: 'none',
            })
            tl.fromTo('#tech', {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: 'power2.inOut'
                
            })
        })

        //Animate screens 1225 and above
        mm.add('(min-width: 1225px)', () => {
            tl.to('#header', {
                x: '200%',
                opacity: 1,
                fontSize: 800,
                duration: 3,
                ease: 'slowMiddle'
            })
            
            tl.fromTo('#tech', {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: 'power2.inOut'
                
            })
        })
        

        
        
    }, [])

  return (
    <section className='skills-cont' id='skills'>
    <h1 id='header' className='skillHeader'>Skills</h1>
    <Navbar 
    backgroundColor='white'
    currentLinkTextColor='black'
    textColor='white'
    currentPath={location.pathname}
    />
    <HamburgerMenu lineColors='white'/>
    <div className="helper-wrapper" id='blur'>
    <div className='techs-wrapper' id='rotate'>
        {techStack.map((image, index) => (
            <div key={index} className='tecstack-cont' id='tech'>
                <img src={image} className='tech-img' />
            </div>
        ))}
        </div>
    </div>    
        
    </section>
  )
}

export default Skills