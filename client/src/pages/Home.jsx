import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <h1 className="text-indigo-800 text-2xl mt-10 flex justify-center items-center">
        Welcome,&nbsp;
        <span className="text-indigo-950 font-bold">
          {currentUser.data.username}
        </span>
      </h1>
    </div>
  );
};

export default Home;
