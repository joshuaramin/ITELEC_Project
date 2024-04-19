import React from "react";
import Header from "../components/Header/header";
import Footer from "../components/foooter/footer";
import { Outlet } from "react-router-dom";

export default function Mainlayout() {
   return (
      <div>
         <Header />
         <Outlet />
         <Footer />
      </div>
   );
}
