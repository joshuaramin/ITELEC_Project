import React from "react";
import styles from "./page.module.scss";
import WhyWorks from "./components/whyworks";
import Testimonial from "./components/testimonial";
import Card from "../components/card/card";

const fakeData = [
   { name: "AI for Everyone", author: "Andrew Ng" },
   { name: "Javacsript Fundamentals", author: "Lorem Ipsum" },
   {
      name: "Complete Python Bootcamp from Zero to Hero",
      author: "Lorem Ipsum",
   },
   { name: "Automate the Boring Stuff with Python", author: "Lorem Ipsum" },
   {
      name: "100 Days of Code: The Complete Python Course",
      author: "Lorem Ipsum",
   },
   { name: "Javacsript Fundamentals", author: "Lorem Ipsum" },
   { name: "Javacsript Fundamentals", author: "Lorem Ipsum" },
   { name: "Javacsript Fundamentals", author: "Lorem Ipsum" },
];

export default function Home() {
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
               {fakeData.map(({ name, author }) => (
                  <Card name={name} author={author} />
               ))}
            </div>
         </div>

         <WhyWorks />
         <Testimonial />
      </div>
   );
}
