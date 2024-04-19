import React from "react";

export default function Image({ styles, image }) {
   return (
      <div className={styles.avatar}>
         <img src={image} alt='' height={100} width={300} />
      </div>
   );
}
