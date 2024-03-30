import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    // alert("Clicked");

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => setUserInfo(userInfo));
      alert("Logged in");
      // response.json().then((data) => console.log(data.username));
      navigate("/");
    } else {
      alert("failed");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="enter username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="text"
          placeholder="enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
