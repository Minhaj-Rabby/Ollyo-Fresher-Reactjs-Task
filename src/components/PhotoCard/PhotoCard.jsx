import React from 'react'

const PhotoCard = ({imageComponent}) => {
    return (
        <div className=" border-2 rounded-md">
            <img src={imageComponent.props.src} alt="" />
        </div>
    )
}

export default PhotoCard