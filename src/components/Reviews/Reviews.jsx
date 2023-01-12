import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchReviews } from "../../api";
import ReviewCard from "../ReviewCard/ReviewCard";
import DropdownSort from "../DropdownSort/DropdownSort";

import "./Reviews.css";

function Reviews() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [voteError, setVoteError] = useState(false)
  const [queries, setQueries] = useSearchParams()
  const [sort, setSort] = useState('created_at')
  const [order, setOrder] = useState('desc')

  const sortOptions = [{label: 'created_at'}, {label: 'comment_count'}, {label: 'votes'}]
  const category = queries.get('category')

  useEffect(() => {
    setError(false)
    fetchReviews(limit, page, category, sort, order)
      .then((reviews) => {
        setLoading(false);
        setReviews(reviews);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err);
      });
  }, [limit, page, category, sort, order]);

 

  if (loading)
    return (
      <main>
        <div className="reviews-nav">
        <DropdownSort display="reviews-drop" label={`sorting by: ${sort}`} order={order} items={sortOptions} itemLabel='label'/>
          {page > 1 && (
            <div
              className="nav-button"
              onClick={() => {
                setLoading(true)
                if (page > 1) setPage(page - 1);
              }}
            >
              {"<- prev"}
            </div>
          )}

          {reviews.length > 0 && (
            <div
              className="nav-button"
              onClick={() => {
                setLoading(true)
                setPage(page + 1);
              }}
            >
              {"next ->"}
            </div>
          )}
        </div>
        <div className="all-reviews-container">

        <div className="user-message">Loading...</div>
        </div>
        <div className="reviews-nav">
          {page > 1 && (
            <div
              className="nav-button"
              onClick={() => {
                setLoading(true)
                if (page > 1) setPage(page - 1);
              }}
            >
              {"<- prev"}
            </div>
          )}
          {reviews.length > 0 && (
            <div
              className="nav-button"
              onClick={() => {
                setLoading(true)
                setPage(page + 1);
              }}
            >
              {"next ->"}
            </div>
          )}
        </div>
      </main>
    );

  if (error)
    return (
      <main>
        <div className="user-message">Error :( </div>
      </main>
    );

  return (
    <main>
      <div className="reviews-nav">
        <div className="drop-container">
        <DropdownSort display="reviews-drop" label={`sorting by: ${sort}`} items={sortOptions} itemLabel='label' setSort={setSort}/>
        <button className="order-btn" onClick={() => {setOrder(order === 'desc' ? 'asc' : 'desc')}}>order: {order}</button>
        </div>
        {page > 1 && (
          <div
            className="nav-button"
            onClick={() => {
                setLoading(true)
              if (page > 1) setPage(page - 1);
            }}
          >
            {"<- prev"}
          </div>
        )}

        {reviews.length > 0 && (
          <div
            className="nav-button"
            onClick={() => {
                setLoading(true)
              setPage(page + 1);
            }}
          >
            {"next ->"}
          </div>
        )}
      </div>
      <div className="all-reviews-container">
      {voteError && <div className="error-message">Oh dear, something went wrong, please try again later or contact support</div>}
        {reviews.length === 0 && (
          <div className="user-message">No reviews :(</div>
        )}
        {reviews.map((review, index, array) => {
          if (index === array.length - 1) {
            return (
              <ReviewCard key={review.review_id} {...review} last={true} setVoteError={setVoteError} />
            );
          }
          return <ReviewCard key={review.review_id} {...review} setVoteError={setVoteError}/>;
        })}
      </div>
      <div className="reviews-nav">
        {page > 1 && (
          <div
            className="nav-button"
            onClick={() => {
                setLoading(true)
              if (page > 1) setPage(page - 1);
            }}
          >
            {"<- prev"}
          </div>
        )}
        {reviews.length > 0 && (
          <div
            className="nav-button"
            onClick={() => {
                setLoading(true)
              setPage(page + 1);
            }}
          >
            {"next ->"}
          </div>
        )}
      </div>
    </main>
  );
}

export default Reviews;
