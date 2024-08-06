import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      dispatch(signInSuccess(data));
      alert("User login Successfully");
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  // console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-gray-500 text-center font-extrabold font-bold my-10">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" action="">
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 mt-4 p-3 text-white font-semibold rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />

        <div className="flex gap-3 mt-5">
          <p>Dont have an account ?</p>
          <Link to="/signup">
            <span className="text-blue-500 font-semibold">Sign Up</span>
          </Link>
        </div>
        <p className="text-red-700 font-semibold pt-2 mt-1">
          {error ? error.message || "Something went wrong" : ""}
        </p>
      </form>
    </div>
  );
};

export default SignIn;
