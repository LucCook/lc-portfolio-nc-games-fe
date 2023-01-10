import arrow from "../../arrow3.png";
import './Votes.css'

function Votes({votes, type, id}) {
    return (<div className="review-votes-container">
    <label htmlFor="upvote"><img className="arrow up" src={arrow} alt="up vote review" /></label>
    <input type="checkbox" id="upvote" className="vote-checkbox"/>
    <div>{votes}</div>
    <img className="arrow down" src={arrow} alt="down vote review" />
  </div>)
}

export default Votes