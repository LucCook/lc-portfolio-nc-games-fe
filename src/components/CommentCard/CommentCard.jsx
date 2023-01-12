import Votes from "../Votes/Votes"
import './CommentCard.css'
import formatDate from "../../utils"
import { useContext, useState, useRef } from "react"
import { UserContext } from "../../contexts/User"
import { deleteComment } from "../../api"

function CommentCard({votes, created_at, author, body, comment_id, setVoteError}) {

    const date = formatDate(created_at)
    const {user} = useContext(UserContext)
    const [commentCardVisible, setCommentCardVisible] = useState(true)
    const [deletedMessage, setDeletedMessage] = useState(false)
    const [deleteError, setDeleteError] = useState(false)

    const commentRef = useRef(null)
    const loadHandler = () => {
        commentRef.current && commentRef.current.scrollIntoView({behavior: "smooth"})
    }

    const handleDelete = () => {
        setCommentCardVisible(false)
        
        deleteComment(comment_id)
        .then(() => {
            setDeleteError(false)
            setDeletedMessage(true)
            setTimeout(() => setDeletedMessage(false), 2000)
    
        })
        .catch(() => {
            setCommentCardVisible(true)
            setDeletedMessage(false)
            setDeleteError(true)
        })
    }

          return (<div className="comment-card" onLoad={loadHandler} ref={commentRef}>
                {commentCardVisible && <Votes votes={votes} type="comment" id={comment_id} setVoteError={setVoteError}/>}
                {commentCardVisible && <div className="comment-details">
                    <div className="comment-author">{author}</div>
                    <div className="comment-body">{body}</div>
                    <div className="comment-date">{date}</div>
                    {commentCardVisible & author === user.username && <div className="comment-delete" onClick={() => handleDelete()}>delete</div>}
                </div>}
                
                {deletedMessage && <div className="confirm-message" onLoad={loadHandler} ref={commentRef}>Comment deleted</div>}
                {deleteError && <div className="error-message" onLoad={loadHandler} ref={commentRef}>Something went wrong, please try again later</div>}
                
            </div>)
    

}

export default CommentCard