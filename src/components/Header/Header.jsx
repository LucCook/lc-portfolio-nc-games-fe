import './Header.css'
import {Link} from 'react-router-dom'

function Header() {
    return (<header>
        <Link to="/"><div>NC Games</div></Link>
        </header>)
}

export default Header