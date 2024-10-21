import React from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, }) => {
  const navigate = useNavigate();
  const mm = gsap.matchMedia();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent the default link behavior

    const absoluteTo = to.startsWith('/') ? to : `/${to}`;
    // Start your animation here
    const timeline = gsap.timeline({
      onComplete: () => {
        // After the animation completes, navigate to the desired path
        navigate(absoluteTo);
      }
    });


    if(to === 'skills'){
        timeline.to('#w-transition', {
            x: '0%',
            duration: 0.7,
            ease: 'power3.inOut',
        })
    
        timeline.to('#b-transition', {
            y: '0%',
            duration: 0.5,
            ease: 'power3.inOut',
        })
    
        timeline.to('#w-transition', {
            x: '100%',
            duration: 0.5,
            ease: 'power3.inOut',
        })
       
    } else if(to === 'projects'){

        timeline.to('#project-transition-left', {
            width: '50%',
            duration: 1
        }, 0)
        timeline.to('#project-transition-right', {
            width: '50%',
            duration: 1
        }, 0)
        timeline.to('#project-transition-top', {
            height: '50%',
            duration: 1
        }, 0)
        timeline.to('#project-transition-bottom', {
            height: '50%',
            duration: 1
        }, 0)
        
        mm.add("(max-width: 738px)", () => {
            timeline.to('#some', {
                top: '40%',
                left: '25%',
                opacity: 1,
                duration: 1.3,
                display: 'flex'
            }, 0)
        })

        mm.add("(max-width: 738px)", () => {
            timeline.to('#projects', {
                bottom: '40%',
                right: '25%',
                opacity: 1,
                duration: 1.3,
                display: 'flex'     
            }, 0)
        })

        mm.add('(min-width: 739px) and (max-width: 1224px)', () => {
            timeline.to('#some', {
                top: '38%',
                left: '30%',
                opacity: 1,
                duration: 1.3,
                display: 'flex'
            }, 0)

            timeline.to('#projects', {
                bottom: '38%',
                right: '30%',
                opacity: 1,
                duration: 1.3,
                display: 'flex'     
            }, 0)
        })

        mm.add('(min-width: 1225px)', () => {
            timeline.to('#some', {
                top: '40%',
                left: '40%',
                opacity: 1,
                duration: 1.3,
                display: 'flex'
            }, 0)
        })
        

        mm.add('(min-width: 1225px)', () => {
            timeline.to('#projects', {
                bottom: '40%',
                right: '40%',
                opacity: 1,
                duration: 1.3,
                display: 'flex'
            }, 0)
        })

        timeline.to(['#some', '#projects'], {
            y: 10,
            duration: 1.5,     
        }, 1)
        timeline.to(['#some', '#projects'], {
            y: -900,
            opacity: 0,
            duration: 1,    
        }, 2)
        
    } else if(to === 'contact') {
        timeline.to('#stairsCont', {
            display: 'flex'
        })
        timeline.fromTo('#stair', {
            height: '0vh',
        }, {
            display: 'flex',
            height: '100vh',
            stagger: 0.1
        })
        timeline.to('#page', {
            opacity: 0
        })
        timeline.to('#stair', {
            height: '0vh',
            stagger: 0.1
        })
        timeline.to(['#stair', '#stairsCont'], {
            display: 'none'
        })
    }

  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default CustomLink;