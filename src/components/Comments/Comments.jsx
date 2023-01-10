import {useState, useEffect} from 'react'
import { fetchComments } from '../../api'
import CommentCard from '../CommentCard/CommentCard'
import './Comments.css'

function Comments({review_id}) {

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchComments(review_id).then((commentsArr) => {
            setLoading(false)
            setComments(commentsArr)
        })
    }, [review_id])

    if (loading) return <div>loading...</div>

    return (<div className="comments-container">
                {comments.map((comment) => {
                    return <CommentCard key={comment.comment_id} {...comment}/>
                })}
            </div>)
}

export default Comments