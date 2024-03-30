import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      console.log("Registration successfull");
      navigate("/login");
    } else {
      alert("Registration failed");
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="enter username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          id="username"
        />
        <input
          type="text"
          placeholder="enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="password"
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
