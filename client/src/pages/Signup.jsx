import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [univ_org, setUniv_org] = useState("");

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("Registration successfull");
      toast.success("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      alert("Registration failed");
    }
  }

  const inputStyle = "border-2 p-3";

  return (
    <main className="w-screen h-screen flex  flex-col gap-10 justify-center items-center">
      <h1 className="text-subheading">Create a new account</h1>
      <form
        className="bg-white p-10 shadow-lg rounded-3xl text-primary font-medium flex flex-col gap-4 w-full max-w-[500px]"
        onSubmit={register}
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
          <label>Email</label>
          <input
            type="text"
            className={inputStyle}
            placeholder="Enter email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
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
        <div className="flex flex-col gap-3">
          <label>University / Organization</label>
          <input
            type="text"
            className={inputStyle}
            placeholder="Enter university / organization name"
            value={univ_org}
            onChange={(ev) => setUniv_org(ev.target.value)}
          />
        </div>
        <button className="button-cta mt-3" type="submit">
          Create
        </button>
      </form>
      <Toaster />
    </main>
  );
};

export default Signup;
