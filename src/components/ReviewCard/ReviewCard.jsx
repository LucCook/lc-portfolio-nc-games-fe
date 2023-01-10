import "./ReviewCard.css";
import {Link} from 'react-router-dom'
import Votes from "../Votes/Votes";

function ReviewCard({
    review_id,
  title,
  owner,
  category,
  review_img_url,
  votes,
  created_at,
  comment_count,
}) {
  const date = new Date(created_at);
  const fullDateString = date.toUTCString();
  const dateString = fullDateString.slice(fullDateString.indexOf(" "));

  return (
    <Link to={`/reviews/${review_id}`}>
    
    <div className="review-card">
      <Votes votes={votes}/>
      <img className="preview-img" src={review_img_url} alt={title} />
      <div className="review-details">
        <div className="review-title-preview">{title}</div>
        <div className="review-owner">
          by <span>{owner}</span>
        </div>
        <div className="review-date">{dateString}</div>
        <div className="review-comment-count">{comment_count} comments</div>
      </div>
    </div>
    </Link>
  );
}

export default ReviewCard;
