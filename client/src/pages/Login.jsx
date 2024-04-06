import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import toast, { Toaster } from "react-hot-toast";

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

    if (response.status === 200) {
      response.json().then((userInfo) => setUserInfo(userInfo));
      // alert("Logged in");
      toast.success("Logged in successfully!");
      // response.json().then((data) => console.log(data.username));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Invalid credentials");
    }
  }

  const inputStyle = "border-2 p-3";

  return (
    <main className="w-screen h-screen flex  flex-col gap-10 justify-center items-center">
      <h1 className="text-subheading">Login to your account</h1>
      <form
        className="bg-white p-10 shadow-lg rounded-3xl text-primary font-medium flex flex-col gap-4 w-full max-w-[500px]"
        onSubmit={login}
      >
        <div className="flex flex-col gap-3">
          <label>Username</label>
          <input
            type="text"
            className={inputStyle}
            placeholder="Enter username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>Password</label>
          <input
            type="text"
            className={inputStyle}
            placeholder="Enter password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <button className="button-cta mt-3" type="submit">
          Login
        </button>
      </form>
      <Toaster />
    </main>
  );
};

export default Login;
