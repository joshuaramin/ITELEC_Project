import React from 'react'
import styles from './button.module.scss'

export default function ButtonForm({ name}) {
  return (
     <button type='submit' className={styles.container}>
            <span>{name}</span>
    </button>
  )
}
