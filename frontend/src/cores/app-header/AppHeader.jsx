import { useState, useEffect } from 'react';
import { Avatar, Typography } from "@mui/material";
import "./app-header.css";
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 

    navigate("/signin");
  };

  return (
    <div className="h-14 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-2">
        <Avatar
          style={{
            background: "#4BA561",
            fontSize: "12px",
            width: "40px",
            height: "40px",
            marginLeft:"20px"
          }}
        >
          EM
        </Avatar>
        <Typography className="pt-0">E-Marketing</Typography>
      </div>

      <div className="">
        <div className="flex flex-row items-center mr-10 px-2 py-1 mx-3 my-1 rounded border border-gray-300 ">
          {isLoggedIn && ( // Render logout button if logged in
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
