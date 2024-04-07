import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import {
  Login,
  Signup,
  Home,
  CreateConference,
  ConferenceDetails,
  Registered,
  Organized,
  SubmittedPapers,
} from "./pages";
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
              <Route path="/conference/create" element={<CreateConference />} />
              <Route path="/conference/registered" element={<Registered />} />
              <Route path="/conference/organized" element={<Organized />} />
              <Route path="/conference/:id" element={<ConferenceDetails />} />
              <Route
                path="/conference/:id/papers"
                element={<SubmittedPapers />}
              />
            </Route>
          </Routes>
        </main>
      </>
    </UserContextProvider>
  );
}

export default App;
