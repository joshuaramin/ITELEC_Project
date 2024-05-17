import React, { useState } from 'react'
import styles from './editLesson.module.scss'
import FormHeader from '../../../../../components/form/formHeader'
import ButtonForm from '../../../../../components/form/button'
import InputForm from '../../../../../components/form/input'
import { UpdateSubjectLesssonTitle } from '../../../../../util/Mutation/lesson'
import { useMutation } from '@apollo/client'

export default function EditLesson({ id, close, lesson}) {


  const [ name, setName ] = useState(lesson);

  const onEditNameChange = (e) => {
    setName(e.target.value)
  }

  const [ EditMutation ] = useMutation(UpdateSubjectLesssonTitle)


  const onHandleSubmitForm = (e) => {
    e.preventDefault();
    EditMutation({
      variables: {
        lessonId: id,
        lesson: name
      }
    })
  }

  return (
    <div className={styles.container}>
      <FormHeader close={close}/>
      <form onSubmit={onHandleSubmitForm}>
        <h2>Edit Lesson</h2>
        <InputForm value={name} placeHolder={lesson} type={'text'} onChange={onEditNameChange}/>
        <ButtonForm name={'Submit'} />
      </form>
    </div>
  )
}
