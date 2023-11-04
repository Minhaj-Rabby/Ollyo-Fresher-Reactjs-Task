import React, { useRef } from 'react';

const PhotoCard = ({ imageComponent, updateSelectedComponents, onToggleCheck,handleSort,index}) => {
   
    const handleIconClick = () => {
        updateSelectedComponents(imageComponent);
        onToggleCheck(imageComponent.key);
    };
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    return (
        <div
            className={` group border-2  border-slate-300 relative ${index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} before:absolute before:h-full before:w-full rounded-lg before:transition-colors before:cursor-move `}
            onClick={handleIconClick}
            draggable
            onDragStart={() => (dragItem.current = imageComponent.key)}
            onDragEnter={() => (dragOverItem.current = imageComponent.key)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
        >
            <img
                src={imageComponent.src}
                alt=""
                className={`w-full h-full ${imageComponent.isChecked ? "opacity-70" : "opacity-100"}`}
                loading="lazy"
                decoding="async"
                data-nimg="1"
            />
            <div className={`absolute inset-0 bg-black ${imageComponent.isChecked ? 'opacity-10' : 'hover:opacity-50 opacity-0'}`}></div>
            <input
                type="checkbox"
                className={`absolute top-4 left-4 h-5 w-5 accent-blue-500 group-hover:opacity-100 transition-opacity delay-100 duration-100 ease-linear cursor-pointer ${imageComponent.isChecked ? "opacity-100" : "group-hover:opacity-100 opacity-0"
                    }`}
                onChange={() => onToggleCheck(imageComponent.key)}
                checked={imageComponent.isChecked}
            />
        </div>
    );
};

export default PhotoCard;
