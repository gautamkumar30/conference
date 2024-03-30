import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Organize from "./pages/Organize";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Registered from "./pages/Registered";
import Organized from "./pages/Organized";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserContextProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserContextProvider>
      <>
        <main className="w-screen h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/organize" element={<Organize />} />
              <Route path="/organized" element={<Organized />} />
              <Route path="/registered" element={<Registered />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </main>
      </>
    </UserContextProvider>
  );
}

export default App;
