import React from 'react'
import styles from './textarea.module.scss'
export default function TextareaForm({ value, onChange, placeholder }) {
  return (
    <textarea className={styles.textarea} value={value} onChange={onChange} placeholder={placeholder} />
  )
}
