import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import InputLabel from "../../components/InputLabel/InputLabel";
import { useAppDispatch } from "../../hooks/useRedux";
import { IUser, IUserRegister } from "../../models/user.model";
import { setUser } from "../../redux/slices/user.slice";
import { createUser, loginUser } from "../../services/user.service";

const Register = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")

    function handleRegister(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
  
      const userRegistration: IUserRegister = {
        fullName: fullName,
        email: email,
        password: password,
        repeatPassword: repeatPassword
      }
  
      dispatch(createUser(userRegistration))
      .then(value => {
        if(value.payload != null) {
          const user: IUser = value.payload          
          dispatch(setUser({email: user.email, fullName: user.fullname, userToken: user.userToken, projects: []}))
          navigate('/dashboard')
        }
      })
    }
    
      function checkUserInputs(): boolean {
        if(email.trim() !== "" && fullName.trim() !== "" && password.trim() !== "" && repeatPassword.trim() !== "") {
          return false
        }
        return true
      }
    
    
    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-3xl font-bold mr-4 sm:text-4xl">
                    Register
                </h1>
                <div className='flex flex-col'>
                    <form className='form' onSubmit={(e) => handleRegister(e)}>
                        <InputLabel
                            label="Full Name"
                            placeHolder="Full Name"
                            typeInput="text"
                            inputValue={fullName}
                            onValueChange={(value) => setFullName(value)}
                        />
                            
                        <InputLabel
                            label="Email"
                            placeHolder="Email"
                            typeInput="text"
                            inputValue={email}
                            onValueChange={(value) =>  setEmail(value)}
                        />    
                            
                        <InputLabel
                            label="Password"
                            placeHolder="Password"
                            typeInput="password"
                            inputValue={password}
                            onValueChange={(value) =>  setPassword(value)}
                        />

                        <InputLabel
                            label="Repeat Password"
                            placeHolder="Repeat Password"
                            typeInput="password"
                            extraClass="mb-8"
                            inputValue={repeatPassword}
                            onValueChange={(value) =>  setRepeatPassword(value)}
                        />                      
                                        
                        <Button text="Sign Up" disabled={checkUserInputs()}/>
                            
                        <span className='flex justify-center px-4 mt-6' >Have an account ?<Link to={"/login"} className="text-indigo-600 ml-2">Login</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Register