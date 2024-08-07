import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-blue-950 text-2xl font-bold mt-10 flex justify-center items-center">
        Welcome,&nbsp;
        <span className="text-blue-900 font-extrabold">
          {currentUser.data.username}
        </span>
      </h1>
      <p className="mt-8 mb-4 text-slate-700 font-semibold">
        This is a full-stack web application built with the MERN (MongoDB,
        Express, React, Node.js) stack. It includes authentication features that
        allow users to sign up, log in, and log out, and provides access to
        protected routes only for authenticated users.
      </p>
      <p className="mb-4 text-slate-700 font-semibold">
        The front-end of the application is built with React and uses React
        Router for client-side routing. The back-end is built with Node.js and
        Express, and uses MongoDB as the database. Authentication is implemented
        using JSON Web Tokens (JWT).
      </p>
      <p className="mb-4 text-slate-700 font-semibold">
        This application is intended as a starting point for building full-stack
        web applications with authentication using the MERN stack. Feel free to
        use it as a template for your own projects!
      </p>
    </div>
  );
};

export default Home;
