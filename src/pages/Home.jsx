import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import useAddCategory from '../hooks/useAddCategory';
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible
};

const Home = () => {
  useAddCategory();
  const categoryList = useSelector((store) => store.category.category);


  if (!categoryList) {
    return;
  }
  return (
    <div>
      <motion.article
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}>

        <Header />
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible
          }}
          className='text-left mb-10'
        >
          <div className="text-4xl">
            Product Gallery
          </div>
          <div>
            Shop by Category
          </div>

        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryList.map((category) => (
            <motion.h3
              variants={{
                hidden: {opacity: 0, x: -20},
                visible
              }}
            >
              <div key={category}>
                <Link key={category} to={`/category/${category}`}> {/* Wrap Card with Link */}
                  <div>
                    <Card name={category} image={category.image} />
                  </div>
                </Link>

              </div>
            </motion.h3>
          ))}
        </div>
      </motion.article>

    </div>
  );
};

export default Home;
