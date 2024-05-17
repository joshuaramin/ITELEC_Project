import React from "react";

export default function Image({ styles, image }) {
  return (
    <div className={styles.avatar}>
      <img src={image} alt="" height={110} width={350} />
    </div>
  );
}
