import { useState } from "react";
import API from "../services/api";

const StudentForm = ({ fetchStudents }) => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    gender: "",
    dob: ""
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/students", student);
    fetchStudents();
    setStudent({
      name: "",
      email: "",
      phone: "",
      course: "",
      gender: "",
      dob: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>

      <input name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={student.phone} onChange={handleChange} />
      <input name="course" placeholder="Course" value={student.course} onChange={handleChange} />
      
      <select name="gender" value={student.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <input type="date" name="dob" value={student.dob} onChange={handleChange} />

      <button type="submit">Register</button>
    </form>
  );
};

export default StudentForm;
