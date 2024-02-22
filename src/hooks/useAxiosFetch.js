import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
    const [isLoading, setIsLoading] = useState(false)
    const [fetchError, setFetchError] = useState(null)
    const [data, setData] = useState([])

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source()

        const fetchData = async (Url) => {
            setIsLoading(true)
            try{
            const response = await axios.get(Url,{
                cancelToken:source.token
            })
            if(isMounted){
            setData(response.data)
            setFetchError(null)
            }
        }
        catch(err){
            if(isMounted){
                setFetchError(err.message)
                setData([])
                }
        }finally{
            isMounted && setTimeout(()=>setIsLoading(false),2000)
        }
        }
        fetchData(dataUrl) 
        const cleanUp = () =>{
            isMounted = false;
            source.cancel();
        }
        return cleanUp 
    }, [dataUrl])
    
    return { data, fetchError, isLoading }
}

export default useAxiosFetch;