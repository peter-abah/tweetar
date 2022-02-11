import { Routes, Route } from "react-router-dom";
import { Layout, Home } from "./routes";
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
