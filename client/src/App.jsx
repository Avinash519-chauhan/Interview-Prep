import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Signup";
import Dashboard from "./pages/user/Dashboard";
import Interviews from "./pages/user/Interview";
import Profile from "./pages/user/Profile";

import ProtectedRoute from "./routes/ProtectedRoute";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/interviews" element={<Interviews/>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
