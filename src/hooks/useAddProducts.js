import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addProducts } from '../utils/slice/product';

const useAddProducts = ({id}) => {
    const dispatch = useDispatch();
    const getProducts = async () => {
        const data = await fetch("https://fakestoreapi.com/products/category/" + id)
        const json = await data.json();

        dispatch(addProducts(json));
    }
    useEffect(() => {
        getProducts()
    }, [id])
}

export default useAddProducts