import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    course: ""
  });

  // GET API
  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data));
  }, []);

  // Handle Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // POST API
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/students", form)
      .then(res => {
        setStudents([...students, res.data]);
        setForm({ name: "", age: "", course: "" });
      });
  };

  return (
    <div className="container">
      <h1>Student Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={form.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Enter Course"
          value={form.course}
          onChange={handleChange}
        />
        <button type="submit">Add Student</button>
      </form>

      {/* List */}
      <ul>
        {students.map((s, i) => (
          <li key={i}>
            {s.name} - {s.age} - {s.course}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;