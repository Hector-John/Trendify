import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import axios from 'axios'

const Login = ({setLogin}) => {

    const {url, setToken} = useContext(Context)

    const [currentState, setCurrentState] = useState('Login')
    const [data, setData] = useState({
name : "",
email: "",
password: ""
    })

const onChange = (e)=>{
const name = e.target.name
const value = e.target.value

setData({...data, [name]:value})
}

const onLogin = async(e)=>{
e.preventDefault()
let newUrl = url

if (currentState==="Login") {
    newUrl += "/api/user/login"
}
else{
    newUrl += "/api/user/register"
}

const response = await axios.post(newUrl, data)
if (response.data.success) {
   setToken(response.data.token)

    localStorage.setItem("token", response.data.token)
    setLogin(false)
     
}
else{
    alert(response.data.message)
}
}


  return (
    <div className='login'>
<form className="LoginContainer" onSubmit={onLogin}>
<div className="loginTitle">
    <h2>{currentState}</h2>
    <img onClick={() => setLogin(false)} src={assets.cross_icon} alt="" />
</div>
<div className="loginInput">
    {currentState==="Login"?<></>:
    <input name='name' onChange={onChange} value={data.name} type="text" placeholder='Enter your name' required />
}
    <input name='email' onChange={onChange} value={data.email} type="email" placeholder='Enter your email' required />
    <input name='password' onChange={onChange} value={data.password}  type="password" placeholder='Password' required />
</div>
<button type='submit '>{currentState ==="Sign Up"?"Create an account":"Login"}</button>
<div className="loginCondition">
    <input type="checkbox" required />
    <p>By continuing, I agree to the terms of use and privacy policy.</p>
</div>
{currentState==="Login"?
<p>Create an account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>:
<p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login</span></p>}
</form>
    </div>
  )
}

export default Login