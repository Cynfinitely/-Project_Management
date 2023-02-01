export interface IUserAuth {
  email: string
  password: string
}

export interface IUserRegister extends IUserAuth {
  fullname: string
  repeatPassword: string
}

interface IProject {
  _id: string
  name: string
  createdAt: string
  users: string[]
}

export interface IUser {
  id?: string
  fullname: string
  email: string
  projects: IProject[]
  userToken: string
}

interface IUserState {
  user: IUser | null
  isLoading: boolean
}

export const userInitialState: IUserState = (() => {
  const data = JSON.parse(localStorage.getItem('user') ?? 'null')
  return {
    user: data,
    isLoading: false
  }
})()