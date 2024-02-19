import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCategory } from '../utils/slice/category';

const useAddCategory = () => {
    const dispatch = useDispatch();

    const getCategory = async () => {
        const data = await fetch("https://fakestoreapi.com/products/categories");
        const json = await data.json();

        dispatch(addCategory(json));
    };

    useEffect(() => {
        getCategory()
    }, [])
}

export default useAddCategory;