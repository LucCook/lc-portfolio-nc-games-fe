import "./ReviewCard.css";
import {Link} from 'react-router-dom'
import Votes from "../Votes/Votes";
import formatDate from "../../utils";

function ReviewCard({
    review_id,
  title,
  owner,
  category,
  review_img_url,
  votes,
  created_at,
  comment_count,
  setVoteError
}) {
  const date = formatDate(created_at)

  return (
    
    
    <div className="review-card">
      <Votes votes={votes} type="review" id={review_id} setVoteError={setVoteError}/>
      <Link to={`/reviews/${review_id}`} className="review-link">
      <img className="preview-img" src={review_img_url} alt={title} />
      <div className="review-details">
        <div className="review-title-preview">{title}</div>
        <div className="review-owner">
          by <span>{owner}</span>
        </div>
        <div className="review-date">{date}</div>
        <div className="review-comment-count">{comment_count} comments</div>
      </div>
      </Link>
    </div>
    
  );
}

export default ReviewCard;
