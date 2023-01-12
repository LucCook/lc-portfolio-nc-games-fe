import { useState } from 'react';
import { Link } from 'react-router-dom';


function Dropdown({ label, items, itemLabel, display, setSort, formatItemLabel}) {

const [dropdownVisible, setDropdownVisible] = useState(false)

  return (
    <div className={`dropdown ${display}`} onMouseEnter={() => setDropdownVisible(true)} onMouseLeave={() => setDropdownVisible(false)}>
      <button className={`dropbtn ${display}`}>{label}</button>
      { dropdownVisible && <div className={`dropdown-content ${display}`}>
        {items.map((item, index) => {
          return (
            <div onClick={() => {
              setSort(item[itemLabel])
              setDropdownVisible(false)
            }} key={`${item[itemLabel]}${index}`} className="dropdown-item">
              {formatItemLabel(item[itemLabel])}
            </div>
          );
        })}
      </div>}
    </div>
  );
}

export default Dropdown;
