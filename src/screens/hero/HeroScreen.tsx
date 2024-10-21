import '../../layout.scss'
import './Hero.scss'
import ProfilePicture from '../../assets/profile2.png'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/Observer';
import { useRef } from 'react'
import CustomLink from '../../components/CustomLink'
import HamburgerMenu from '../../components/mobileMenu/HamburgerMenu'

//@ts-ignore
import barba from '@barba/core';

gsap.registerPlugin(Observer)

const HeroScreen = () => {

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

    //Open hero screen animations
    useGSAP(() => {
        const tl = gsap.timeline({});
    

        
        tl.to('#heroName', {
            opacity: 1,
            duration: 2
        })
        tl.fromTo(
            [
              '.top-link',
              '.lower-link',
              '.left-link',
              '.right-link',
              '.heroInfo-cont h2',
              '.threeDSphere'
            ],
            {
                y: 20,
                opacity: 0,
                stagger: 0,
                ease: "power2.out",
            }, {
                delay: 1,
                y: 0,
                opacity: 1,
                ease: "power2.out",
                duration: 1
            }
          )
      
    }, [])

    //Animate single letters from word
    useGSAP(() => {
        gsap.to('#junior', {
            delay: 2,
            rotateX: 360,
            repeat: -1,
            repeatDelay: 10,
            duration: 1
        });

        gsap.to(letterRefs.current[0], {
            delay: 4,
            rotateX: 360,
            repeat: -1,
            repeatDelay: 5,
            duration: 1
        })

        gsap.to(letterRefs.current[6], {
            delay: 7,
            rotateY: 360,
            repeat: 2,
            repeatDelay: 5,
            duration: 1,
        })
    }, [])


    const getLetterSpans = (text: string, linkClass: string) => {
        return text.split('').map((letter, index) => (
            <CustomLink key={index} to={text === 'Home' ? '/' :text.toLowerCase()}>
                <span id={linkClass}>{letter}</span>
            </CustomLink>
            
        ));
    };

    //Animate nav links when hovering over
    useGSAP(() => {
        const animateOnHover = (divTarget: string, linkId: string) => {
            Observer.create({
                target: `#${divTarget}`, 
                type: 'pointer', 
                onHover: () => {
                    gsap.to(`#${linkId}`, {
                        fontSize: '40px',
                        fontWeight: 800,
                        lineHeight: 0,
                        letterSpacing: '13px',
                        duration: 0.08,
                        ease: 'power1.out',
                        stagger: 0.08 
                    });
                },
                onHoverEnd: () => {
                    gsap.to(`#${linkId}`, {   
                        fontSize: '28px',
                        fontWeight: 500,
                        lineHeight: 1,
                        letterSpacing: '17px',
                        duration: 0.08,
                        ease: 'power1.out',
                        stagger: 0.08
                    });
                }
            });
        }
        
        animateOnHover('toplink', 'home-link')
        animateOnHover('lowerlink','skills-link')
        animateOnHover('leftlink','projects-link')
        animateOnHover('rightlink', 'contact-link')
    }, [])


    
    const text = "Software";


  return (
    <section className='hero-layout' id='hero'>
        <div className='top-link' id='toplink'>
            {getLetterSpans('Home', 'home-link')}
        </div>
        <div className="lower-link" id='lowerlink'>
            {getLetterSpans('Skills', 'skills-link')}
        </div>
        <div className="left-link" id='leftlink'>
            {getLetterSpans('Projects', 'projects-link')}
        </div>
        <div className="right-link" id='rightlink'>
            {getLetterSpans('Contact', 'contact-link')}
        </div>
     
        <HamburgerMenu lineColors='black'/>

        <div className='heroInfo-cont'>
            <h1 className='hero-name' id='heroName'>Christian Keihäs</h1>
            <h2 style={{marginLeft: 200,}} id='junior'>Junior</h2>
            <h2 style={{marginLeft: 100}}>
            {text.split('').map((letter, index) => (
                <span 
                key={index} 
                ref={el => (letterRefs.current[index] = el)}
                style={{ display: 'inline-block' }}
                >
                {letter}
                </span>
            ))}
            </h2>
            <h2 style={{marginLeft: 170}}>Developer</h2>
        </div>
        <div className='threeDSphere'>
            <img src={ProfilePicture} className='profileImg' />
        </div>
        
    </section>
  )
}

export default HeroScreen