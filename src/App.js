import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Reviews from "./components/Reviews/Reviews";
import SingleReview from "./components/SingleReview/SingleReview";
import { UserProvider } from "./contexts/User";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<Reviews />} /> {/* for now... */}
            <Route path="/reviews" element={<Reviews />} />
            <Route
              path="/reviews/:review_id"
              element={<SingleReview />}
            />
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
