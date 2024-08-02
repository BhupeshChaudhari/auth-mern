import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);

      setLoading(false);
      if (data.error) {
        setError(true);
        return;
      }

      alert("User Created Successfully");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  // console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-gray-500 text-center font-extrabold font-bold my-10">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" action="">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <div className="flex gap-3 mt-5">
          <p>Already have an account ?</p>
          <Link to="/signin">
            <span className="text-blue-500 font-semibold">Sign In</span>
          </Link>
        </div>
        <p className="text-red-700 font-semibold pt-2 mt-1">
          {error && "Something Went Wrong !"}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
