import React from "react";
import styles from "./message.module.scss";
import { TbCircleCheck, TbCircleX } from "react-icons/tb";

export default function Message({ message }) {
   return (
      <div>
         <span>{message}</span>
      </div>
   );
}
