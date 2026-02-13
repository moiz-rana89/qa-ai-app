"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthAction, logoutAction } from "../reduxStore/action/auth";
import SplashScreen from "./SplashScreen";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { isLoadingAuth } = useSelector((state) => state.auth);

  const refreshToken = async () => {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!resp.ok && !(window.location.pathname == "/login")) {
      window.location.href = "/login";
      throw new Error("Session expired");
    }
  };
  useEffect(() => {
    const checkAuth = async () => {
      dispatch({ type: "IS_LOADING_AUTH", data: true });

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
          credentials: "include",
        });
        if (res.status === 401) {
          refreshToken();
          return; // stop further execution
        }
        if (!res.ok) throw new Error();
        const data = await res.json();

        dispatch(
          setIsAuthAction({
            isAuthenticated: true,
            user: data,
          })
        );
      } catch (err) {
        dispatch(
          setIsAuthAction({
            isAuthenticated: false,
            user: null,
          })
        );
      } finally {
        dispatch({ type: "IS_LOADING_AUTH", data: false });
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isLoadingAuth) {
    return <SplashScreen />;
  }

  return children;
}
