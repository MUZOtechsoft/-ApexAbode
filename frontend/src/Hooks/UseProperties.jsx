import { useQuery } from 'react-query'
import { getAllProperties } from '../Utils/api'

const UseProperties = () => {
  const {data, isError, isLoding, refetch} = useQuery(
    "allProperties",
    getAllProperties  ,
    {refetchOnWindowFocus: false}
  )
  return {
    data, isError, isLoding, refetch
  }
}

export default UseProperties