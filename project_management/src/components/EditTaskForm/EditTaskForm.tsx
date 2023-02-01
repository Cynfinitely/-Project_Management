
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
  taskDate: string
  closeModal: () => void
  acceptClick: (task: Task) => void
}

export interface ITaskUpdated {
  title: string
  description: string
  status: string
  dueDate: string
}

const EditTaskForm = ({
  taskId,
  taskName,
  taskDescription,
  taskStatus,
  taskDate,
  acceptClick,
  closeModal
}: IEditTaskFormProps) => {

  const [title, setTitle] = useState(taskName)
  const [desription, setDescription] = useState(taskDescription)
  const [status, setStatus] = useState(taskStatus)
  const [dueDate, setDueDate] = useState(taskDate)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()    
    const task: Task = {
      _id: taskId,
      name: title,
      status: status,
      createdAt: dueDate,
      description: desription
    }
    acceptClick(task)          
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center items-center bord border-2 text-center p-2 uppercase font-bold">
        {taskName}
      </div>
      <form className="form-edit" onSubmit={(e) => handleSubmit(e)}>

        <InputLabel 
          label='Title'
          typeInput='text'
          inputValue={title}
          placeHolder={"Your Title Here"}
          onValueChange={(e) => setTitle(e)}        
        />

        <TextAreaLabel 
          label='Description'
          inputValue={desription}
          onValueChange={(e) => setDescription(e)}        
        />

        <h3>Due Date</h3>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>

        <h3>Status</h3>
        <CheckBox text={status} onChange={(newStatus) => setStatus(newStatus)}/>

        <ModalFooter cancelClick={() => closeModal()}/>
      </form>
    </div>
  )
}

export default EditTaskForm
