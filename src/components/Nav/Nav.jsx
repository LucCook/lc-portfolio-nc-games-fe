import {useState, useEffect} from 'react'
import Dropdown from '../Dropdown/Dropdown.jsx'
import { fetchCategories } from '../Nav/navapi';
import './Nav.css'

function Nav() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchCategories().then((categoriesArr) => {
      setLoading(false)
      setCategories(categoriesArr);
    })
  }, []);

  if (loading) return <div>loading</div>

  return (
    <nav>
      <Dropdown className="nav-item" label="Categories" items={categories} itemLabel="slug" display="nav-drop"/>
      
      <div className="nav-item">Users</div>
      
      <div className="nav-item">Sign in</div>
      
      <div className="nav-item">Recent Reviews</div>
    </nav>
  );
}

export default Nav;
