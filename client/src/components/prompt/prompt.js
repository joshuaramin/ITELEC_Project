import React from "react";
import { TbTrash } from "react-icons/tb";
import styles from "./prompt.module.scss";
import { useMutation } from "@apollo/client";

export default function Prompt({ close, gql, variable, update }) {
   const [DELETEOBJECT] = useMutation(gql, {
      variables: variable,
      update,
   });

   const onHandleForm = (e) => {
      e.preventDefault();
      DELETEOBJECT();
   };
   return (
      <div className={styles.container}>
         <form onSubmit={onHandleForm}>
            <button type='submit' className={styles.delete}>
               <TbTrash size={30} />
            </button>
         </form>
         <button type='button' onClick={close}>
            Cancel
         </button>
      </div>
   );
}
