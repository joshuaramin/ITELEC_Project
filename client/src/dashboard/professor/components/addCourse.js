import React, { useState, useRef, useEffect } from "react";
import styles from "./addCourse.module.scss";
import { TbTrash, TbX } from "react-icons/tb";
import { GetAllCategory } from "../../../util/Query/category";
import { useMutation, useQuery } from "@apollo/client";
import { AddNewSubject } from "../../../util/Mutation/course";
import Token from "../../../auth/token";
import Message from "../../../components/message/message";

export default function AddCourse({ onChange }) {
   const [courseBgImage, setCourseBgImage] = useState(null);
   const [preview, setPreview] = useState(null);

   const [course, setCourse] = useState({
      name: "",
      langauge: "",
      category: "",
      description: "",
   });

   const fileRef = useRef(null);

   const onClickFileUpload = () => {
      fileRef.current?.click();
   };

   const onFileChange = (e) => {
      const file = e.target.files[0];

      if (!file) alert("file is required");

      const reader = new FileReader();

      const url = reader.readAsDataURL(file);
      reader.onload = () => {
         setPreview(reader.result);
      };

      setCourseBgImage(file);
   };

   const { data } = useQuery(GetAllCategory);

   const [AddNewCourse, { data: subjectData, error: subjectError }] =
      useMutation(AddNewSubject);

   const onHandleSubject = (e) => {
      e.preventDefault();
      AddNewCourse({
         variables: {
            categoryId: course.category,
            input: {
               subject: course.name,
               description: course.description,
               language: course.langauge,
            },
            userId: Token(),

            file: courseBgImage,
         },

         onCompleted: () => {
            onChange();
         },

         errorPolicy: "all",
      });
   };
   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <button onClick={onChange}>
               <TbX size={23} />
            </button>
         </div>
         <div className={styles.body}>
            <form onSubmit={onHandleSubject}>
               <div className={styles.fileuploadContainer}>
                  <div
                     onClick={onClickFileUpload}
                     className={styles.fileupload}
                  >
                     {courseBgImage ? (
                        <img src={preview} alt='' height={100} width={300} />
                     ) : (
                        <h2>Click or Drag and Drop</h2>
                     )}
                  </div>
                  {courseBgImage ? (
                     <div>
                        <button
                           type='button'
                           onClick={() => setCourseBgImage(null)}
                        >
                           <TbTrash size={23} />
                        </button>
                     </div>
                  ) : null}
               </div>
               <input
                  type='file'
                  ref={fileRef}
                  accept='image/*'
                  hidden
                  name='file'
                  onChange={onFileChange}
               />
               <input
                  type='text'
                  placeholder='Name'
                  value={course.name}
                  onChange={(e) =>
                     setCourse({ ...course, name: e.target.value })
                  }
               />
               <input
                  type='text'
                  placeholder='Language'
                  value={course.langauge}
                  onChange={(e) =>
                     setCourse({ ...course, langauge: e.target.value })
                  }
               />
               <select
                  onChange={(e) =>
                     setCourse({ ...course, category: e.target.value })
                  }
               >
                  <option>-</option>
                  {data?.getAllCategory.map(({ category, categoryID }) => (
                     <option value={categoryID} key={categoryID}>
                        {category}
                     </option>
                  ))}
               </select>
               <textarea
                  placeholder='Description'
                  value={course.description}
                  onChange={(e) =>
                     setCourse({ ...course, description: e.target.value })
                  }
               />
               <button className={styles.submit} type='submit'>
                  Submit
               </button>
            </form>
         </div>
      </div>
   );
}
