import React from "react";
const roles = [
   {
      name: "Professor",
      value: "professor",
      description:
         "Our dedicated professors bring expertise and passion to guide students through our Free Online Academy's courses, fostering a culture of learning excellence.",
   },
   {
      name: "Student",
      value: "student",
      description:
         "You'll explore diverse subjects and engage with a vibrant community, all without any cost or commitment.",
   },
];

export default function Role({ styles, role, func }) {
   return (
      <div className={styles.mainContainer}>
         <h2>Are you a Professor or Student?</h2>
         {roles.map(({ name, value, description }) => (
            <div key={name} className={styles.roles}>
               <div className={styles.inlb}>
                  <input
                     type='radio'
                     value={value}
                     onChange={func}
                     checked={value === role ? true : false}
                  />
                  <label>{name}</label>
               </div>
               <span>{description}</span>
            </div>
         ))}
      </div>
   );
}
