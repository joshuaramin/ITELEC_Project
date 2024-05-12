import React, { useState } from "react";
import styles from "./footer.module.scss";

const course = [
  "Finance",
  "Accounting",
  "Business Marketing",
  "IT and Software",
  "Computer Sciecne",
  "Anatomy",
  "",
];

const Academy = [
  "About",
  "What we offer",
  "Leadership",
  "Careers",
  "Catelog",
  "Community",
  "Contact Us",
];

const resources = [
  "Support",
  "Securities",
  "Help Center",
  "Preferences",
  "Terms & Legals",
  "Privacy policy",
];
export default function Footer() {
  const [date, setDate] = useState(new Date().getFullYear());
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <div className={styles.logo}>
          <div className={styles.school}>
            <img src="/schoolacademylogo.png" alt="" height={150} width={150} />
            <div>
              <h2>School Academy</h2>
              <p>
                Free Online Academy Offers Unlimited Learning Without Fees or
                Commitments!
              </p>
            </div>
          </div>
        </div>
        <div className={styles.category}>
          <h2>Top Category</h2>
          {course.map((name) => (
            <a href="/" key={name}>
              {name}
            </a>
          ))}
        </div>
        <div className={styles.academy}>
          <h2>Academy</h2>
          {Academy.map((name) => (
            <a href="/" key={name}>
              {name}
            </a>
          ))}
        </div>
        <div className={styles.resources}>
          <h2>Resources</h2>
          {resources.map((name) => (
            <a href="/" key={name}>
              {name}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <span> &copy; {date} School Academy. All Rights Reserved</span>
      </div>
    </div>
  );
}
