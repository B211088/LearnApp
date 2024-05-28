import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Layout/Landing";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./views/About";
import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<Auth authRoute="login" />} />
            <Route
              exact
              path="/register"
              element={<Auth authRoute="register" />}
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
