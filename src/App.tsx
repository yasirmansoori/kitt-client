import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FlightPage from "./pages/FlightPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<FlightPage />} />
      </Routes>
    </div>
  );
}
