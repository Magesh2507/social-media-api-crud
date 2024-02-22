import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import DataContext from './context/DataContext';


const PostPage = () => {
  const { posts, handleDelete } = useContext(DataContext)
  const {id} = useParams();
  const post = posts.find(post=> (post.id).toString() === id)
  return (
    <main className='PostPage'>
      <article className="post">
    {post &&
     <>
      <h1>{post.title}</h1>
      <p className="postDate">{post.dateTime}</p>
      <p className="postBody">{post.body}</p>
      <Link to={`/edit/${post.id}`}>
        <button className='editButton'>Edit Post</button>
      </Link>
      <button className='deleteButton' onClick={()=>{handleDelete(post.id)}}>Delete Post</button>
      </>}
      </article>
   {!post &&
    <>
     <h1>Post not found</h1>
     <Link to="/">Visit Home page</Link>
    </>
   }
    </main>
  )
}

export default PostPage;