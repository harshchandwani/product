import React from 'react'

const Card = ({ name, image }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl image-full mr-5 ml-5">

            <div className="card-body">
                <h2 className="card-title justify-center">{name.toUpperCase()}</h2>
            </div>
        </div>
    )
}

export default Card