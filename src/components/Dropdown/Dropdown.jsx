import './Dropdown.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Dropdown({ label, items, itemLabel, display}) {

const [dropdownVisible, setDropdownVisible] = useState(false)

  return (
    <div className={`dropdown nav-item ${display}`} onMouseEnter={() => setDropdownVisible(true)} onMouseLeave={() => setDropdownVisible(false)}>
      <button className={`dropbtn ${display}`}>{label}</button>
      { dropdownVisible && <div className={`dropdown-content ${display}`}>
        <Link key="all reviews" to="/reviews" onClick={() => setDropdownVisible(false)}><div   className="dropdown-item">
              All reviews
            </div></Link>
        {items.map((item, index) => {
          return (
            <Link key={`${item[itemLabel]}${index}`} to={`/reviews?category=${item[itemLabel]}`} onClick={() => setDropdownVisible(false)}><div   className="dropdown-item">
              {item[itemLabel]}
            </div></Link>
          );
        })}
      </div>}
      
    </div>
  );
}

export default Dropdown;
