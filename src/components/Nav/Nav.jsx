import './Nav.css'
import { Link } from 'react-router-dom'

function Nav() {
    return (<nav>
        <div>Categories</div>
        <div>Users</div>
        <div>Sign in</div>
        <Link to="/reviews"><div>Recent Reviews</div></Link>
    </nav>)
}

export default Nav