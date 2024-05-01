import styles from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import Home from "./home/index";
import CourseID from "./course/[id]";
import ForgotPassword from "./auth/forgotpassword/forgotpassword";
import Chapter from "./course/chapter/[chapterID]";
import ProtectedRoute from "./auth/authentication";
import ProfessorCourse from "./dashboard/professor/course";
import ProfessorCourseID from "./dashboard/professor/course/[id]";
import Student from "./dashboard/student/student";

import MainLayout from "./layout/main.layout";
import Verification from "./auth/verification/verification";
import ResetPassword from "./auth/resetpassword/resetpassword";

// Dashboard Layout

import ProfessorLayout from "./layout/professor.layout";
import StudentLayout from "./layout/student.layout";

function App() {
  return (
    <div className={styles.container}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/auth/login/" element={<Login />} />
          <Route path="/auth/forgotpassword/" element={<ForgotPassword />} />
          <Route path="/auth/register/" element={<Register />} />
          <Route path="/auth/resetpassword/:id" element={<ResetPassword />} />
          <Route path="/auth/verification/:id" element={<Verification />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<StudentLayout />}>
            <Route path="/dashboard/student/course" element={<Student />} />
          </Route>
          <Route element={<ProfessorLayout />}>
            <Route
              path="/dashboard/professor/course"
              element={<ProfessorCourse />}
            />
            <Route
              path="/dashboard/professor/course/:id"
              element={<ProfessorCourseID />}
            />
          </Route>
        </Route>
      </Routes>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="course/:id" element={<CourseID />} />
          <Route path="course/:id/chapter/:chapterID" element={<Chapter />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
