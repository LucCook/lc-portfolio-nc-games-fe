import "./SingleReview.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleReview, fetchReviews } from "../../api";
import formatDate from "../../utils";
import Votes from "../Votes/Votes";
import Comments from "../Comments/Comments";
import arrow from "../../arrow3.png";

function SingleReview() {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [prevReviewId, setPrevReviewId] = useState('end');
  const [nextReviewId, setNextReviewId] = useState('end');
  const [commentsVisible, setCommentsVisible] = useState(false)
  const [voteError, setVoteError] = useState(false)

  const date = formatDate(review.created_at)

  useEffect(() => {
    setLoading(true)
    fetchSingleReview(review_id)
      .then((review) => {
        setReview(review);
      })
      .then(() => {
        return fetchReviews(1000000000000, 1)
      })
      .then((reviews) => {
        if (
          reviews[
            reviews.findIndex(
              (item) => item.review_id === parseInt(review_id)
            ) + 1
          ]
        ) {
          setNextReviewId(
            reviews[
              reviews.findIndex(
                (item) => item.review_id === parseInt(review_id)
              ) + 1
            ].review_id
          );
        }
        if (
          reviews[
            reviews.findIndex(
              (item) => item.review_id === parseInt(review_id)
            ) - 1
          ]
        ) {
          setPrevReviewId(
            reviews[
              reviews.findIndex(
                (item) => item.review_id === parseInt(review_id)
              ) - 1
            ].review_id
          );
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, [review_id]);

  useEffect(() => {
    fetchReviews(1000000000000, 1)
      .then((reviews) => {
        if (
          reviews[
            reviews.findIndex(
              (item) => item.review_id === parseInt(review_id)
            ) + 1
          ]
        ) {
          setNextReviewId(
            reviews[
              reviews.findIndex(
                (item) => item.review_id === parseInt(review_id)
              ) + 1
            ].review_id
          );
        } else {
            setNextReviewId()
        }
        if (
          reviews[
            reviews.findIndex(
              (item) => item.review_id === parseInt(review_id)
            ) - 1
          ]
        ) {
          setPrevReviewId(
            reviews[
              reviews.findIndex(
                (item) => item.review_id === parseInt(review_id)
              ) - 1
            ].review_id
          );
        } else {
            setPrevReviewId()
        }
      })
  }, [review, review_id]);

  if (loading) {
    return <main>
        <div className="nav-container">
        {prevReviewId && (
          <Link to={`/reviews/${prevReviewId}`}>
            <div className="nav-arrow-container">
              <img className="arrow left" src={arrow} alt="previous review"/>
              <div>prev review</div>
            </div>
          </Link>
        )}
        {(nextReviewId) && (
          <Link to={`/reviews/${nextReviewId}`}>
            <div className="nav-arrow-container">
              <div>next review</div>
              <img className="arrow right" src={arrow} alt="next review"/>
            </div>
          </Link>
        )}
      </div>
            <div className="single-review-container">loading...</div>
            </main>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <main>
      <div className="nav-container">
        {prevReviewId && (
          <Link to={`/reviews/${prevReviewId}`}>
            <div className="nav-arrow-container">
              <img className="arrow left" src={arrow} alt="previous review"/>
              <div>prev review</div>
            </div>
          </Link>
        )}
        {(nextReviewId) && (
          <Link to={`/reviews/${nextReviewId}`}>
            <div className="nav-arrow-container">
              <div>next review</div>
              <img className="arrow right" src={arrow} alt="next review"/>
            </div>
          </Link>
        )}
      </div>
      <div className="single-review-container">
      {voteError && <div className="error-message">Oh dear, something went wrong, please try again later or contact support</div>}
        <div className="title-container">
          <Votes votes={review.votes} type="review" setVoteError={setVoteError} id={review.review_id}/>
          <div className="review-title-full">{review.title}</div>
        </div>
        <div className="details-container">
          category: <strong>{review.category}</strong>
          <br></br>
          published: <strong>{date}</strong>
          <br></br>
          designer: <strong>{review.designer}</strong>
        </div>

        <img
          className="full-img"
          src={review.review_img_url}
          alt={review.title}
        />

        <div className="review-body">{review.review_body}</div>
        {review.comment_count > 0 && (
          <button className="comments-button active" onClick={() => {
            setCommentsVisible(!commentsVisible)
          }}>
            {commentsVisible === false && <div>Show {review.comment_count} comments</div>}
            {commentsVisible === true && <div>Hide comments</div>}
          </button>
        )}
        {review.comment_count === 0 && (
            <div className="comments-button">No comments to display</div>
        )}
        {commentsVisible && (
          <Comments review_id={review_id}/>
        )}
      </div>
    </main>
  );
}

export default SingleReview;
