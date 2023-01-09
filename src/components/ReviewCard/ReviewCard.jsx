import './ReviewCard.css'
import arrow from '../../arrow3.png'

function ReviewCard({ title, owner, category, review_img_url, votes, created_at, comment_count }) {

    const date = new Date(created_at)
    const fullDateString =  date.toUTCString()
    const dateString = fullDateString.slice(fullDateString.indexOf(' '))

    return (<div className="review-card">
        <div className="review-votes-container">
                    <img className="arrow up" src={arrow} alt="up vote review"/>
                    <div>{votes}</div>
                    <img className="arrow down" src={arrow} alt="down vote review"/>
                </div>
                <img src={review_img_url} alt={title}/>
                <div className="review-details">
                    <div className="review-title">{title}</div>
                    <div className="review-owner">by <span>{owner}</span></div>
                    <div className="review-date">{dateString}</div>
                    <div className="review-comment-count">{comment_count} comments</div>
                </div>
                
            </div>)
}

export default ReviewCard