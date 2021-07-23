import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";

function StudentDashboard({ setAuth }) {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState("");

  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/studentDashboard/", {
        method: "GET",
        headers: { token: localStorage.token }, //from middleware
      });

      const parseRes = await response.json();
      const messages = JSON.parse(parseRes.messages);

      setName(parseRes.user_name);
      setMessages(parseRes.messages)
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    console.log("Triggered");
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };

  useEffect( () => {
    getAll();
  }, []);

  console.log(messages);

  return (
    <div>
      <div className="display-1">Student Dashboard</div>
      <div className="display-4 bg-warning">
        Student name: {name}
      </div>
      <div className="display-4 bg-info">
        {messages}
        Messages:
      </div>
      <button
        className="btn btn-primary btn-sm "
        onClick={(e) => logout(e)}
        id="logout"
      >
        Logout
      </button>
    </div>
  );
}

export default StudentDashboard;
