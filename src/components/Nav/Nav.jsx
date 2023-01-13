import {useState, useEffect} from 'react'
import Dropdown from '../Dropdown/Dropdown.jsx'
import { fetchCategories } from '../Nav/navapi';
import './Nav.css'
import { Link } from 'react-router-dom';

function Nav({setLoadingNav}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchCategories().then((categoriesArr) => {
      setLoading(false)
      setLoadingNav(false)
      setCategories(categoriesArr);
    })
  }, []);

  if (loading) return <div>loading</div>

  return (
    <nav>
      
      <Link to="/reviews"><div className="nav-item">Recent Reviews</div></Link>

      <Link to="/users"><div className="nav-item">Users</div></Link>
      
      <Link to="/post-review"><div className="nav-item">Post Review</div></Link>
           

      <Dropdown className="nav-item" label="Categories" items={categories} itemLabel="slug" display="nav-drop"/>
    </nav>
  );
}

export default Nav;
