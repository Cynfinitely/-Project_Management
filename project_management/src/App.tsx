import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from "react-redux";

import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import { store } from "./redux/store";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import "./App.css";

import ProjectDashboard from './pages/ProjectDashboard/ProjectDashboard';
import Navbar from './components/navbar';


function App() {
  return (
    <Provider store={store}>
      <ReactNotifications />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          {/*  path="/project/:id" */}
          <Route path="/project" element={<ProjectDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
