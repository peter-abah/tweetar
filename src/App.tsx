import { Routes, Route } from "react-router-dom";
import { Layout, Home, SignUp, SignIn } from "./routes";
import AllProviders from "./contexts";

function App() {
  return (
    <AllProviders>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </AllProviders>
  );
}

export default App;
