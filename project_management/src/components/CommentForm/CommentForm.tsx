import { useState } from 'react';

import { ICommentTask } from "../../models/comment.model";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useEffect } from 'react';
import { addNewComment } from "../../services/comment.service";
import { deleteComment } from './../../services/comment.service';

import './styles.css'

interface ICommentForm {
  comments: ICommentTask[],
  task_id: string
  closeModal: () => void
}
const CommentForm = ({
  comments,  
  task_id,
  closeModal
}: ICommentForm) => {

  const dispatch = useAppDispatch()
  const userState = useAppSelector(state => state.user)
  const { user } = userState
  const [addCommnet, setAddComment] = useState(false)
  const [listComment, setListComment] = useState<ICommentTask[]>(comments)
  const [commentValue, setCommentValue] = useState("")

  useEffect(() => {
    console.log("user?.fullname --> ", user)
    console.log(comments)
  }, [])

  function handleAddComment() {
    const newComment: ICommentTask = {
      description: commentValue,
      writer_id: userState.user?.id ?? "",
      task_id: task_id
    }
    dispatch(addNewComment(newComment))
    .then(value => {      
      setAddComment(!addCommnet)
      setCommentValue("")
      listComment.push(value.payload['comment'])
      setListComment([...listComment])      
    })
  }

  function handleDeleteComment(commentId: string) {
    dispatch(deleteComment(commentId))
    .then(value => {
      if(value) {
        const newComments = listComment.filter(item => item._id != commentId)
        setListComment(newComments)
      }
    })
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="comment-list w-full flex flex-col">
        <div className="flex justify-between w-full">
          <h3>Comments List</h3>
          <hr></hr>
          {/* <button className="max-h-5 flex items-center justify-center p-4" onClick={() => setAddComment(true)}>Add Comment</button> */}
          <button className='bg-inherit text-gray-400 rounded-full pb-2 px-3 bg-gray-200 font-bold hover:text-gray-700' onClick={() => setAddComment(true)}>+</button>
        </div>

        {listComment.length > 0 ? (
          listComment.map((value, index) => {
            return (
              <div className="comment-item w-full flex flex-row mt-4">
                <h4>{user?.fullname}</h4>
                <textarea
                  className="area-comment-item w-full border resize-none"
                  value={listComment[index].description}
                  maxLength={100}                 
                  rows={1}
                />
                <button onClick={() => handleDeleteComment(value._id ?? "")} className='bg-inherit text-red-800 hover:text-red-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                </button>
              </div>
            )
          })
        ) : null}
      </div>

      {addCommnet ? (
        <div className="w-full flex flex-col">
           <h3>Add Comment</h3>
          <textarea
            className="w-full border resize-none p-4"
            value={commentValue}
            maxLength={100}
            onChange={(e) => setCommentValue(e.target.value)}
            rows={2}
          />
          <button className="mt-4" onClick={() => handleAddComment()}>Add Comment</button>
          <button className="bg-transparent text-black mt-4 mb-4" onClick={() => setAddComment(!addCommnet)}>Cancel</button>
        </div>
      ) : null}

    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      <button
        onClick={() => closeModal()}
        type="submit" 
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Accept
      </button>
    </div>
    </div>
  )
}

export default CommentForm;
