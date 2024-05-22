import { Product } from '@/types'
import axios from 'axios'
import qs from 'query-string'


export const getProducts = async (): Promise<Product[]> => {

    const res = await axios.get('http://localhost:4000/plan')
    return res.data
}