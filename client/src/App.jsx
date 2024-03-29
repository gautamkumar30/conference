import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Organize from "./pages/Organize";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Registered from "./pages/Registered";

function App() {
  return (
    <main className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/organize" element={<Organize />} />
          <Route path="/registered" element={<Registered />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
