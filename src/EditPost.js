import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import DataContext from "./context/DataContext";

const EditPost = () => {
  const {posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody } = useContext(DataContext)
    const {id} = useParams();
    const post = posts.find(post=>(post.id).toString() === id)
    useEffect(()=>{
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post, setEditBody, setEditTitle])

    return (
      <main className="NewPost">
        { /*{editTitle &&*/ }
        <>
        <h2>Edit Post</h2>
        <form className="newPostForm" onSubmit={(e)=>{e.preventDefault()}}>
          <label htmlFor="postTitle">Title:</label>
          <input
            id="postTitle"
            type='text'
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          >
          </input>
          <label htmlFor="postBody">Body</label>
          <textarea
            id="postBody"
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            required
          >
          </textarea>
          <button type="submit" onClick={()=>handleEdit(post.id)}>Submit</button>
        </form>
        </>
        {/*} */}
          {/* {!editTitle &&
        <>
        <h2>edit Post not found</h2>
        <p>
            <Link to="/">Go to Home page
            </Link>
        </p>
        </>} */}
      </main>
    )
  }
  
  export default EditPost