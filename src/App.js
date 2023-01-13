import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import PostReview from "./components/PostReview/PostReview";
import Reviews from "./components/Reviews/Reviews";
import SingleReview from "./components/SingleReview/SingleReview";
import Users from "./components/Users/Users";
import { UserProvider } from "./contexts/User";

function App() {

const [loadingNav, setLoadingNav] = useState(true)
const [loadingMain, setLoadingMain] = useState(true)

useEffect(() => {
  setTimeout(() => {if (!loadingNav && !loadingMain) {
    const loadingScreen = document.querySelector(".loading-screen")
    if (loadingScreen) {
      loadingScreen.remove()
    }
   }}, 50)
 
}, [loadingNav, loadingMain])

  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <Header />
          <Nav setLoadingNav={setLoadingNav}/>
          <Routes>
            <Route path="/" element={<Reviews setLoadingMain={setLoadingMain}/>} /> {/* for now... */}
            <Route path="/reviews" element={<Reviews setLoadingMain={setLoadingMain}/>} />
            <Route
              path="/reviews/:review_id"
              element={<SingleReview setLoadingMain={setLoadingMain}/>}
            />
            <Route path="/users" element={<Users setLoadingMain={setLoadingMain}/>}/>
            <Route path="/post-review" element={<PostReview setLoadingMain={setLoadingMain}/>}/>
            {/* <Route path="*" element={<Nothing />} /> */}
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
