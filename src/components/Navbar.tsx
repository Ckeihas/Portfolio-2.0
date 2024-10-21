import './Navbar.scss'
import CustomLink from "./CustomLink"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Observer } from "gsap/Observer"
import { useRef } from "react"

gsap.registerPlugin(Observer)


interface IStyles {
  backgroundColor: string,
  currentLinkTextColor: string,
  textColor: string,
  currentPath: string
}

const Navbar = (navStyles: IStyles) => {

  const linkRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {

    linkRef.current.forEach(element => {
      if(element){
        Observer.create({
          target: element,
          type: 'pointer',
          onHover: () => {
            gsap.to(element, {
              backgroundColor: 'gray',
              
            })
          },
          onHoverEnd: () => {
            gsap.to(element, {
              backgroundColor: '',
              duration: 0.5,
              ease: 'power2.inOut'
            })
          }
        })
      }
    });
    // Observer.create({
    //   target: linkRef.current[3],
    //   type: 'pointer',
    //   onHover: () => {
    //     gsap.to(`${linkRef.current[3]}`, {
    //       fontSize: '16px',
    //       fontWeight: 600
    //     })
    //   }, onHoverEnd: () => {

    //   }
    // })
  }, [])
  const navLinks = [
    'Home',
    'Skills',
    'Projects',
    'Contact',
  ]

  
  return (
    <div className='nav-cont'>
      {navLinks.map((link, index) => (
        <div 
        key={index} 
        className="linkWrapper" 
        ref={el => linkRef.current[index] = el}
        style={{
          backgroundColor: navStyles.currentPath === `/${link.toLowerCase()}` ? navStyles.backgroundColor : 'none',
          '--color': navStyles.currentPath  === `/${link.toLowerCase()}` ? navStyles.currentLinkTextColor : navStyles.textColor,
          pointerEvents: navStyles.currentPath  === `/${link.toLowerCase()}` ? 'none' : 'auto',
          } as React.CSSProperties } 
        >
          <CustomLink to={link === 'Home' ? '/' : link.toLowerCase()}>
            {link}
          </CustomLink>
        </div>
        
      ))}
    </div>
  )
}

export default Navbar