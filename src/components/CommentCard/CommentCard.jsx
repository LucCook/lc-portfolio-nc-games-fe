import Votes from "../Votes/Votes"
import './CommentCard.css'
import formatDate, { awaitTimeout } from "../../utils"
import { useContext, useState, useRef } from "react"
import { UserContext } from "../../contexts/User"
import { deleteComment, editComment } from "../../api"

function CommentCard({votes, created_at, author, body, comment_id, setVoteError, edited, setComments}) {

    const date = formatDate(created_at)
    const {user} = useContext(UserContext)
    const [commentCardVisible, setCommentCardVisible] = useState(true)
    const [deletedMessage, setDeletedMessage] = useState(false)
    const [deleteError, setDeleteError] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [commentBody, setCommentBody] = useState(body)
    const [editedBody, setEditedBody] = useState(body)
    const [editedState, setEditedState] = useState(edited)

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
            awaitTimeout(2000).then(() => {
                setDeletedMessage(false)
                setComments((currComments) => {return currComments.filter((comment) => comment.comment_id !== comment_id)})
            })
            // setTimeout(() => setDeletedMessage(false), 2000)
    
        })
        .catch(() => {
            setCommentCardVisible(true)
            setDeletedMessage(false)
            setDeleteError(true)
        })
    }

    const handleSubmit = () => {
        if (editedBody === body) {
            setEditVisible(false)
        } else {
            setEditVisible(false)
            setCommentBody(editedBody)
            setEditedState(true)
            editComment(comment_id, editedBody)
        }
    }

    const checkForEnterSubmit = (e) => {
        if (e.which === 13 && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        } else if (e.key === "Escape") {
            setEditedBody(body)
            setEditVisible(false)
        }
    }

          return (<div className="comment-card" onLoad={loadHandler} ref={commentRef}>
                {commentCardVisible && <Votes votes={votes} type="comment" id={comment_id} setVoteError={setVoteError}/>}
                {commentCardVisible && <div className="comment-details">
                    <div className="comment-author">{author}</div>
                    {!editVisible && <div className="comment-body">{commentBody} <span className="edited-tag">{editedState ? 'edited' : ''}</span></div>}
                    {editVisible && <div className="comment-body"><textarea spellCheck="false" className="text-editor" value={editedBody} 
                    onKeyDown={(e) => {
                        checkForEnterSubmit(e)
                    }} 
                    onChange={(e) => {
                        setEditedBody(e.target.value)
                    }}/>
                    <button onClick={() => {handleSubmit()}}>Save</button>
                    <button onClick={() => {
                        setEditedBody(body)
                        setEditVisible(false)
                    }}>Cancel</button></div>}
                    <div className="comment-date">{date}</div>
                    {commentCardVisible & author === user.username && (
                    <div className="author-functions">
                    <div className="comment-delete" onClick={() => handleDelete()}>delete</div>
                    <div className="comment-edit" onClick={() => setEditVisible(true)}>{'edit'}</div>
                    </div>
                    )}
                    
                </div>}
                
                {deletedMessage && <div className="confirm-message" onLoad={loadHandler} ref={commentRef}>Comment deleted</div>}
                {deleteError && <div className="error-message" onLoad={loadHandler} ref={commentRef}>Something went wrong, please try again later</div>}
                
            </div>)
    

}

export default CommentCard