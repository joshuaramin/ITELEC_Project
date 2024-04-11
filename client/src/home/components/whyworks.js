import React from "react";
import styles from "./whywork.module.scss";
const whyworks = [
   {
      name: "Flexible Learning",
      description:
         " Study at your own pace, anytime, anywhere. Our flexible learning platform allows you to balance your studies with your personal and professional commitments.",
   },
   {
      name: "Expert Instructors",
      description:
         "Learn from industry experts and experienced educators who are passionate about sharing their knowledge and expertise with  you.",
   },
   {
      name: "Community Support",
      description:
         "Join a vibrant learning community of students, instructors, and professionals. Connect, collaborate, and network with like-minded individuals from around the world.",
   },
   {
      name: "Free Access",
      description:
         "Enjoy free access to our online courses and resources. No subscription fees or hidden costs—just quality education at your fingertips.",
   },
];

export default function WhyWorks() {
   return (
      <div className={styles.container}>
         <div className={styles.titleContainer}>
            <h2>Why School Academy?</h2>
            <div className={styles.para}>
               <span>
                  Online Learning Platform, where education knows no boundaries!
                  Explore our diverse range of courses and embark on a journey
                  of discovery, growth, and transformation. Whether you're a
                  lifelong learner, a career enthusiast, or a knowledge seeker,
                  we have something for everyone.
               </span>
            </div>
         </div>
         <div className={styles.gridContainer}>
            {whyworks.map(({ name, description }) => (
               <div key={name}>
                  <h2>{name}</h2>
                  <span>{description}</span>
               </div>
            ))}
         </div>
      </div>
   );
}
