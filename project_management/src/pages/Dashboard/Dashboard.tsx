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
    <div className='w-full h-full flex flex-col text-center'>
      <h1 className='text-2xl'>Dashboard</h1>
      {/* part-1 daniel */}
      <div className='flex w-full justify-between'>
        <div className='flex flex-col w-1/2'>
          <span>Hi {user?.fullname}</span>
          <span>Welcome To Dashboard</span>
        </div>
        <div className='flex flex-col w-1/4 justify-items-center '>
          <button className='w-1/2' onClick={() => setShowInput(!showInput)}>Create Project</button>
          <input
            style={{display: showInput ? 'block' : 'none' }}
            placeholder='Project Name'
            type="text" 
            value={projectName} 
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className='flex w-full space-between' style={{display: showInput ? 'flex' : 'none' }}>
            <button onClick={() => handleCreateNewProject()}>Accept</button>
            <button onClick={() => setShowInput(!showInput)}>Cancel</button>            
          </div>
        </div>
      </div>
      {/* part -2 jacob */}
      <div>
        <h1 className='text-center mt-10 mb-4 text-xl'>Your Projects</h1>
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
  )
}

export default Dashboard
