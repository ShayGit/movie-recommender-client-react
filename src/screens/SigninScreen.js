
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useLocation } from 'react-router-dom'
import LoadingBox from '../components/Loading/LoadingBox'
import MessageBox from '../components/MessageBox'
import { init, signin } from '../slices/userSlice'

const SigninScreen = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status, errors, userInfo } = useSelector((state) => state.user);

    const dispatch = useDispatch()
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(signin({username, password}))
    }
  
    useEffect(() => {
      if (!userInfo) {
      dispatch(init())
      }
    }, [dispatch, userInfo])
    if(userInfo){
      return(
        <Redirect to={from}/>
      )
    }
    return (
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Sign In</h1>
          </div>
          {status === "loading" && <LoadingBox/>}
          
          <div>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              placeholder="Enter username"
              required
              value={username}
  
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          {status === "failed" && <MessageBox variant="danger">{errors}</MessageBox>}
          <div>
            <button className="primary" type="submit">
              Sign in
            </button>
          </div>
          <div>
            
            <div>
              New user? <Link to={`/signup`}>Create your account</Link>
            </div>
          </div>
        </form>
    )
}

export default SigninScreen;