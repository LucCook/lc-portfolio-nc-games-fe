import "./SingleReview.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleReview, fetchReviews } from "../../api";
import Votes from "../Votes/Votes";
import arrow from "../../arrow3.png";

function SingleReview() {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [prevReviewId, setPrevReviewId] = useState('end');
  const [nextReviewId, setNextReviewId] = useState('end');

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
        console.log(
          reviews[
            reviews.findIndex((item) => item.review_id === parseInt(review_id))
          ]
        );
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err);
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
      .then(() => {
        console.log(prevReviewId + " prev review id");
        console.log(nextReviewId + " next review id");
      });
  }, [review, review_id]);

  if (loading) {
    return <main>
        <div className="nav-container">
        {prevReviewId && (
          <Link to={`/reviews/${prevReviewId}`}>
            <div className="nav-arrow-container">
              <img className="arrow left" src={arrow} />
              <div>prev review</div>
            </div>
          </Link>
        )}
        {(nextReviewId) && (
          <Link to={`/reviews/${nextReviewId}`}>
            <div className="nav-arrow-container">
              <div>next review</div>
              <img className="arrow right" src={arrow} />
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

  const date = new Date(review.created_at);
  const fullDateString = date.toUTCString();
  const dateString = fullDateString.slice(fullDateString.indexOf(" "));

  return (
    <main>
      <div className="nav-container">
        {prevReviewId && (
          <Link to={`/reviews/${prevReviewId}`}>
            <div className="nav-arrow-container">
              <img className="arrow left" src={arrow} />
              <div>prev review</div>
            </div>
          </Link>
        )}
        {(nextReviewId) && (
          <Link to={`/reviews/${nextReviewId}`}>
            <div className="nav-arrow-container">
              <div>next review</div>
              <img className="arrow right" src={arrow} />
            </div>
          </Link>
        )}
      </div>
      <div className="single-review-container">
        <div className="title-container">
          <Votes votes={review.votes} />
          <div className="review-title-full">{review.title}</div>
        </div>
        <div className="details-container">
          category: <strong>{review.category}</strong>
          <br></br>
          published: <strong>{dateString}</strong>
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
          <button className="comments-button active">
            Show {review.comment_count} comments
          </button>
        )}
        {review.comment_count === 0 && (
            <div className="comments-button">No comments to display</div>
        )}
      </div>
    </main>
  );
}

export default SingleReview;
