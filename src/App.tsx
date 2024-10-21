import './app.scss'
import HeroScreen from "./screens/hero/HeroScreen";
import Skills from "./screens/skills/Skills";
import Contact from "./screens/contact/Contact";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import gsap from 'gsap';



gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Observer)
import RouterLayout from "./components/RouterLayout";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Projects from './screens/projects/Projects';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout />,
    children: [
      {
        path: '/',
        element: <HeroScreen />
      },
      {
        path: '/skills',
        element: <Skills />
      },
      {
        path: '/projects',
        element: <Projects />
      },
      {
        path: '/contact',
        element: <Contact />
      },
    ]
  },
]);




function App() {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App
