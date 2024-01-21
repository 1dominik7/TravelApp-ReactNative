import { useState, useEffect } from "react";
import axios from "axios";

const fetchHotelsByCountry = (id) => {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)


    const fetchData = async ()=> {
        setIsLoading(true)

        try {
            const response = await axios.get(`http://192.168.1.107:5003/api/hotels/byCountry/${id}?limit=all`);
            setHotels(response.data)
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


    return {hotels, isLoading, error, refetch}
}

export default fetchHotelsByCountry