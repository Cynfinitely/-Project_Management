import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';

import { BASE_URL } from "../utils/constants";

interface IRequesTask {
    userToken: string
    taskId: string
}

export const fetchSingleTask = createAsyncThunk('fechSingleTask',
    async (props: IRequesTask, thunkAPI) => {

        const config = {
            headers: {
                ['x-access-token']: props.userToken
            }
        }

        const response = await axios.post(`${BASE_URL}/task/${props.taskId}`, config)

        if (response.status === 200) {
            return response.data
        } else {
            thunkAPI.rejectWithValue(null)
        }

    })

interface IUpdateTask extends IRequesTask {
    name: string
    status: string
    due_date: string
    desription: string
    // assigned_id: string
}

export const updateTask = createAsyncThunk('updateTask',
    async (props: IUpdateTask) => {

        const config = {
            headers: {
                ['x-access-token']: props.userToken
            }
        }
        console.log(props)
        const response = await axios.put(`${BASE_URL}/task/update/${props.taskId}`, {
            name: props.name,
            status: props.status,
            due_date: props.due_date,
            description: props.desription,
            // assigned_id: props.assigned_id
        }, config)

        if (response.status === 200 || response.status === 201) {
            return response.data
        } else {
            return null
        }

    })


export const fetchCommentByTask = createAsyncThunk('fetchCommentByTask',
    async (taskId: string) => {

        const response = await axios.get(`${BASE_URL}/task/${taskId}/comments`)

        if (response.status === 200 || response.status === 201) {
            return response.data
        } else {
            return null
        }

    })
