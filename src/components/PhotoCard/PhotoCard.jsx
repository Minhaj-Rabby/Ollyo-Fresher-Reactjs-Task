import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

const PhotoCard = ({ imageComponent,onSelect }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleIconClick = () => {
        setIsChecked(!isChecked);
        onSelect(imageComponent);
    };

    const handleIconHover = () => {
        if (!isChecked) {
            setIsHovered(true);
        }
    };

    const handleIconUnhover = () => {
        if (!isChecked) {
            setIsHovered(false);
        }
    };

    return (
        <div
            className="border-2 rounded-md border-slate-300 relative"
            onMouseEnter={handleIconHover}
            onMouseLeave={handleIconUnhover}
            onClick={handleIconClick}
        >
            <img
                src={imageComponent.props.src}
                alt=""
                className="w-full h-full"
            />
            <div className={`absolute inset-0 bg-black ${isChecked ? 'opacity-10' : (isHovered ? 'hover:opacity-50' : 'opacity-0')}`}></div>
            <div className="absolute h-7 m-5 top-0">

                {
                    isChecked ? <FontAwesomeIcon
                        className={`text-blue-700 ${isChecked ? 'opacity-100' : 'opacity-0'} h-7`}
                        icon={faCheckSquare}
                    /> :
                        <FontAwesomeIcon
                            className={`text-white ${isHovered ? 'opacity-100' : 'opacity-0'} h-7`}
                            icon={faSquare}
                        />
                }

            </div>
        </div>
    );
};

export default PhotoCard;