import React from "react";
import Cookies from "js-cookie";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
   const Token = Cookies.get("access_token");

   return Token ? <Outlet /> : <Navigate to={"/"} />;
}
