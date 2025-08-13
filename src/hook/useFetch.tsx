import { useEffect, useState } from "react"
import { apiCountry } from "../api/api"

interface IParams {
    limit: number
    skip: number
}

export const useFetch = <T,>(endpoint: string, params?: IParams) => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        apiCountry
            .get(endpoint, { params })
            .then(res => setData(res.data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [endpoint, JSON.stringify(params)])

    return { data, loading, error }

}