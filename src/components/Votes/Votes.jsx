import arrow from "../../arrow3.png";
import './Votes.css'
import { patchVote } from "../../api";

import { useEffect, useState } from "react";

function Votes({votes, type, id, setVoteError}) {

const [upVoted, setUpVoted] = useState(false)
const [downVoted, setDownVoted] = useState(false)
const [voteCount, setVoteCount] = useState(votes)


useEffect(() => {
  
  if (!upVoted && !downVoted) {
    setVoteCount(votes)
  } 
  if (upVoted) {
    setVoteError(false)
    setVoteCount(votes + 1)
    patchVote(type, id, upVoted)
    .catch((err) => {
      setVoteCount(votes)
      setUpVoted(false)
      setVoteError(true)
    })
  }
  if (downVoted) {
    setVoteError(false)
    setVoteCount(votes - 1)
    patchVote(type, id, !downVoted)
    .catch((err) => {
      setVoteCount(votes)
      setDownVoted(false)
      setVoteError(true)
    })
  }
}, [upVoted, downVoted, id, setVoteError, type, votes])

const handleUpVote = () => {
  if (downVoted) {
    setDownVoted(false)
    patchVote(type, id, true)
  }
  if (upVoted) {
    patchVote(type, id, false)
  }
  setUpVoted(!upVoted)
}

const handleDownVote = () => {
  if (upVoted) {
    setUpVoted(false)
    patchVote(type, id, false)
  }
  if (downVoted) {
    patchVote(type, id, true)
  }
  setDownVoted(!downVoted)
}

    return (<div className="review-votes-container">
    <input type="checkbox" id={`upvote${type}${id}`} className="vote-checkbox up" checked={upVoted} onChange={() => {
      handleUpVote()
    }}/>
    <label htmlFor={`upvote${type}${id}`} className="label"><img className="arrow up" src={arrow} alt="up vote" /></label>
    <div>{voteCount}</div>
    <input type="checkbox" id={`downvote${type}${id}`} className="vote-checkbox down" checked={downVoted} onChange={() => {
      handleDownVote()
    }}/>
    <label htmlFor={`downvote${type}${id}`} className="label"><img className="arrow down" src={arrow} alt="down vote" /></label>
    
  </div>)
}

export default Votes