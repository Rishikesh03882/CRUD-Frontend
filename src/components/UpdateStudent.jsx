import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    gender: "",
    dob: ""
  });

  // Fetch student by ID
  useEffect(() => {
    API.get(`/students/${id}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Update student
  const handleUpdate = async (e) => {
    e.preventDefault();
    await API.put(`/students/${id}`, student);
    navigate("/");
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Student</h2>

      <input
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        value={student.phone}
        onChange={handleChange}
      />

      <input
        name="course"
        placeholder="Course"
        value={student.course}
        onChange={handleChange}
      />

      <select
        name="gender"
        value={student.gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>


      <input
        type="date"
        name="dob"
        value={student.dob ? student.dob : ""}
        onChange={handleChange}
      />

      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateStudent;
