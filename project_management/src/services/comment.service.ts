import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from 'axios';

import { BASE_URL } from "../utils/constants";

interface ICreateComment {
    description: string
    writer_id: string
    task_id: string
}

export const deleteComment = createAsyncThunk('deleteComment',
    async (commentId: string, thunkAPI) => {

        const response = await axios.delete(`${BASE_URL}/comment/delete/${commentId}`)

        if (response.status === 200) {
            return response.data
        } else {
            thunkAPI.rejectWithValue(null)
        }

    })

export const addNewComment = createAsyncThunk('addNewComment',
    async (props: ICreateComment, thunkAPI) => {
        console.log(props,'props');


        const response = await axios.post(`${BASE_URL}/comment/new`, {
            description: props.description,
            task_id: props.task_id,
            writer_id: props.writer_id
        })

        if (response.status === 200) {
            return response.data
        } else {
            thunkAPI.rejectWithValue(null)
        }

    })

