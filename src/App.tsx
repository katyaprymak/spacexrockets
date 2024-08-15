import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RocketList from "./components/RocketList";
import RocketDetail from "./components/RocketDetail"; // We will create this next

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RocketList />} />
        <Route path="/rocket/:id" element={<RocketDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
