"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthAction, logoutAction } from "../reduxStore/action/auth";
import SplashScreen from "./SplashScreen";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { isLoadingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch({ type: "IS_LOADING_AUTH", data: true });

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
          credentials: "include",
        });

        if (res.status === 401) {
          // Try refreshing the token
          const refreshResp = await fetch(
            `${import.meta.env.VITE_API_URL}/refresh`,
            { method: "POST", credentials: "include" }
          );

          if (!refreshResp.ok) {
            // Refresh failed — session is gone, go to login
            if (window.location.pathname !== "/login") {
              window.location.href = "/login";
            }
            return;
          }

          // Refresh succeeded — retry /me once
          const retryRes = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
            credentials: "include",
          });

          if (!retryRes.ok) {
            // Cookie still not working — go to login instead of looping
            if (window.location.pathname !== "/login") {
              window.location.href = "/login";
            }
            return;
          }

          const retryData = await retryRes.json();
          dispatch(
            setIsAuthAction({ isAuthenticated: true, user: retryData })
          );
          return;
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
