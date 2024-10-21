import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import '../layout.scss'
import './RouterLayout.scss'

const RouterLayout = () => {

  const location = useLocation();

  
  return (
    <div className='wrapper' id='wrapper' key={location.pathname}>
     
      <div className="black-transition" id='b-transition'/>
      <div className="white-transition" id='w-transition'/>

      <h1 className='someText' id='some'>Some</h1>
      <h1 className='projectsText' id='projects'>Projects</h1>
      <div className="project-transition-left" id='project-transition-left'/>
      <div className="project-transition-right" id='project-transition-right'/>
      <div className="project-transition-top" id='project-transition-top'/>
      <div className="project-transition-bottom" id='project-transition-bottom'/>

      <div className='stairs-cont' id='stairsCont'>
        {Array(10).fill(null).map(() => (      
          <div className='stair' id='stair'/>         
        ))}
      </div>

      <div className="page" id='page'>
        <Outlet />
      </div>      
        {/* <Navbar /> */}     
    </div>
  )
}

export default RouterLayout