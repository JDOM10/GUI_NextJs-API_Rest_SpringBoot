import { Product } from '@/types'
import axios from 'axios'


export const getProducts = async (): Promise<Product[]> => {

    const res = await axios.get('https://localhost:5016/api/TipoPlan/Listar')
    return res.data
}