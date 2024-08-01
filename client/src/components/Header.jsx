import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-300 p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-2">
        <Link to="/">
          <h1 className="font-bold text-2xl"> Auth App</h1>
        </Link>
        <ul className="flex gap-7 font-sans font-semibold">
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/about">
            <li>About</li>
          </Link>

          <Link to="/signin">
            <li>Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
