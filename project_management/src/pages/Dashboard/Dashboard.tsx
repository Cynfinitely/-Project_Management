import {useEffect, useState } from 'react'
import { Store } from 'react-notifications-component';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import Modal from '../../components/Modal/Modal';
import { createNewProject, fetcProjecstByUser, deleteProject } from './../../services/project.service';
import { addProject } from '../../redux/slices/user.slice';
import ProjectItems from './ProjectItmes';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userState = useAppSelector(state => state.user)
  const { user } = userState
  const userUrl:string = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  const [userProject, setUserProject] = useState<ProjectType[]>([]);

  const [showInput, setShowInput] = useState(false)
  const [projectName, setProjectName] = useState("")
  

  useEffect(() => {
    fetchProjectsByUser()
  }, [])
  
  useEffect(() =>{
    fetch(userUrl)
    .then((response) => response.json() )
    .then((data) => setUserProject(data.meals))
    .catch((error) => console.log(error));
  },[userUrl]);

  type ProjectType = {
  idMeal: string;
  strMeal: string;
  }

  function fetchProjectsByUser() {
    if(user != null) {
      dispatch(fetcProjecstByUser(user.userToken))
      .then(value => {
        if(value != null) {
          dispatch(addProject(value.payload))
        }
      })
    }
  }
  
  function handleCreateNewProject() {
    if(projectName.trim() != "") {
      dispatch(createNewProject({projectName: projectName, userToken: user?.userToken ?? ""}))
      .then(value => {
        if(value) {          
          fetchProjectsByUser()
          Store.addNotification({
            title: "Project Created",
            message: `The Project ${projectName} Was Created`,
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          })
          setShowInput(!showInput)
        }
      })
    }
  }

  function handleDeleteProject(projectId: string) {    
    dispatch(deleteProject(projectId))
    .then(value => {
      if(value != null) {
        fetchProjectsByUser()
      }
    })
  }

  return (
    <div className='w-full h-full flex flex-col text-center pb-10'>
      {/* <h1 className='mt-2 mb-2 text-center pr-10 lg:pr-20 flex flex-col mr-4 cursor-pointer py-1 text-2xl font-bold text-gray-700'>Dashboard</h1> */}
      {/* part-1 daniel */}
      <div className='flex w-full justify-between'>
        <div className='w-1/2  pr-10 lg:pr-20 flex flex-col mr-4 cursor-pointer py-1 text-2xl font-bold text-gray-700'>
          <span>Hi {user?.fullname}!</span>
          <span>Welcome To Dashboard</span>
          <span className='text-sm'>You are so handsome today:)</span>
        </div>
        <div className='pt-4 flex flex-col h-24 items-center w-1/2'>
          {!showInput && <button className=' bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 w-52 rounded items-start text-2xl'onClick={() => setShowInput(!showInput)}>Create Project</button>}
          <div className='w-52'>
            <input className="mb-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "

              style={{display: showInput ? 'block' : 'none' }}
              placeholder='Project Name'
              type="text" 
              value={projectName} 
              onChange={(e) => setProjectName(e.target.value)}
            />
            <div className='flex w-full justify-between' style={{display: showInput ? 'flex' : 'none' }}>
              <button className='bg-indigo-500 mr-2 text-sm hover:bg-indigo-600 text-white font-bold py-1 px-4 rounded'onClick={() => handleCreateNewProject()}>Accept</button>
              <button className='bg-red-400 text-sm hover:bg-indigo-600 text-white font-bold py-1 px-4 rounded'onClick={() => setShowInput(!showInput)}>Cancel</button>            
            </div>
          </div>
        </div>
      </div>
      {/* part -2 jacob */}
      <div className='w-full mt-10'>
        <h3 className='mt-2 mb-2 text-center pr-10 lg:pr-20 flex flex-col mr-4 cursor-pointer py-1 text-xl font-bold text-gray-700'>Your Awesome Projects</h3>
        <div className='px-10 lg:px-20'>
        {
          user?.projects.map((project) => {
            return (
              <ProjectItems 
                projectId={project._id}
                projectName={project.name} 
                projectDate={new Date(`${project.createdAt}`).toDateString()}
                deleteProject={(value) => handleDeleteProject(value)}
                goProject={(value) => navigate(`/project/${value}`)}           
              />
            )
          })
        }

        </div>
        
      </div>
    </div>
  )
}

export default Dashboard
