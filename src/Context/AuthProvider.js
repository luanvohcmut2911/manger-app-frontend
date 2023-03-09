import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = React.createContext();

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null); // use for GG login
  const [token, setToken] = useState(''); // use for username+ password login
  const [profile, setProfile] = useState({}); //id
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user&&!token){
      if(window.location.pathname==='/signup'){
        navigate('/signup');
        return;
      }
      navigate('/login');
    }
    else if(user) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      }).then((response)=>{
        setProfile(response.data);
      }).catch((err)=>{
        console.log(err);
      })
      navigate('/');
    }
    else if(token){
      setProfile({
        given_name: token.username,
        id: token.id,
        picture: null
      })
      navigate('/');
    }
  }, [navigate, user, token]);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      profile,
      setProfile,
      token,
      setToken
    }}>
      {children}
    </AuthContext.Provider>
  )
}
