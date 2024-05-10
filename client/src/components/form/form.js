import React from "react";

export default function Form({ onSubmit, styles, children }) {
  return (
    <form onSubmit={onSubmit} className={styles}>
      {children}
    </form>
  );
}
