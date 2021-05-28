
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import LoadingBox from '../components/Loading/LoadingBox'
import MessageBox from '../components/MessageBox'
import { init, signup } from '../slices/userSlice'

const SignupScreen = (props) => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const { status, errors, userInfo } = useSelector((state) => state.user);
    const history = useHistory();

    const dispatch = useDispatch()

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(signup({username, password, password2,firstName,lastName}))
    }

    if (userInfo) {
      history.push("/");
    }

    useEffect(() => {
      if (!userInfo) {
        dispatch(init())
      }
    }, [dispatch, userInfo])

    if (status === "succeeded") {
      return <Redirect to='/signin'/>;
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
            <label htmlFor="first-name">First Name: </label>
            <input
              id="first-name"
              placeholder="Enter first name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="last_name">Last Name: </label>
            <input
              id="last_name"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          <div>
            <label htmlFor="password2">Password Confirmation: </label>
            <input
              type="password"
              id="password2"
              placeholder="Enter password again"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            ></input>
          </div>
          {status === "failed" && <MessageBox variant="danger">{errors}</MessageBox>}
          <div>
            <button className="primary" type="submit">
              Sign up
            </button>
          </div>
          <div>
            
            <div>
              Already have an account? <Link to={`/signin`}>Sign in</Link>
            </div>
          </div>
        </form>
    )
}

export default SignupScreen;