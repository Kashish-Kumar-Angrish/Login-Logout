import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../util";

const Home = () => {

  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();
  
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[]);

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      handleSuccess('loggedOut Successfully')
      navigate('/login')
    }, 1000);
  }

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home