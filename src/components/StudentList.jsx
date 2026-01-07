import { Link } from "react-router-dom";
import API from "../services/api";

const StudentList = ({ students, fetchStudents }) => {

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/students/${id}`);
      fetchStudents();
    }
  };

  // Format date as dd-mm-yyyy
  const formatDate = (dob) => {
    if (!dob) return "";
    const date = new Date(dob);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <h2>Student List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>COURSE</th>
            <th>GENDER</th>
            <th>DOB</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {students.map((stu) => (
            <tr key={stu._id}>
              <td>{stu.name}</td>
              <td>{stu.email}</td>
              <td>{stu.phone}</td>
              <td>{stu.course}</td>
              <td>{stu.gender}</td>
              <td>{formatDate(stu.dob)}</td>
              <td>
                <Link className="action-btn edit-btn" to={`/edit/${stu._id}`}>Edit</Link>
                <button
                  className="action-btn delete-btn"
                  onClick={() => deleteStudent(stu._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default StudentList;
