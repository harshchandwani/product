import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAddProducts from '../hooks/useAddProducts';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { motion } from "framer-motion";
import Header from '../components/Header';

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible
};
const Category = () => {
  //data fetch and store logic
  const id = useParams();
  useAddProducts(id);
  const productList = useSelector((store) => store.products.products);
  if (!productList) {
    return;
  }

  //animation logic here

  return (
    <div>
      <Header />
      <motion.article

        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {productList.map((product) => (
            <motion.h3
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible
              }}
              key={product.id}
            >
              <div key={product.id}>
                <Link
                  key={product.id}
                  to={{
                    pathname: `/product/${product.id}`
                    // Pass product data using state prop
                  }}
                >
                  <div>
                    <ProductCard title={product.title} image={product.image} price={product.price} />
                  </div>
                </Link>

              </div>
            </motion.h3>
          ))}
        </div>
      </motion.article>
    </div>
  )
}

export default Category