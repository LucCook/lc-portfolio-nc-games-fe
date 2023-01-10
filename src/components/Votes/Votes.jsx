import arrow from "../../arrow3.png";
import './Votes.css'

function Votes({votes}) {
    return (<div className="review-votes-container">
    <img className="arrow up" src={arrow} alt="up vote review" />
    <div>{votes}</div>
    <img className="arrow down" src={arrow} alt="down vote review" />
  </div>)
}

export default Votes