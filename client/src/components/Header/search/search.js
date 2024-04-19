import React, { useState } from "react";
import styles from "./search.module.scss";
import { TbSearch } from "react-icons/tb";
import { GetSubjectSearch } from "../../../util/Query/subject";
import { useLazyQuery } from "@apollo/client";
import Card from "./components/card";

export default function Search() {
   const [search, setSearch] = useState("");
   const [searchData, { data }] = useLazyQuery(GetSubjectSearch);

   const onHandleChange = (e) => {
      searchData({
         variables: {
            search,
         },
      });

      setSearch(e.target.value);
   };
   return (
      <div className={styles.container}>
         <div className={styles.mainContainer}>
            <TbSearch size={25} />
            <input
               type='search'
               placeholder='What do you want to learn?'
               onChange={onHandleChange}
            />
         </div>
         {search ? (
            <div className={styles.searchDialog}>
               {data?.getSubjectBySearch.map(
                  ({ subjectID, subject, image, language }) => (
                     <Card
                        key={subjectID}
                        id={subjectID}
                        title={subject}
                        language={language}
                        image={image}
                     />
                  )
               )}
            </div>
         ) : null}
      </div>
   );
}
