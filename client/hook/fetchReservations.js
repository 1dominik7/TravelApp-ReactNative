import { useState, useEffect } from "react";
import axios from "axios";

const fetchReservations = (userId) => {
    const [reservation, setReservation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchData = async ()=> {
        setIsLoading(true)
        try {
            const response = await axios.get(`http://192.168.1.107:5003/api/reservation/${userId}`);
            setReservation(response.data)
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


    return {reservation, isLoading, error, refetch}
}

export default fetchReservations