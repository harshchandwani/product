import React, { useRef, useState } from 'react'
import Header from '../components/Header';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { checkValidData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/slice/userSlice';
import backgroundImage from "../images/backgroundImage.jpg"
import UserProfileIcon from '../images/userProfileIcon.jpg';
import { toast } from 'react-toastify';
import { motion } from "framer-motion"

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch()
  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  }

  const handleButtonClick = () => {
    //We have to validate the form data here
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) {
      return;
    }
    if (!isSignInForm) {
      //Sign up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: UserProfileIcon
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth?.current?.user; //was user before
            toast("Welcome to Netflix");
            //if we use user just like previously, in commit 3386f8c, that will not solve the error as the user will be extracted from the above, we need to use the user which is updated already
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));

          }).catch((error) => {
            toast("Welcome to Netflix")
            setErrorMessage(error.message)
          });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setErrorMessage(errorMessage + errorCode)
        });

    }
    else {
      //Sign in Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const { displayName } = user;
          toast("Welcome Back " + displayName);
          // console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage + errorCode)
        });

    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
          <form
            onSubmit={(e) => e.preventDefault()}
            className='space-y-6'
          >
            <h1 className='text-xl font-medium text-gray-900 dark:text-white'>{isSignInForm ? "Sign In" : "Sign up"}</h1>
            {!isSignInForm &&
              <input
                ref={name}
                type='text'
                placeholder='Full Name'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'

              />}
            <input
              ref={email}
              type='text'
              placeholder='Email or phone number'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            // style={{ backgroundColor: '#333333' }}
            />
            <input
              ref={password}
              type='password'
              placeholder='Password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            // style={{ backgroundColor: '#333333' }}
            />
            <div className="flex items-start">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
              </div>
              {isSignInForm && <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>}
            </div>

            <button className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign up"}</button>


            <p>{isSignInForm ? "New Here?" : "Already a User?"} <a className='text-sm font-medium text-gray-500 dark:text-gray-300' href='/#' onClick={toggleSignInForm}>{isSignInForm ? "Sign up" : "Sign in"}</a></p>
            <p className='font-bold text-lg py-2'>{errorMessage}</p>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default Login