import React from "react";

export default function Main({ styles }) {
  return (
    <div className={styles.quote}>
      <div className={styles.heading}>
        <span>
          Explore Limitless Learning with Our Free Online Academy—No Fees, No
          Commitments Required!
        </span>
        <a href={"/auth/register"}>Join Now</a>
      </div>
      <div className={styles.undraw}>
        <img src="/image/lms.png" alt="" height={500} width={600} />
      </div>
    </div>
  );
}
