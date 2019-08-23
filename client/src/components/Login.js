import React, {useState} from "react";
import axios from 'axios'

const Login = (props) => {
  const [user, setUser] = useState({username: '', password: ''})
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleLogin = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/login', user)
            .then(res => {
                const token = res.data.payload;
                localStorage.setItem('token',token)
                props.history.push('/protected');
            })
            .catch(err => {
                console.log(err.response)
            })

       
    }

  const handleChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }


console.log('outside hC' ,user)
  return (
    
    <>
      <form onSubmit={handleLogin}>
        <label>username:
          <input 
          type='text'
          name='username'
          value={user.username}
          placeholder='username'
          onChange={handleChange}
        />
        </label>
        
        <label>password:
          <input 
          type='password'
          name='password'
          value={user.password}
          placeholder='password'
          onChange={handleChange}
        />
        </label>
        
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
