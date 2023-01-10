import Votes from "../Votes/Votes"
import './CommentCard.css'
import formatDate from "../../utils"

function CommentCard({votes, created_at, author, body}) {

    const date = formatDate(created_at)

    return (<div className="comment-card">
                <Votes votes={votes}/>
                <div className="comment-details">
                    <div className="comment-author">{author}</div>
                    <div className="comment-body">{body}</div>
                    <div className="comment-date">{date}</div>
                </div>
            </div>)
}

export default CommentCard