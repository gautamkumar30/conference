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

  const inputClassName =
    "h-[40px] border-primary border-[1px] rounded-lg px-4 py-6 focus:border-none focus:border-primary bg-transparent";

  return (
    <div className="w-full h-full bg-red-50 flex justify-center items-center">
      <div className="flex flex-col gap-10">
        <h1 className="text-center text-primary">Login</h1>
        <form onSubmit={login} className="flex flex-col">
          <input
            type="text"
            placeholder="enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputClassName}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
