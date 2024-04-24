import React, { useState, useEffect } from "react";
import styles from "./card.module.scss";
import { TbChevronDown, TbChevronUp, TbLock, TbNotes } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Token from "../../auth/token";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Card({ lesson, subjectID, lessonID, chapter, id }) {
  const router = useNavigate();

  const [token, setToken] = useState("");

  useEffect(() => {
    const cookies = Cookies.get("access_token");

    if (cookies) {
      const decoded = jwtDecode(cookies);
      setToken(decoded.userID);
    }
  }, [token]);

  const [open, close] = useState(false);

  return (
    <div className={styles.container}>
      {token}
      <div className={styles.course} key={lessonID}>
        <div className={styles.courseHeader}>
          <h2>{lesson}</h2>
          <button onClick={() => close(() => !open)}>
            {open ? <TbChevronUp size={23} /> : <TbChevronDown size={23} />}
          </button>
        </div>
        {open ? (
          <div className={styles.topicContainer}>
            {chapter.map(({ chapterID, chapter }) => (
              <div key={chapterID} className={styles.topic}>
                <div className={styles.info}>
                  <TbNotes size={23} />
                  {token ? (
                    <h2
                      onClick={() =>
                        router(`/course/${subjectID}/chapter/${chapterID}`)
                      }
                    >
                      {chapter}
                    </h2>
                  ) : (
                    <h2>{chapter}</h2>
                  )}
                </div>
                <TbLock size={23} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
