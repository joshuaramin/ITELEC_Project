import React from 'react'
import styles from './formHeader.module.scss'
import { TbX } from 'react-icons/tb'


export default function FormHeader({ close}) {
  return (
    <div className={styles.container}>
        <button onClick={close}>
          <TbX size={23} />
        </button>
    </div>
  )
}
