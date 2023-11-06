import React from 'react';

const PhotoCard = (props) => {

    const { index,
        dragItemIndex,
        dragOverItemIndex,
        dragging,
        imageComponent,
        onToggleCheck,
        updateSelectedComponents,
        handleDragStart,
        handleDragEnd,
        handleDragEnter
    } = props;

    const handleIconClick = () => {
        updateSelectedComponents(imageComponent);
        onToggleCheck(imageComponent.key);
    };

    return (
        <div
            className={` group border-2  border-slate-300 relative ${index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} 
            ${dragging && dragOverItemIndex === index && "border-2 border-dashed border-slate-300 "}
            before:absolute before:h-full before:w-full rounded-lg before:transition-colors before:cursor-move `}

            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
        >
            {
                dragOverItemIndex == index ?
                    < >
                      <h2 className='flex justify-center align-middle items-center my-10'>Drop Here</h2> 
                    </> :
                    <>
                        <img
                            src={imageComponent.src}
                            alt=""
                            className={`w-full h-full ${imageComponent.isChecked ? "opacity-70" : "opacity-100"}`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                        />
                    </>
            }
            <div className={`group-2 absolute inset-0 bg-black ${imageComponent.isChecked ? 'opacity-10' : 'hover:opacity-50 opacity-0'}`}></div>
            <input
                type="checkbox"
                onClick={handleIconClick}
                className={`absolute top-4 left-4 h-5 w-5 accent-blue-500 transition-opacity delay-100 duration-100 ease-linear cursor-pointer ${imageComponent.isChecked ? "opacity-100" : "group-hover:opacity-100 opacity-0"
                    }`}
                onChange={() => onToggleCheck(imageComponent.key)}
                checked={imageComponent.isChecked}
            />
        </div>
    );
};

export default PhotoCard;
