import { useEffect, useState } from "react";
import { fetchUsers } from "../../api";
import UserCard from "../UserCard/UserCard";
import './Users.css'

function Users({setLoadingMain}) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers().then((usersArr) => {
            setUsers(usersArr)
            setLoadingMain(false)
        })
    }, [])

    return (<div className="users-container">
                {users.map((userObj) => {
                    return (<UserCard key={userObj.username} user={userObj}/>)
                })}
            </div>)
}

export default Users;
