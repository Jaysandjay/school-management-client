import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"

// Students
import StudentsRecords from "./pages/students/StudentsRecords";
import StudentDetails from "./pages/students/StudentDetails";
import StudentAdd from "./pages/students/StudentAdd";

// Guardians
import GuardiansRecords from "./pages/guardians/GuardiansRecords";
import GuardianDetails from "./pages/guardians/GuardianDetails";
import GuardianAdd from "./pages/guardians/GuardianAdd";

// Teachers
import TeachersRecords from "./pages/teachers/TeachersRecords";
import TeacherDetails from "./pages/teachers/TeacherDetails";
import TeacherAdd from "./pages/teachers/TeacherAdd";

// Classes
import ClassesRecords from "./pages/classes/ClassesRecords";
import ClassDetails from "./pages/classes/ClassDetails";
import ClassesAdd from "./pages/classes/ClassesAdd";



export default function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Dashboard />} />
        {/* Students */}
        <Route path="/students" element={<StudentsRecords />} />
        <Route path="/students/add" element={<StudentAdd />} />
        <Route path="/students/:id" element={<StudentDetails />} />

        {/* Guardians */}
        <Route path="/guardians" element={<GuardiansRecords />} />
        <Route path="/guardians/add" element={<GuardianAdd />} />
        <Route path="/guardians/:id" element={<GuardianDetails />} />

        {/* Teachers */}
        <Route path="/teachers" element={<TeachersRecords />} />
        <Route path="/teachers/add" element={<TeacherAdd />} />
        <Route path="/teachers/:id" element={<TeacherDetails />} />

        {/* Classes */}
        <Route path="/classes" element={<ClassesRecords />} />
        <Route path="/classes/add" element={<ClassesAdd />} />
        <Route path="/classes/:id" element={<ClassDetails />} />
      </Route>
    </Routes>
  );
}
