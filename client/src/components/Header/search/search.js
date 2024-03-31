import React from "react";
import styles from "./search.module.scss";
import { TbSearch } from "react-icons/tb";
export default function Search() {
   return (
      <div className={styles.container}>
         <TbSearch size={25} />
         <input type='search' placeholder='What do you want to learn?' />
      </div>
   );
}
