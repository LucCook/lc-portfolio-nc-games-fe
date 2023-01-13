import axios from 'axios'

export const fetchReviews = (limit, page, category, sort, order, owner) => {
    let reqString = `https://lc-portfolio-nc-games.onrender.com/api/reviews?limit=${limit}&p=${page}`

    if (category) reqString += `&category=${category}`

    if (sort) reqString += `&sort_by=${sort}`

    if (order) reqString += `&order=${order}`

    if (owner) reqString += `&owner=${owner}`

    return axios.get(reqString)
    .then(({data}) => {
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

export const editComment = (comment_id, editedBody) => {
    return axios.patch(`https://lc-portfolio-nc-games.onrender.com/api/comments/${comment_id}`, {body: editedBody})
    .then(({data}) => {
        return data.comment
    })
}

export const fetchUsers = () => {
    return axios.get(`https://lc-portfolio-nc-games.onrender.com/api/users`)
    .then(({data}) => {
        return data.users
    })
}

export const postReview = (user, reviewTitle, reviewBody, gameDesigner, imgSrc, category) => {
    const newReview ={
        title: reviewTitle,
        designer: gameDesigner,
        owner: user,
        review_img_url: imgSrc,
        review_body: reviewBody,
        category: category
    }
    return axios.post(`https://lc-portfolio-nc-games.onrender.com/api/reviews`, newReview).then((res) => {
        console.log(res)
    })
}