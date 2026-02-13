import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";

import { setIsAuthAction, setLoaderAction } from "../../reduxStore/action/auth";
import SplashScreen from "../../layout/SplashScreen";
import { useNavigate } from "react-router-dom";
// import { login } from "../../reduxStore/action/auth";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setshowPassword] = useState(true);
  const [loading, setLoading] = useState(true);

  //   const { setlogin, setuserRole } = useContext(AppContext);

  const { isLoadingAuth } = useSelector((store) => store?.auth);
  const isPending = false;
  //   const { mutate, isError, isPending, error } = useLogin();
  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     alert("Enter email and password");
  //     return;
  //   }
  //   try {
  //     dispatch(setLoaderAction(true));
  //     const form = new FormData();
  //     form.append("username", email);
  //     form.append("password", password);
  //     const resp = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/login`,
  //       form
  //     );
  //     localStorage.setItem("auth_token", resp?.data?.access_token);
  //     localStorage.setItem("user_details", JSON.stringify(resp?.data?.user));
  //     dispatch(setLoaderAction(false));
  //     dispatch(setIsAuthAction(true));
  //     navigate("/");
  //   } catch (error) {
  //     dispatch(setLoaderAction(false));
  //     dispatch(setIsAuthAction(false));
  //   }
  // };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }
    dispatch({ type: "IS_LOADING_AUTH", data: true });

    try {
      dispatch(setLoaderAction(true));

      const form = new FormData();
      form.append("username", email);
      form.append("password", password);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        body: form,
        credentials: "include", // important: cookies
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      dispatch(setLoaderAction(false));
      dispatch(
        setIsAuthAction({
          isAuthenticated: true,
          user: data.user, // backend user info only
        })
      );

      navigate("/"); // redirect after login
    } catch (err) {
      dispatch(
        setIsAuthAction({
          isAuthenticated: false,
          user: null,
        })
      );
      dispatch(setLoaderAction(false));
    } finally {
      dispatch({ type: "IS_LOADING_AUTH", data: false });
      dispatch(setLoaderAction(false));
    }
  };

  const checkLogin = async () => {
    const token = await localStorage.getItem("auth_token");
    if (token !== null) {
      dispatch(setIsAuthAction(true));
    }
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     checkLogin();
  //     setLoading(false);
  //   }, 2000); // Example delay
  //   return () => clearTimeout(timeout);
  // }, []);

  // if (loading) {
  //   return <SplashScreen />;
  // }
  //   useEffect(() => {
  //     if (error) {
  //       {
  //         console.error("error", error);
  //         toast.error("Invalid username or password");
  //       }
  //     }
  //   }, [isError]);

  return (
    <div className=" w-full h-[100vh]   flex-col gap-4  flex items-center justify-center">
      <div className="border border-[#e5e7eb] relative  flex flex-col overflow-hidden rounded-3xl">
        <div className=" gap-4  h-[500px] relative items-center justify-center w-[600px]  flex flex-col  cursor-pointer overflow-hidden z-[-2]  ">
          <div
            style={{
              right: "-408px",
              bottom: "-400px",
            }}
            className="z-[-1] absolute  rounded-[210px] bg-[rgb(201,246,193)] w-[600px] h-[600px] animate-[spin_8s_linear_infinite]"
          ></div>

          <div
            style={{
              // animation: "spin 9s linear infinite",
              right: "-420px",
              bottom: "-400px",
            }}
            className="z-[-1] absolute  rounded-[210px] bg-[rgb(105,201,32)] w-[600px] h-[600px] animate-[spin_7s_linear_infinite] "
          ></div>
        </div>
        <div className=" absolute top-[150px] left-[100px] gap-4 flex flex-col">
          <input
            autoFocus
            className="border-[#e5e7eb] z-10  w-[400px] border-2 rounded-3xl h-[40px] px-4 outline-none"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email"
          />
          <div className="border-[#e5e7eb] flex items-center  w-[400px] border-2 rounded-3xl h-[40px]  outline-none">
            <input
              className="w-[370px] px-4 rounded-3xl h-full  outline-none"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
              type={showPassword == true ? "password" : "text"}
            />
            <div
              onClick={() => setshowPassword(!showPassword)}
              className=" flex items-center justify-center pr-4 cursor-pointer"
            >
              {showPassword == true ? (
                <Icon icon="majesticons:eye-off" />
              ) : (
                <Icon icon="mdi:eye" />
              )}
            </div>
          </div>

          <button
            onSubmit={() => handleLogin()}
            onClick={() => handleLogin()}
            disabled={isLoadingAuth ? true : false}
            className={`${
              isLoadingAuth ? ` pointer-events-none  opacity-70` : ` `
            }  z-10  bg-[#68c91f]  text-white px-4 rounded-full py-2 cursor-pointer items-center justify-center text-center `}
          >
            {isLoadingAuth ? `Pending` : `Login`}
          </button>
        </div>
      </div>
    </div>
  );
}
