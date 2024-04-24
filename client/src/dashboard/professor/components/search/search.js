import React, { useState } from "react";
import styles from "./search.module.scss";
import { DecodedToken } from "../../../../auth/token";
import { GetSubjectSearch } from "../../../../util/Query/subject";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const router = useNavigate();
  const [search, setSearch] = useState("");

  const token = DecodedToken();
  const [SearchData, { data, loading, error }] = useLazyQuery(
    GetSubjectSearch,
    {
      variables: {
        search,
        userId: token,
      },
    }
  );

  const onHandleSearch = (e) => {
    SearchData();
    setSearch(e.target.value);
  };
  return (
    <div className={styles.container}>
      <input type="text" placeholder="Search" onChange={onHandleSearch} />
      {!search ? null : (
        <div className={styles.search}>
          {data?.getSubjectBySearch.map(
            ({ subjectID, image, subject, language, description }) => (
              <div
                onClick={() =>
                  router(`/dashboard/professor/course/${subjectID}`)
                }
                className={styles.searchCard}
              >
                <div>
                  <img src={image} alt="" height={65} width={200} />
                </div>
                <div className={styles.info}>
                  <span>{subject}</span>
                  <span className={styles.language}>Language: {language}</span>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
