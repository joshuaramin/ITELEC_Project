import logo from "./logo.svg";
import styles from "./App.module.scss";
import Header from "./components/Header/header";
import Footer from "./components/foooter/footer";
import { Link, Route, Routes } from "react-router-dom";
import Student from "./dashboard/student/student";
import Login from "./auth/login";
import Register from "./auth/register";
import Home from "./home/index";
function App() {
   return (
      <div className={styles.container}>
         <Header />
         <Routes>
            <Route path='/' element={<Home />} />
         </Routes>
         <Routes>
            <Route path='/auth/login/' element={<Login />} />
            <Route path='/auth/forgotpassword/' element={<Login />} />
            <Route path='/auth/register/' element={<Register />} />
         </Routes>
         <Routes>
            <Route path='/dashboard/student' element={<Student />} />
         </Routes>
         <Footer />
      </div>
   );
}

export default App;
