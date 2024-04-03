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
      name: "Interactive Learning",
      description:
         "Engage with multimedia content, interactive exercises, and real-world case studies to deepen your understanding and enhance your learning experience.",
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
         {whyworks.map(({ name, description }) => (
            <div key={name}>
               <h2>{name}</h2>
               <span>{description}</span>
            </div>
         ))}
      </div>
   );
}
