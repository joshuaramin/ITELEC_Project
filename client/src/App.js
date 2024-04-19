import styles from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/login";
import Register from "./auth/register";
import Home from "./home/index";
import CourseID from "./course/[id]";
import ForgotPassword from "./auth/forgotpassword";
import Chapter from "./course/chapter/[chapterID]";
import Cookies from "js-cookie";
import ProtectedRoute from "./auth/authentication";

import Professor from "./dashboard/professor/professor";
import ProfessorCourse from "./dashboard/professor/course";
import ProfessorCourseID from "./dashboard/professor/course/[id]";
import CourseTopicID from "./dashboard/professor/course/topic/[topicID]";
import TopicContentID from "./dashboard/professor/course/topic/content/[contentID]";
import Student from "./dashboard/student/student";

import ProfessorLayout from "./layout/professor.layout";
import MainLayout from "./layout/main.layout";

function App() {
   const token = Cookies.get("access_token");

   console.log(token);
   return (
      <div className={styles.container}>
         {/* <Header /> */}
         <Routes>
            <Route element={<MainLayout />}>
               <Route path='/' element={<Home />} />
            </Route>
         </Routes>
         <Routes>
            <Route element={<MainLayout />}>
               <Route path='/auth/login/' element={<Login />} />
               <Route
                  path='/auth/forgotpassword/'
                  element={<ForgotPassword />}
               />
               <Route path='/auth/register/' element={<Register />} />
            </Route>
         </Routes>

         <Routes>
            <Route element={<ProtectedRoute />}>
               <Route path='/dashboard/student' element={<Student />} />
               <Route element={<ProfessorLayout />}>
                  <Route
                     path='/dashboard/professor/overview'
                     element={<Professor />}
                  />
                  <Route
                     path='/dashboard/professor/course'
                     element={<ProfessorCourse />}
                  />
                  <Route
                     path='/dashboard/professor/course/:id'
                     element={<ProfessorCourseID />}
                  />
                  <Route
                     path='/dashboard/professor/course/:id/lesson/:topicID'
                     element={<CourseTopicID />}
                  />
                  <Route
                     path='/dashboard/professor/course/:id/lesson/:topicID/content/:contentID'
                     element={<TopicContentID />}
                  />
               </Route>
            </Route>
         </Routes>
         <Routes>
            <Route element={<MainLayout />}>
               <Route path='course/:id' element={<CourseID />} />
               <Route
                  path='course/:id/chapter/:chapterID'
                  element={<Chapter />}
               />
            </Route>
         </Routes>
         {/* <Footer /> */}
      </div>
   );
}

export default App;
