import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";

const register = () => {
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const baseURL = "http://192.168.29.50:8000/register";
  function handleForm(e) {
    setNewUser((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = newUser;

    try {
      const doc = await axios.post(baseURL, {
        name,
        email,
        password,
      });
      console.log(doc.data);
    } catch (error) {
        console.log(error.message);
    }
};

useEffect(()=>{
    axios.get(baseURL).then((res) => {
      console.log(res.data);
    });

},[])

  return (
    <div>
      <div className="container flex flex-col justify-between  align-middle m-4">
        <div className="header-main flex justify-between mx-2">
          <div className="register-header">
            <h1 className="font-bold text-2xl ">Get Started!</h1>
          </div>
          <div className="login-button">
            <button className="bg-blue-800 text-white rounded-md px-4 py-2 mr-6">
              <NavLink to="login">
                Log in
              </NavLink>
            </button>
          </div>
        </div>
        <div className="form-container lg:w-full  flex flex-col lg:items-center  mt-16 p-1 mr-6 ">
          <div className="create-account flex flex-col justify-center lg:items-center ">
            <p className="text-4xl font-bold ">Create an Account</p>
            <p className="font-light">Let's get Started with your todo's</p>
          </div>
          <div className="form mt-10   space-y-3 ">
            <form method="post" onSubmit={handleSubmit}>
              <div className="name">
                <label htmlFor="Name"></label>
                <input
                  className="border-b-2 p-4 text-md font-bold w-full capitalize  "
                  name="name"
                  required
                  type="text"
                  onChange={handleForm}
                  value={newUser.name || ""}
                  placeholder="name"
                />
              </div>
              <div className="email">
                <label htmlFor="email"></label>
                <input
                  className="border-b-2 p-4 text-md font-bold w-full capitalize"
                  name="email"
                  required
                  type="text"
                  onChange={handleForm}
                  value={newUser.email}
                  placeholder="email"
                />
              </div>
              <div className="password mb-4">
                <label htmlFor="password"></label>
                <input
                  className="border-b-2 p-4 text-md font-bold w-full capitalize"
                  name="password"
                  required
                  type="password"
                  onChange={handleForm}
                  value={newUser.password}
                  placeholder="Password"
                  autoComplete="true"
                />
              </div>
              <div className="buttons flex flex-col  items-center space-y-3 mt-12 ">
                <div className="submit-button">
                  <button
                    type="submit"
                    className="bg-blue-800  text-lg text-yellow-50 px-24 py-2 rounded-2xl"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </form>
            <div className="gootle-button flex items-center justify-center">
              <Link
                role="button"
                to="auth/google"
                className="bg-white border font-bold capitalize text-lg   text-black px-12 py-2 rounded-2xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 inline ml-3 mr-2"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Sign up with Google
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default register;
