import { useContext } from "react"
import DataContext from "./context/DataContext"

const NewPost = () => {
  const { handleSubmit, postTitle, setPostTitle, postBody, setPostBody } = useContext(DataContext)
  return (
    <main className="NewPost">
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type='text'
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        >
        </input>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          type='text'
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          required
        >
        </textarea>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost