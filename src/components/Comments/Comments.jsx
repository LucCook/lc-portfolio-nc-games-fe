import {useState, useEffect} from 'react'
import { fetchComments } from '../../api'
import CommentCard from '../CommentCard/CommentCard'
import './Comments.css'

function Comments({review_id, comments, setComments}) {

    const [loading, setLoading] = useState(true)
    const [voteError, setVoteError] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetchComments(review_id).then((commentsArr) => {
            setLoading(false)
            setComments(commentsArr)
        })
    }, [review_id, setComments])

    if (loading) return <div>loading...</div>

    return (<div className="comments-container">
            {voteError && <div className="error-message">Oh dear, something went wrong, please try again later or contact support</div>}
                {comments.map((comment) => {
                    return <CommentCard key={comment.comment_id} {...comment} setVoteError={setVoteError} setComments={setComments}/>
                })}
            </div>)
}

export default Comments