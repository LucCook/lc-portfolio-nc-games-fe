import axios from 'axios'

export const fetchReviews = (limit, page, category) => {
    let reqString = `https://lc-portfolio-nc-games.onrender.com/api/reviews?limit=${limit}&p=${page}`

    if (category) reqString += `&category=${category}`

    return fetch(reqString)
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

export const patchVote = (type, id, positive) => {
    const increment = positive ? 1 : -1
    if (type === 'review') {
        return axios.patch(`https://lc-portfolio-nc-games.onrender.com/api/reviews/${id}`, {inc_votes: increment})
    }
    if (type === 'comment') {
        return axios.patch(`https://lc-portfolio-nc-games.onrender.com/api/comments/${id}`, {inc_votes: increment})
    }
}

export const postComment = (commentBody, user, reviewId) => {
    return axios.post(`https://lc-portfolio-nc-games.onrender.com/api/reviews/${reviewId}/comments`, {'username': user, 'body': commentBody})
    .then(({data}) => {
        return data.comment
    })
}

export const deleteComment =(comment_id) => {
    return axios.delete(`https://lc-portfolio-nc-games.onrender.com/api/comments/${comment_id}`)
}