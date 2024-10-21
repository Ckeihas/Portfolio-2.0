import { useEffect, useRef } from 'react'
import './Projects.scss'

import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import MovieWorldImg from '../../assets/movieworld.png'
import Brainwave from '../../assets/brainwave.png'
import CarHub from '../../assets/carhub.png'
import FooditApp from '../../assets/foodi.png'
import NftApp from '../../assets/nft-app.png'
import GithubLogo from '../../assets/github-logo.png'
import WorldWide from '../../assets/worldwide.png'
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';
import HamburgerMenu from '../../components/mobileMenu/HamburgerMenu';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

declare module '*.png' {
    const value: string;
  }


const projects = [
    {
        id: 1,
        title: 'MovieWorld',
        description: "With TMDB movie API from www.themoviedb.org, created modern movie serching app where you can find most popular, upcoming or trending movies, actors and actress and more!",
        techs: ['React Native', 'Javascript'],
        image: MovieWorldImg,
        githubUrl: "https://github.com/Ckeihas/MovieWorldApp/tree/main"
    },
    {
        id: 2,
        title: 'Brainwave',
        description: "Template for modern responsive website design! Template can be easily customized for any purpose by adding for example own theme colors and images. Website is scalable by adding authentications and other functionalities for your own usage.",
        techs: ['React js', 'Tailwind'],
        image: Brainwave,
        githubUrl: "https://github.com/Ckeihas/Brainwave-website"
    },
    {
        id: 3,
        title: "Crypto App",
        description: "Following cryptocurrency rates by using CryptoLore API, created with simple UI and help of Expo. Easily expandable for creating user profile and connecting database to store your favourite crypto currencies! ",
        techs: ['React Native', 'Typescript', 'CryptoLore API'],
        image: NftApp,  
        githubUrl: "https://github.com/Ckeihas/CoinMotion-App"
      },
    {
        id: 4,
        title: 'Car Rental',
        description: "Created car rental website where you can explore variety of cars and see details from selected cars. Using 'Cars by API-Ninjas-API' from rapidapi.com",
        techs: ['Nextjs', 'Typescript', 'Tailwind'],
        image: CarHub,
        githubUrl: "https://github.com/Ckeihas/car-rental-website",
        fullWebsite: 'https://car-rental-website-njzk.vercel.app'
    },
    {
        id: 5,
        title: 'Foodi Full-Stack App',
        techs: ['React Native', 'Typescript', 'Nodejs', 'Express', 'Firebase', 'GCP'],
        description: "Work in progress. FullStack application with backend and database. Social media app where you can post pictures of your meals, add friends, send grocerie lists to your friends, send specific meals, preparation instructions for every recipe created, follow your own diet, add meal preps for each day and much more to come!",
        image: FooditApp,
        githubUrl: "https://github.com/Ckeihas/Foodi-Frontend"
    },
]

const Projects = () => {
    
    const location = useLocation();
    const projectContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const mm = gsap.matchMedia();
        if(projectContainerRef.current){
            const { scrollTop, scrollHeight, clientHeight } = projectContainerRef.current;
            const maxScrollTop = scrollHeight - clientHeight;

            const progress = (scrollTop / maxScrollTop) * 100;

            const decreaseWidth = 700 - (progress / 100 * 700)
            const decreaseMobileWidth = 300 - (progress / 100 * 300)
            
            
            mm.add('(max-width: 738px)', () => {
                gsap.to('#progressBar', {     
                    width: `${decreaseMobileWidth}px`
                })
            })
            mm.add('(min-width: 738px)', () => {
                gsap.to('#progressBar', {        
                    width: `${decreaseWidth}px`
                })
            })
            

            
        }
    }

    useEffect(() => {
        const projectContainer = projectContainerRef.current;
        if(projectContainer){
        handleScroll();
        projectContainerRef.current.addEventListener('scroll', handleScroll)

        return () => {
            projectContainer.removeEventListener('scroll', handleScroll);
          };
        }
    }, [])

    useGSAP(() => {
        gsap.fromTo('#projectCont', {
            y: 500,
            opacity: 0
        }, {
            y: 0,
            opacity: 1
        })
    }, [])

  return (
    <div className="projects-cont">
        <Navbar 
        backgroundColor='white'
        currentLinkTextColor='black'
        textColor='white'
        currentPath={location.pathname}
        />
        <HamburgerMenu lineColors='white'/>
        <div className="progress-bar" id='progressBar'></div>
        
        <div 
        className='prjocetMapCont' 
        id='projectCont' 
        ref={projectContainerRef}
        >
            {projects.map((project, index) => (
                <div className='project-section' key={index}>
                    <div className='img-cont'>
                    <img src={project.image} className='image-small'/>
                    </div>
                    
                    <div className='title-description-cont'>
                        <h1>{project.title}</h1>
                        <p>{project.description}</p>

                        <div className="techs-cont">
                        {project.techs.map((tech, index) => (
                            <div key={index} className='tech'>
                                <h3>{tech}</h3>
                            </div>
                        ))}
                        </div>

                        <div className="links-cont">
                            <a href={project.githubUrl}>
                                <img className='link-img' src={GithubLogo}/>
                            </a>
                            {project.fullWebsite ? 
                            <a href={project.fullWebsite}>
                                <img className='link-img' src={WorldWide}/>
                            </a>
                            :
                            <div /> 
                            }
                        </div>
                    </div>
                    
                    
                </div>
            ))}
        </div>
    </div>

  )
}

export default Projects