import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { client } from "../client";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logoWhite.png";
import bg from "../assets/bg.jpg";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const decoded = jwt_decode(response.credential);

    localStorage.setItem("user", JSON.stringify(decoded));

    const { name, picture, sub } = decoded;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div
      data-testid="login"
      className="flex justify-start items-center flex-col h-screen bg-black"
    >
      <div className="relative w-full h-full">
        <img src={bg} className="w-full h-full object-cover" />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              text="Sign in with Google"
              onSuccess={responseGoogle}
              onError={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
