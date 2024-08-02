import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-gray-500 text-center font-extrabold font-bold my-10">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4" action="">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
        />

        <button className="bg-slate-700 mt-4 p-3 text-white font-semibold rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>

        <div className="flex gap-3 mt-5">
          <p>Already have an account ?</p>
          <Link to="/signin">
            <span className="text-blue-500 font-semibold">Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
