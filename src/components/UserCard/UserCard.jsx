import { Link } from "react-router-dom"

function UserCard({user}) {
    return <div className="user-card">
                <img className="avatar-img" src={user.avatar_url}/>
                <div>{user.username}</div>
                <Link to={`/reviews?owner=${user.username}`}>See users reviews</Link>
            </div>
}

export default UserCard