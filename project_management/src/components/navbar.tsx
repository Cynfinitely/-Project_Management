
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import {useEffect, useState } from 'react'



const Navbar = () => {
  const access_token = localStorage.getItem('user')
  const token = (access_token != null) ? JSON.parse(access_token) : ''

  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    navigate('/login')
  }
  return (
    <div className="bg-indigo-800 w-full py-2 px-4 lg:px-8 lg:py-4 flex items-center justify-between text-blue-gray-900">
      <div className='flex items-center justify-between text-blue-gray-900'>
        <Link to={`/dashboard`} className="mr-4 cursor-pointer py-1  font-bold">
        <a className="text-white mr-4 cursor-pointer py-1  font-bold text-lg">
          <span>Project Management</span>
        </Link>
        <ul className="ml-5 mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          {navList.map((item, index) =>
            <li key={index} className='text-sm text-white p-1 font-normal'>
              <a href="#" className="flex items-center">
                {item}
              </a>
            </li>)}
        </ul>
      </div>
      <div className="flex items-center md:ml-12">
        <Link to={"/login"} className="text-base font-medium text-white hover:text-gray-500">Sign in</Link>
        <Link to={"/register"} className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-800 shadow-sm hover:bg-gray-300">Sign up</Link>
        {token.userToken ?
          <button onClick={handleLogout} className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700">Log out</button>
          : <>
            <Link to={"/login"} className="text-base font-medium text-gray-500 hover:text-gray-900">Sign in</Link>
            <Link to={"/register"} className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700">Sign up</Link>
          </>}
      </div>
    </div>
  );

};

export default Navbar;
