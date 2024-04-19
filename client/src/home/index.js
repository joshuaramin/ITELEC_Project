import React from "react";
import styles from "./page.module.scss";
import WhyWorks from "./components/whyworks";
import Testimonial from "./components/testimonial";
import Card from "../components/card/card";
import { GetAllSubject } from "../util/Query/subject";
import { useQuery } from "@apollo/client";

export default function Home() {
   const { data, loading, error } = useQuery(GetAllSubject, {
      variables: {
         take: 10,
         skip: 0,
      },
   });

   return (
      <div className={styles.container}>
         <div className={styles.quote}>
            <div>
               <span>
                  Explore Limitless Learning with Our Free Online Academy—No
                  Fees, No Commitments Required!
               </span>
               <a href={"/auth/register"}>Join Now</a>
            </div>
            <div>
               <img src='/image/lms.png' alt='' />
            </div>
         </div>

         <div className={styles.instructors}>
            <h2>
               Discover a World of Knowledge with School Academy's Cutting-Edge
               Features!
            </h2>
         </div>
         <div className={styles.courses}>
            <div className={styles.courseTitle}>
               <h2>Top Course</h2>
            </div>
            <div className={styles.cardGrid}>
               {loading
                  ? "Loading"
                  : data?.getAllSubject.map(
                       ({
                          subjectID,
                          subject,
                          user,
                          lessonCount,
                          tags,
                          image,
                          description,
                       }) => (
                          <Card
                             key={subjectID}
                             id={subjectID}
                             name={subject}
                             image={image}
                             author={user.profile.fullname}
                             count={lessonCount}
                             tags={tags}
                          />
                       )
                    )}
            </div>
         </div>

         <WhyWorks />
         <Testimonial />
      </div>
   );
}
