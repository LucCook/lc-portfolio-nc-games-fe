import axios from 'axios'

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

export const patchVote = (type, id, positive) => {
    console.log('patching...')
    const increment = positive ? 1 : -1
    if (type === 'review') {
        console.log('patching review!')
        return axios.patch(`https://lc-portfolio-nc-games.onrender.com/api/reviews/${id}`, {inc_votes: increment})
        .then((res) => {
            console.log('patch succesful!') 
        })
    }
    if (type === 'comment') {
        console.log('patching comment!')
        return axios.patch(`https://lc-portfolio-nc-games.onrender.com/api/comments/${id}`, {inc_votes: increment})
        .then((res) => {
            console.log('patch succesful!') 
        })
    }
}