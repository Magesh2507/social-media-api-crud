import { createContext } from "react";
import { useNavigate } from "react-router-dom"
import useWindowSize from "../hooks/useWindowSize.js"
import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "../api/posts";
import useAxiosFetch from "../hooks/useAxiosFetch.js";

const DataContext = createContext({})

export const DataProvider = ({children})=>{

    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [postTitle, setPostTitle] = useState("")
    const [postBody, setPostBody] = useState("")
    const [editTitle, setEditTitle] = useState("")
    const [editBody, setEditBody] = useState("")
    const navigate = useNavigate()
    const {width} = useWindowSize()
    const {data, fetchError, isLoading} = useAxiosFetch("http://react-json-server-socialmedia.onrender.com")
  
     useEffect(() => {
      setPosts(data)
     },[data])
  
    useEffect(() => {
      const filteredResults = posts.filter(post => (
        (post.body).toLowerCase().includes(search.toLowerCase()) || (post.title).toLowerCase().includes(search.toLowerCase())
      ))
      setSearchResults(filteredResults.reverse())
    }, [posts, search])
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
      const newPost = {
        id, title: postTitle, dateTime, body: postBody
      }
      try {
        const response = await api.post('/posts', newPost)//got new post only in res
        const allPosts = [...posts, response.data]
        setPosts(allPosts)
        setPostTitle('')
        setPostBody('')
        navigate('/')
      } catch (err) {
        console.log(err.message)
      }
    }
  
    const handleEdit = async (id) => {
      const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
      const updatedPost = {
        id, title: editTitle, dateTime, body: editBody
      }
      try {
        const response = await api.put(`/posts/${id}`, updatedPost)//got new post only in res
        setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
        setEditTitle('')
        setEditBody('')
        navigate('/')
      } catch (err) {
        console.log(err.message)
      }
    }
  
    const handleDelete = async (id) => {
      try {
        await api.delete(`/posts/${id}`)
        const postsList = posts.filter(post => (post.id !== id))
        setPosts(postsList)
        navigate('/')
      } catch (err) {
        console.log(err.message)
      }
    }
  

    return(
        <DataContext.Provider value={{width, searchResults, fetchError, isLoading, search, setSearch, handleSubmit, postTitle, setPostTitle, postBody, setPostBody, posts, handleDelete, handleEdit, editTitle, setEditTitle, editBody, setEditBody}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
