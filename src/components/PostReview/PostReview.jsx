import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../contexts/User"
import {postReview} from "../../api"
import './PostReview.css'

function PostReview({setLoadingMain}) {

    const [reviewTitle, setReviewTitle] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [gameDesigner, setGameDesigner] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [imgBase64, setImgBase64] = useState('')
    const [category, setCategory] = useState('')
    const {user} = useContext(UserContext)

    useEffect(() => {
        setLoadingMain(false)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        postReview(user.username, reviewTitle, reviewBody, gameDesigner, (imgBase64 || imgUrl), category)
    }

    function encodeImageFileAsURL(element) {
        console.log(element.target.files[0])
        const file = element.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function() {
          setImgBase64(reader.result)
        }
        reader.readAsDataURL(file);
      }

    return (<div className="post-review-container">
        
        <form onSubmit={(e) => {handleSubmit(e)}} className="post-review-container">
            <input type="text" value={reviewTitle} placeholder="Title" onChange={(e) => {
                        setReviewTitle(e.target.value)
                    }}/>
            <textarea spellCheck="false" placeholder={`What did you think of this game?`} value={reviewBody} onChange={(e) => {
                        setReviewBody(e.target.value)
                    }}/>
            <select className="input" id="item-category" value={category} onChange={(e) => setCategory(e.target.value)} >
        <option value=""> -- select a category -- </option>
            <option value="strategy">
            strategy
            </option>
            <option value="hidden-roles">
            hidden-roles
            </option>
            <option value="dexterity">
            dexterity
            </option>
        </select>
            <input type="text" value={gameDesigner} placeholder="Who made this game?" onChange={(e) => {
                        setGameDesigner(e.target.value)
                    }}/>
            <input type="file" accept="image/*" onChange={(e) => encodeImageFileAsURL(e)} />
            <input type="text" value={imgUrl} placeholder="image url" onChange={(e) => {
                        setImgUrl(e.target.value)
                    }}/>
            <button onClick={(e) => {handleSubmit(e)}}>Submit your review</button>
        </form>
    </div>)
}

export default PostReview
