import axios from 'axios';
import { useEffect } from 'react'
import { useState } from "react";
import {  useParams } from 'react-router-dom'
import CommentForm from '../../components/CommentForm/CommentForm';
import EditTaskForm from '../../components/EditTaskForm/EditTaskForm';
import Modal from '../../components/Modal/Modal';
import { UseModal } from '../../hooks/useModal';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { ICommentTask } from '../../models/comment.model';
import { Task } from '../../models/task.model';
import { fetchCommentByTask, updateTask } from '../../services/task.service';


import "./ProjectDashboard.css"


type Projct = {
  name: string,
  users: Object[],
}

type inputArr = {
  type: string,
  id: number,
  value: string
}
const FORM = {
  NONE: 0,
  EDIT: 1,
  COMMENT: 2
}

const ProjectDashboard = () => {

  const { showModal, toggle } = UseModal()
  const dispatch = useAppDispatch()
  const [taskSelected, setTaskSelected] = useState<Task>()
  const [showForm, setShowForm] = useState(FORM.NONE)
  const [commentsTask, setCommentTask] = useState<ICommentTask[]>([])
  const [taskId, setTaskId] = useState("")


  const [arr, setArr] = useState<inputArr[]>([]);
  const { projectId } = useParams()
  const [ideas, setIdeas] = useState<Task[]>([])
  const [todo, setTodo] = useState<Task[]>([])
  const [inProgress, setInProgress] = useState<Task[]>([])
  const [finished, setFinished] = useState<Task[]>([])
  const [project, setProject] = useState<Projct>()
  const [isTaskAdded, setIsTaskAdded] = useState<Boolean>(false)

  const userState = useAppSelector(state => state.user)
  const { user } = userState


  const addInput = () => {
    setArr((s: any) => {
      return [
        ...s,
        {
          type: "text",
          value: ""
        }
      ];
    });
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    const index = e.target.id;
    setArr(s => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      return newArr;
    });
  };

  useEffect(() => {

    axios.get(`http://localhost:5000/api/project/${projectId}`)
      .then(res => setProject(res.data.project))
      .catch(err => console.log(err))

    axios.get(`http://localhost:5000/api/project/${projectId}/tasks`)
      .then(res => {
        if (res.data.tasks.length > 0) {
          setIdeas(res.data.tasks.filter((task: any) => task.status == 'Idea'))
          setTodo(res.data.tasks.filter((task: any) => task.status == 'Todo'))
          setInProgress(res.data.tasks.filter((task: any) => task.status == 'InProgress'))
          setFinished(res.data.tasks.filter((task: any) => task.status == 'Finished'))
        }

      })
      .catch(err => console.log(err))

    setIsTaskAdded(false)
    setArr([])

  }, [isTaskAdded])

  const handleSubmitTask = (e: any) => {
    axios.post(`http://localhost:5000/api/task/new`, { name: arr[e.target.id].value, project_id: projectId })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setIsTaskAdded(true)
  }

  const handleDeleteTask = (id: any) => {
    axios.delete(`http://localhost:5000/api/task/delete/` + id)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setIsTaskAdded(true)
  }

  const handleUpdateStatus = (task: any) => {
    var newStatus: string = ''
    if (task.status == "Idea") {
      newStatus = 'Todo'
    }
    else if (task.status == 'Todo') {
      newStatus = 'InProgress'
    }
    else if (task.status == 'InProgress') {
      newStatus = 'Finished'
    }
    task.status = newStatus

    axios.put(`http://localhost:5000/api/task/update/${task._id}`, task)
      .then(res => {
        setIsTaskAdded(true)
      })
      .catch(err => console.log(err))

  }
  console.log(user)

  function GetPercentage(): string {
    const taskPercentage = ((finished.length * 100) / (ideas.length + finished.length + todo.length + inProgress.length)).toFixed(1);
    return taskPercentage.toString()

  }

  const header = document.getElementById("element");
  if (header) {
    const taskValue = (finished.length / (ideas.length + finished.length + todo.length + inProgress.length));
    if (taskValue <= 0.33) {
      header.style.color = "#ff0000";
    }
    else if (taskValue <= 0.66 && taskValue > 0.33) {
      header.style.color = "#ffff00";
    }
    else if (taskValue <= 1 && taskValue > 0.66) {
      header.style.color = "#00ff00";
    }
    document.documentElement.style.setProperty(
      "--header-color",
      header.style.color
    );
  };

  function onClickTask(task: Task) {
    setTaskSelected(task)
    setShowForm(FORM.EDIT)
    toggle()
  }

  function onClickComment(taskId: string) {
    dispatch(fetchCommentByTask(taskId))
      .then(value => {
        const comments = value.payload['comments']
        console.log(value.payload);

        setCommentTask(comments)
        setTaskId(taskId)
        setShowForm(FORM.COMMENT)
        toggle()
      })
  }

  function handleEditTask(newTask: Task) {
    dispatch(
      updateTask({
        name: newTask.name,
        status: newTask.status,
        due_date: newTask.due_date,
        taskId: newTask._id,
        userToken: user?.userToken ?? "",
        desription: newTask.description ?? "",
        // assigned_id: newTask.assigned_id ?? ""
      })
    )
      .then(value => {
        if (value != null) {
          setIsTaskAdded(true)
          toggle()
        }
      })
  }

  function formatDate(date: string): string {
    try {
      const dateSplit = date.split('T')
      return dateSplit[0]
    } catch (error) {
      return ""
    }
  }

  return (
    <div className='p-10 mb-36 px-4 lg:px-8 space-between'>
      <div className='flex flex-row justify-between '>
        <div className='px-10 mt-5'>
          <div className="text-lg font-bold mr-4">Hi, {user?.fullname}!</div>
          <div className="text-2xl font-bold mr-4">{project ? project.name : ''}</div>
        </div>
        <div className="flex items-center px-10 mt-5">
          <div className="w-1/3 text-right">
            <p id='element' className="text-3xl font-bold">{(() => GetPercentage())()}%</p>
            <p className="text-gray-600">Completed</p>
          </div>
        </div>
      </div>
      <div className='flex gap-5 container p-10 mx-auto'>
        <div className='rounded-lg  text-center w-full mx-auto shadow-md'>
          <div className="p-4 border-b bg-indigo-400 rounded-t-md">
            <h3 className="text-lg font-bold">Idea</h3>
          </div>
          <div className='px-2 py-1'>
            {ideas.map((task, index) =>
              <div className='my-2  border flex flex-col items-start rounded ' key={index}>
                <div className='flex justify-between w-full bg-gray-200'>
                  <button onClick={() => handleDeleteTask(task._id)} className=' mr-3 bg-inherit text-black hover:text-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                  <div className='flex items-end'>
                    <button className='bg-inherit text-gray-700 hover:text-gray-500 mr-1' onClick={() => onClickComment(task._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-chat-square-text" viewBox="0 0 16 16">
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </button>
                    <button onClick={() => handleUpdateStatus(task)} className='bg-inherit text-black hover:text-gray-500'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className='p-3 w-full' onClick={() => onClickTask(task)}>
                  <h3 className='cursor-pointer w-full text-left'>{task.name}</h3>
                </div>
              </div>)}

            {arr.map((item, index) => {
              return (
                <div className='flex' key={index}>
                  <input
                    onChange={handleChange}
                    value={item.value}
                    id={index.toString()}
                    type={item.type}
                    className="my-1 p-3 border"
                    placeholder='Enter task description'
                  />
                  <button id={index.toString()} onClick={handleSubmitTask} className='px-3 my-1 h-50 rounded-none  bg-gray-700 hover:bg-gray-400'>ok</button>
                </div>
              );
            })}
          </div>
          <div className='my-2 text-3xl  text-center'>
            <button className='bg-inherit text-gray-400 rounded-full pb-2 px-3 hover:bg-gray-200 font-bold hover:text-gray-700' onClick={addInput}>+</button>
          </div>
        </div>
        <div className='rounded-lg  text-center w-full mx-auto shadow-md'>
          <div className="p-4 border-b bg-rose-400 rounded-t-md">
            <h3 className="text-lg font-bold">To-Do</h3>
          </div>
          <div className='px-2 py-1'>
            {todo.map((task, index) =>
              <div className='my-2  border flex flex-col items-start rounded ' key={index}>
                <div className='flex justify-between w-full bg-gray-200'>
                  <button onClick={() => handleDeleteTask(task._id)} className=' mr-3 bg-inherit text-black hover:text-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                  <div className='flex items-end'>
                    <button className='bg-inherit text-gray-700 hover:text-gray-500 mr-1' onClick={() => onClickComment(task._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-chat-square-text" viewBox="0 0 16 16">
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </button>
                    <button onClick={() => handleUpdateStatus(task)} className='bg-inherit text-black hover:text-gray-500'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className='p-3 w-full' onClick={() => onClickTask(task)}>
                  <h3 className='cursor-pointer w-full text-left' >{task.name}</h3>
                </div>
              </div>)}
          </div>
        </div>
        <div className='rounded-lg  text-center w-full mx-auto shadow-md'>
          <div className="p-4 border-b bg-yellow-200 rounded-t-md">
            <h3 className="text-lg font-bold">In Progress</h3>
          </div>
          <div className='px-2 py-'>
            {inProgress.map((task, index) =>
              <div className='my-2  border flex flex-col items-start rounded ' key={index}>
                <div className='flex justify-between w-full bg-gray-200'>
                  <button onClick={() => handleDeleteTask(task._id)} className=' mr-3 bg-inherit text-black hover:text-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                  <div className='flex items-end'>
                    <button className='bg-inherit text-gray-700 hover:text-gray-500 mr-1' onClick={() => onClickComment(task._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-chat-square-text" viewBox="0 0 16 16">
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </button>
                    <button onClick={() => handleUpdateStatus(task)} className='bg-inherit text-black hover:text-gray-500'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className='p-3 w-full'  onClick={() => onClickTask(task)}>
                  <h3 className='cursor-pointer w-full text-left'>{task.name}</h3>
                </div>
              </div>)}
          </div>
        </div>
        <div className='rounded-lg text-center w-full mx-auto shadow-md'>
          <div className="p-4 bg-green-300 rounded-t-md">
            <h3 className="text-lg font-bold ">Finished</h3>
          </div>
          <div className='px-2 py-1'>
            {finished.map((task, index) =>
              <div className='my-2  border flex flex-col items-start rounded ' key={index}>
                <div className='flex justify-between w-full bg-gray-200'>
                  <button onClick={() => handleDeleteTask(task._id)} className=' mr-3 bg-inherit text-black hover:text-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                  <div className='flex items-end'>
                    <button className='bg-inherit text-gray-700 hover:text-gray-500 mr-1' onClick={() => onClickComment(task._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-chat-square-text" viewBox="0 0 16 16">
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className='p-3 w-full' onClick={() => onClickTask(task)}>
                  <h3 className='cursor-pointer w-full text-left'>{task.name}</h3>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      <Modal
        title=''
        showModal={showModal}
        closeDialog={() => toggle()}
      >
        {showForm === FORM.EDIT ? (
          <EditTaskForm
            taskId={taskSelected?._id ?? ""}
            taskName={taskSelected?.name ?? ""}
            taskDescription={taskSelected?.description ?? ""}
            taskDate={formatDate(taskSelected?.due_date ?? "")}
            taskStatus={taskSelected?.status ?? "Todo"}
            // taskAssignedId={taskSelected?.assigned_id ?? ""}
            acceptClick={(task) => handleEditTask(task)}
            closeModal={() => toggle()}
          />
        ) : null}

        {showForm === FORM.COMMENT ? (
          <CommentForm
            task_id={taskId}
            comments={commentsTask}
            closeModal={() => toggle()}
          />
        ) : null}

      </Modal>
    </div>

  )
}

export default ProjectDashboard