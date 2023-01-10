import arrow from "../../arrow3.png";
import './Votes.css'
import { patchVote } from "../../api";

import { useEffect, useState } from "react";

function Votes({votes, type, id}) {

const [upVoted, setUpVoted] = useState(false)
const [downVoted, setDownVoted] = useState(false)
const [voteCount, setVoteCount] = useState(votes)

useEffect(() => {
  // console.log(upVoted + ' <<< upVoted')
  // console.log(downVoted + ' <<< downVoted')
  if (!upVoted && !downVoted) {
    setVoteCount(votes)
  } 
  if (upVoted) {
    setVoteCount(votes + 1)
    patchVote(type, id, upVoted)
  } else {

  }
  if (downVoted) {
    setVoteCount(votes - 1)
    patchVote(type, id, !downVoted)
  }
}, [upVoted, downVoted])

    return (<div className="review-votes-container">
    <input type="checkbox" id={`upvote${type}${id}`} className="vote-checkbox up" checked={upVoted} onChange={() => {
      if (downVoted) {
        setDownVoted(false)
        patchVote(type, id, true)
      }
      setUpVoted(!upVoted)
    }}/>
    <label htmlFor={`upvote${type}${id}`} className="label"><img className="arrow up" src={arrow} alt="up vote" /></label>
    <div>{voteCount}</div>
    <input type="checkbox" id={`downvote${type}${id}`} className="vote-checkbox down" checked={downVoted} onChange={() => {
      if (upVoted) {
        setUpVoted(false)
        patchVote(type, id, false)
      }
      setDownVoted(!downVoted)
    }}/>
    <label htmlFor={`downvote${type}${id}`} className="label"><img className="arrow down" src={arrow} alt="down vote" /></label>
  </div>)
}

export default Votes