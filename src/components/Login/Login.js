import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';


function Login() {

  initializeLoginFramework();

  const [newUser, setNewUser] = useState(false);

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };


  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  const GoogleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        // setUser(res);
        // setLoggedInUser(res)
        // history.replace(from);
        handleResponse(res, true)
      })
  }

  const FbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        // setUser(res);
        // setLoggedInUser(res)
        // history.replace(from);
        handleResponse(res, true);
      })
  }

  const SignOut = () => {
    handleSignOut()
      .then(res => {
        // setUser(res);
        // setLoggedInUser(res)
        handleResponse(res, false)
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res)
    // history.replace(from);
    if(redirect){
      history.replace(from);
    }
  }


  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    e.preventDefault();
    if (newUser && user.email && user.password) {

      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          // setUser(res);
          // setLoggedInUser(res);
          // history.replace(from);
          handleResponse(res, true);
        })
    }

    if (!newUser && user.email && user.password) {

      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          // setUser(res);
          // setLoggedInUser(res);
          // history.replace(from);
          handleResponse(res, true);
        })
    }

  }

  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignIn ? <button onClick={SignOut}>Sign out</button> :
          <button onClick={GoogleSignIn}>Sign in</button>
        // user.isSignIn ? <button onClick={handleSignOut}>Sign out</button> :
        // <button onClick={handleGoogleSignIn}>Sign in</button>
      }
      <br />
      <button onClick={FbSignIn}>Sign in using Facebook</button>
      {/* <button onClick={handleFbSignIn}>Sign in using Facebook</button> */}
      {
        user.isSignIn &&
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own Authentication</h1>
      {/* <p>Name : {user.name}</p>
      <p>Email : {user.email}</p>
      <p>Password : {user.password}</p> */}

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your name" required />}
        <br />
        <input type="text" onBlur={handleBlur} name="email" placeholder="Your Email Address" required />
        <br />
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Your Password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
    </div>
  );
}

export default Login;
