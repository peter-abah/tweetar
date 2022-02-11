import { Routes, Route } from "react-router-dom";
import { Layout, Home, SignUp, SignIn } from "./routes";
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
