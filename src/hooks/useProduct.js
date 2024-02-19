import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addSelectedProduct } from '../utils/slice/product';

const useProduct = (id) => {
    const dispatch = useDispatch();
    const getSelectedProduct = async () => {
        const data = await fetch("https://fakestoreapi.com/products/" + id);
        const json = await data.json();
        dispatch(addSelectedProduct(json));
    }

    useEffect(() => {
        getSelectedProduct()
    }, [id])
}

export default useProduct