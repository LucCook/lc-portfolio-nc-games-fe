import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Reviews from './components/Reviews/Reviews';
import SingleReview from './components/SingleReview/SingleReview';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Reviews/>} /> {/* for now... */}
        <Route path="/reviews" element={<Reviews/>} />
        <Route path="/reviews/:review_id" element={<SingleReview />}/>
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
