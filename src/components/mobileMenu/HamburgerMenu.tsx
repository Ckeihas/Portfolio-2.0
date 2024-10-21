import './HamburgerMenu.scss'
import { useRef, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CustomLink from '../CustomLink';

const HamburgerMenu = (lineColors: {lineColors: string}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const hamburgerMenuRef = useRef<(HTMLDivElement | null)[]>([]);
    const openMobileNav = () => {
        console.log('clicked')
        setMobileMenuOpen(prevState => {
            const newState = !prevState;
    
            const element1 = hamburgerMenuRef.current[0];
            const element2 = hamburgerMenuRef.current[1];
            const element3 = hamburgerMenuRef.current[2];
    
            if (newState) {
                gsap.to(element1, {
                    rotation: 45,
                    y: 8, 
                    transformOrigin: '50% 50%', 
                    backgroundColor: 'black',
                    duration: 0.5,
                    ease: 'power2.inOut',
                });
                gsap.to(element2, {
                    opacity: 0
                });
                gsap.to(element3, {
                    rotation: -45, 
                    y: -10, 
                    transformOrigin: '50% 50%',
                    backgroundColor: 'black', 
                    duration: 0.5,
                    ease: 'power2.inOut',
                });
            } else {
                gsap.to(element1, {
                    rotation: 0,
                    y: 0, 
                    transformOrigin: '50% 50%', 
                    backgroundColor: lineColors.lineColors,
                    duration: 0.5,
                    ease: 'power2.inOut',
                });
                gsap.to(element2, {
                    opacity: 1
                });
                gsap.to(element3, {
                    rotation: 0, 
                    y: 0, 
                    transformOrigin: '50% 50%', 
                    backgroundColor: lineColors.lineColors,
                    duration: 0.5,
                    ease: 'power2.inOut',
                });
            }
    
            return newState; 
        });
        
    }

    useGSAP(() => {
        if(mobileMenuOpen){
            gsap.to('#mobileNav', {
                transform: 'translateX(0)',
                display: 'flex',
                opacity: 1
            })
        } else {
            gsap.to('#mobileNav', {
                transform: 'translateX(600px)',
                display: 'none',
                opacity: 0
            })
        }     
    }, [mobileMenuOpen])

    const mobileMenuLinks = [
        'Home',
        'Skills',
        'Projects',
        'Contact'
    ]
  return (
    <>
    <div className='hamburger-cont' onClick={openMobileNav}>
        {Array(3).fill(null).map((_, index) => (
            <div 
            key={index} 
            className='hamburgerLine'
            style={{backgroundColor: lineColors.lineColors}}
            ref={el => hamburgerMenuRef.current[index] = el}
            />
        ))}
        </div>

        <div className='mobileNav-cont' id='mobileNav'>
            {mobileMenuLinks.map((path, index) => (
                <CustomLink key={index} to={path === 'Home' ? '/' : path.toLowerCase()}>
                    <span>{path}</span>
                </CustomLink>
            ))}
        </div>
    </>
  )
}

export default HamburgerMenu