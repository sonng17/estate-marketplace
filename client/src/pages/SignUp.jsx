/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({}); // to save form information
  const [loading, setLoading] = useState(false); // to set loanding effect
  const [error, setError] = useState(null); // to debug if error happend
  const navigate = useNavigate(); // to navigate when sign up successfully

  // Handle changes when type input
  const handleChange = (e) => {
    setFormData({
      ...formData, // to keep information, dont want to lose track
      [e.target.id]: e.target.value, // add new changes
    });
  };
  console.log(formData);

  // Handle changes when submit the form to db
  const handleSubmit = async (e) => {
    e.preventDefault(); //Prevent reload page when submit
    try {
      setLoading(true);
      // send sign up request and get response
      const res = await fetch("api/auth/signup", {
        // fetch is JS methods to get resources from server by send HTTP request and return a promise
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // need to stringify formData to string to send it to internet
      });
      const data = await res.json(); // convert response from promise to JSON to use and handle code
      console.log(data);

      // Debug and handle error
      // if submit false
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return; // return to end submit function, prevent navigate to home page
      } // otherwise
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5"> {error}</p>}
    </div>
  );
}
