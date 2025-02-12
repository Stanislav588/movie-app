import { Avatar, CircularProgress } from "@mui/material";
import { useRef, useState } from "react";
import { useChooseImageToChange } from "../../hooks/useChooseImageToChange";
import { ChangeEvent } from "react";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useSelector } from "react-redux";
import { RootState } from "../Movies/MovieInterface";
export const ProfilePage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { handleChooseImage, selectedImg } = useChooseImageToChange();
  const { handleUpdateUser, isLoading } = useUpdateUser();
  const authUser = useSelector((state: RootState) => state.movie.users);

  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  async function handleUpdatingUserInfo() {
    await handleUpdateUser(selectedImg, username, fullName);
  }
  function handleUpload() {
    ref.current?.click();
  }
  function handlingChangeImg(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files?.[0];
    if (file) {
      handleChooseImage(file);
    }
  }
  return (
    <>
      <div>
        <Link to="/">
          <button className="back-btn text-white rounded-lg px-9 py-1 mt-10 ml-4">
            Back
          </button>
        </Link>
        {authUser?.uid ? (
          <div className="block mx-auto my-20 max-w-80">
            <div className="flex text-center flex-col gap-3">
              <div className="flex flex-col items-center">
                <Avatar
                  src={selectedImg || authUser.profilePicture}
                  sx={{ width: 100, height: 100, marginBottom: 1 }}
                />
                <p className="text-white text-2xl font-medium mb-2">
                  {authUser?.username}
                </p>
                <input
                  ref={ref}
                  onChange={handlingChangeImg}
                  className="hidden"
                  type="file"
                />

                <button
                  onClick={handleUpload}
                  className="text-white bg-neutral-700 py-2 px-5  rounded-lg hover:bg-neutral-500 transition-all"
                >
                  Change image
                </button>
              </div>
              <div className="flex-col flex gap-2 mt-2">
                <input
                  className="py-2 w-[100%] px-2 rounded-md"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  placeholder="Username"
                />
                <input
                  className="py-2 w-[100%] px-2 rounded-md"
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  placeholder="First name"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleUpdatingUserInfo}
                  className="text-lg text-white py-1 px-5 bg-yellow-600 rounded-lg"
                >
                  {isLoading ? (
                    <CircularProgress size="22px" />
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-white text-center mt-16 text-3xl">
            Sign in into your account to change user info
          </h1>
        )}
      </div>
    </>
  );
};
