export const fetchReviews = (limit, page) => {
    return fetch(`https://lc-portfolio-nc-games.onrender.com/api/reviews?limit=${limit}&p=${page}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        return data.reviews
    })
}