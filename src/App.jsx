import { useLocation, useRoutes } from "react-router-dom"
import "./App.css"
import React from "react"
import Product from "./pages/Product"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Category from "./pages/Category"
import { ToastContainer } from "react-toastify"
import { AnimatePresence } from "framer-motion"

function App() {
  const appRouter = useRoutes([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "/category/:id",
      element: <Category />
    }, {
      path: "product/:id",
      element: <Product />
    }
  ]);
  const location = useLocation();
  return (
    <AnimatePresence mode='wait'>
      {React.cloneElement(appRouter, { key: location.pathname })}
      <ToastContainer />
    </AnimatePresence>

  )
}

export default App
