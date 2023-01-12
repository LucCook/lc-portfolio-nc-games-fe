export const fetchCategories = () => {
    return fetch('https://lc-portfolio-nc-games.onrender.com/api/categories')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        return data.categories
    })
  }