import React, { useState, useRef } from "react";
import styles from "./addCourse.module.scss";
import { TbTrash } from "react-icons/tb";
import { GetAllCategory } from "../../../util/Query/category";
import { useMutation, useQuery } from "@apollo/client";
import { AddNewSubject } from "../../../util/Mutation/course";
import { DecodedToken } from "../../../auth/token";
import FormHeader from "../../../components/form/formHeader";
import ButtonForm from "../../../components/form/button";
import InputForm from "../../../components/form/input";
import TextareaForm from "../../../components/form/textarea";

export default function AddCourse({ onChange }) {
  const [courseBgImage, setCourseBgImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const token = DecodedToken();

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

  const [AddNewCourse] = useMutation(AddNewSubject);

  const onHandleNameChange = (e) => {
    setCourse({ ...course, name: e.target.value });
  };

  const onHandleLanguageChange = (e) => {
    setCourse({ ...course, langauge: e.target.value });
  };

  const onHandleDescriptionChange = (e) => {
    setCourse({ ...course, description: e.target.value });
  };

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
        userId: token,
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
      <FormHeader close={onChange} />
      {DecodedToken}
      <div className={styles.body}>
        <form onSubmit={onHandleSubject}>
          <h2>Add Course</h2>
          <div className={styles.fileuploadContainer}>
            <div onClick={onClickFileUpload} className={styles.fileupload}>
              {courseBgImage ? (
                <img src={preview} alt="" height={100} width={300} />
              ) : (
                <h2>Click or Drag and Drop</h2>
              )}
            </div>
            {courseBgImage ? (
              <div>
                <button type="button" onClick={() => setCourseBgImage(null)}>
                  <TbTrash size={23} />
                </button>
              </div>
            ) : null}
          </div>
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            hidden
            name="file"
            onChange={onFileChange}
          />
          <InputForm
            type={"text"}
            placeHolder={"Course Name"}
            value={course.name}
            onChange={onHandleNameChange}
          />
          <InputForm
            type={"text"}
            placeHolder={"Course Language"}
            value={course.langauge}
            onChange={onHandleLanguageChange}
          />
          <select
            onChange={(e) => setCourse({ ...course, category: e.target.value })}
          >
            <option>-</option>
            {data?.getAllCategory.map(({ category, categoryID }) => (
              <option value={categoryID} key={categoryID}>
                {category}
              </option>
            ))}
          </select>
          <TextareaForm
            onChange={onHandleDescriptionChange}
            value={course.description}
            placeholder={"Course Description"}
          />
          <ButtonForm name={"Submit"} />
        </form>
      </div>
    </div>
  );
}
