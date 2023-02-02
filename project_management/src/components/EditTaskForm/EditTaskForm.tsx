
import { useState } from 'react';

import InputLabel from './../InputLabel/InputLabel';
import TextAreaLabel from '../TextAreaLabel/TextAreaLabel';
import ModalFooter from '../ModalFooter/ModalFooter';

import { ITask, Task } from '../../models/task.model';

import './style.css'
import CheckBox from '../CheckBox/CheckBox';

interface IEditTaskFormProps {
  taskId: string
  taskName: string;
  taskDescription: string,
  taskStatus: string,
  taskDate: string,
  // taskAssignedId: string
  closeModal: () => void
  acceptClick: (task: Task) => void
}

export interface ITaskUpdated {
  title: string
  description: string
  status: string
  dueDate: string
  // assigned_id: string
}

const EditTaskForm = ({
  taskId,
  taskName,
  taskDescription,
  taskStatus,
  taskDate,
  // taskAssignedId,
  acceptClick,
  closeModal
}: IEditTaskFormProps) => {

  const [title, setTitle] = useState(taskName)
  const [desription, setDescription] = useState(taskDescription)
  const [status, setStatus] = useState(taskStatus)
  const [dueDate, setDueDate] = useState(taskDate)
  // const [assignedId, setAssignedId] = useState(taskAssignedId)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()    
    const task: Task = {
      _id: taskId,
      name: title,
      status: status,
      due_date: dueDate,
      description: desription,
      // assigned_id: assignedId,
    }
    acceptClick(task)          
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center items-center text-center p-2 uppercase font-bold">
        {taskName}
      </div>
      <form className="form-edit" onSubmit={(e) => handleSubmit(e)}>

        <InputLabel 
          label='Title'
          typeInput='text'
          inputValue={title}
          placeHolder={"Your Title Here"}
          onValueChange={(e) => setTitle(e)}    
          extraClass="border border-gray-300 my-3 p-3 rounded-md focus:border-gray-500 focus:ring-1 ring-gray-500 "      
        />

        <TextAreaLabel 
          label='Description'
          inputValue={desription}
          onValueChange={(e) => setDescription(e)}  
          extraClass="appearance-none border border-gray-300 my-3 p-3 rounded-md focus:border-gray-500 focus:ring-1 ring-gray-500"    
        />

        <InputLabel 
          label='Due Date'
          typeInput='date'
          placeHolder={"Your Title Here"}
          inputValue={dueDate}
          onValueChange={(e) => setDueDate(e)}    
          extraClass="border border-gray-300 my-3 p-3 rounded-md focus:border-gray-500 focus:ring-1 ring-gray-500 "      
        />

        <h3>Status</h3>
        <CheckBox text={status} onChange={(newStatus) => setStatus(newStatus)}/>
      
        <ModalFooter cancelClick={() => closeModal()}/>
      </form>
    </div>
  )
}

export default EditTaskForm
