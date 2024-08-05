import React from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imageError, setImageError] = useState(false);
  const [imagePerecent, setImagePercent] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  console.log("form data ", formData);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    console.log(image);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-gray-500 text-center font-extrabold font-bold my-10">
        Profile
      </h1>

      <form className="flex flex-col gap-7">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser.data.profilePicture}
          alt="profile"
          className="mt-3 w-24 h-24 self-center rounded-full object-cover cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700 font-semibold">
              Error Uploading Image (File size must be less than 2 MB)
            </span>
          ) : imagePerecent > 0 && imagePerecent < 100 ? (
            <span className="text-slate-800 font-semibold">{`Uploading : ${imagePerecent}`}</span>
          ) : imagePerecent === 100 ? (
            <span className="text-green-700 font-semibold">
              Image uploaded Successfully
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          defaultValue={currentUser.data.username}
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          // onChange={handleChange}
        />
        <input
          type="email"
          defaultValue={currentUser.data.email}
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          // onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          // onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer font-semibold">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer font-semibold">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
