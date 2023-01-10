export const fetchReviews = (limit, page) => {
    return fetch(`https://lc-portfolio-nc-games.onrender.com/api/reviews?limit=${limit}&p=${page}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        return data.reviews
    })
}

export const fetchSingleReview = (review_id) => {
    return fetch(`https://lc-portfolio-nc-games.onrender.com/api/reviews/${review_id}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        return data.review
    })
}

export const fetchComments = (review_id) => {
    return fetch(`https://lc-portfolio-nc-games.onrender.com/api/reviews/${review_id}/comments`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        return data.comments
    })
}