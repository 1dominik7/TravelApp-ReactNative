import { useState, useEffect } from "react";
import axios from "axios";

const fetchReviews = () => {
    const [allReviews, setAllReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)


    const fetchData = async ()=> {
        setIsLoading(true)

        try {
            const response = await axios.get(`http://192.168.1.107:5003/api/reviews`);

            setAllReviews(response.data)
            setIsLoading(false)
        } catch (error) {
           setError(error) 
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch =() => {
        setIsLoading(true)
        fetchData();
    }


    return {allReviews, isLoading, error, refetch}
}

export default fetchReviews