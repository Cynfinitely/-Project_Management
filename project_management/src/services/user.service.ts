import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from 'axios';

import { IUser, IUserAuth, IUserRegister } from "../models/user.model";
import { BASE_URL } from "../utils/constants";

export const fetchUserProfile = createAsyncThunk('fetchUserProfile',
  async (token: string, thunkAPI) => {

    const response = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    } else {
      thunkAPI.rejectWithValue(null)
    }
  })

//TODO: need to define the endpoints
export const fetchUserSession = createAsyncThunk('fetchUserSession',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(fetchUserProfile(""))
    // const token = localStorage.getItem('access_token')  
    // if(token != null) {
    //   thunkAPI.dispatch(fetchUserProfile(JSON.parse(token)))
    // } else {
    //   thunkAPI.rejectWithValue(null)
    // }
  })

//TODO: need to define the endpoints
export const createUser = createAsyncThunk('createUser',
  async (userRegistration: IUserRegister, thunkAPI) => {

    const response = await axios.post(`${BASE_URL}/signup`, {
      fullname: userRegistration.fullname,
      email: userRegistration.email,
      password: userRegistration.password,
      confirmPassword: userRegistration.repeatPassword
    })

    if (response.status === 201 || response.status === 200) {
      localStorage.setItem('access_token', JSON.stringify(response.data))
      return response.data
    } else {
      thunkAPI.rejectWithValue(null)
      return null
    }
  })

//TODO: need to define the endpoints
export const loginUser = createAsyncThunk('loginUser',
  async (userLogin: IUserAuth, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: userLogin.email,
        password: userLogin.password
      })

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem('access_token', JSON.stringify(response.data))
        return response.data
      }
      return null
    } catch (error: unknown) {
      return null
    }
  })
