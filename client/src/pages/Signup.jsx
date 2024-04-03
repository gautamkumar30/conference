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
    <div className="flex flex-col justify-center item-center">
      <div className="flex flex-col gap-8 w-full h-full bg-secondary">
        <h1 className="text-heading">Signup</h1>
        <form onSubmit={register}>
          <div className="flex flex-col gap-8">
            <p>
              <input
                label="Username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                id="username"
              />
            </p>
            <p>
              <input
                label="Password"
                type="text"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                id="password"
              />
            </p>
            <button type="submit">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
