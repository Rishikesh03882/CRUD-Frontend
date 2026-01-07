import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import UpdateStudent from "./components/UpdateStudent";
import API from "./services/api";

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
     <BrowserRouter>
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <StudentForm fetchStudents={fetchStudents} />
              <StudentList students={students} fetchStudents={fetchStudents} />
            </>
          }
        />
        <Route path="/edit/:id" element={<UpdateStudent />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
