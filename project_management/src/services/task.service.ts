import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from 'axios';

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
    createdAt: string
    desription: string
}

export const updateTask = createAsyncThunk('updateTask',
    async (props: IUpdateTask) => {

        const config = {
            headers: {
                ['x-access-token']: props.userToken
            }
        }

        const response = await axios.put(`${BASE_URL}/task/update/${props.taskId}`, {
            name: props.name,
            status: props.status,
            createdAt: props.createdAt,
            description: props.desription
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
