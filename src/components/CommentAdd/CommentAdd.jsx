import "./CommentAdd.css";
import { useState, useContext } from "react";
import { postComment } from "../../api";
import { UserContext } from "../../contexts/User";

function CommentAdd({reviewId, setComments, setCommentCount, setCommentsVisible}) {
  const [commentInputVisible, setCommentInputVisible] = useState(false);
  const [commentBody, setCommentBody] = useState('')
  const [commentError, setCommentError] = useState(false)
  const [commentInvalid, setCommentInvalid] = useState(false)

  const {user} = useContext(UserContext)
  

  let temporaryCommentStorage

  const handleSubmit = (e) => {
    e.preventDefault()
    if (commentBody.trim()) {
      setComments((currComments) => {return [{ id: new Date(), username: user.username, body: commentBody, votes: 0, created_at: new Date() }, ...currComments]})
      temporaryCommentStorage = commentBody
      setCommentBody('')
      setCommentCount((currCommentCount) => currCommentCount + 1)
      setCommentsVisible(true)
      postComment(commentBody, user.username, reviewId)
      .then((postedComment) => {
        setComments((currComments) => [postedComment, ...currComments.slice(1)])
        setCommentError(false)
        setCommentBody('')
      })
      .catch((err) => {
        setCommentBody(temporaryCommentStorage)
        temporaryCommentStorage = ''
        setComments((currComments) => {
          return currComments.slice(1)
        })
        setCommentCount((currCommentCount) => currCommentCount - 1)
        setCommentError(true)
      })
    } else {
      setCommentInvalid(true)
    }
  }

  return (
    <div className="add-comment-container">
      <button
        className="add-comment button"
        onClick={() => {
          setCommentInputVisible(true);
        }}
      >
        Join the conversation, add a comment!
      </button>
      {commentError && (<div className="error-message">Oh dear, something went wrong, please try again later</div>)}
      {commentInvalid && (<div className="error-message">You need to write a comment before posting!</div>)}
      {commentInputVisible && (
        <form className="comment-input" onSubmit={(e) => {handleSubmit(e)}}>
          <input className="text-input" type="text" placeholder="What do you think?" value={commentBody} autoFocus onChange={(e) => {
            setCommentInvalid(false)
            setCommentBody(e.target.value)
            }}/>
          <button className="submit button" onClick={(e) => {handleSubmit(e)}}>Post Comment</button>
        </form>
      )}
    </div>
  );
}
export default CommentAdd;
