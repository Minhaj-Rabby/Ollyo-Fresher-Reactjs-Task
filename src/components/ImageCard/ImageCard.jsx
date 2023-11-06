import React from 'react';

const ImageCard = (props) => {
    // Collecting all the Props Data from Parent Component
    const { index,
        dragOverItemIndex,
        dragging,
        imageData,
        handleToggleCheck,
        handleUpdateSelectedImageData,
        handleDragStart,
        handleDragEnd,
        handleDragEnter
    } = props;

    // Event handlers for Selecting Image
    const handleIconClick = () => {
        handleUpdateSelectedImageData(imageData);
        handleToggleCheck(imageData.key);
    };

    return (
        <div
            className={` group border-2  border-slate-300 relative ${index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} 
            ${dragging && dragOverItemIndex === index && "border-2 border-dashed border-slate-300 "}
            before:absolute before:h-full before:w-full rounded-lg before:transition-colors before:cursor-move `}
            // Drag and Drop events
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
        >
            {
                // Droping Component's Design
                dragOverItemIndex == index ?
                    < >
                        <h2 className='flex justify-center align-middle items-center my-10 ease-in'>Drop Here</h2>
                    </> :
                    <>
                        {/* Displaying the Data */}
                        <img
                            src={imageData.src}
                            alt=""
                            className={`w-full h-full ${imageData.isChecked ? "opacity-70" : "opacity-100"}`}
                            loading="lazy"
                            decoding="async"
                            data-nimg="1"
                        />
                    </>
            }

            {/* Overlapin when Hover  */}
            <div className={`absolute inset-0 bg-black ${imageData.isChecked ? 'opacity-10' : 'hover:opacity-50 opacity-0'}`}>

            </div>
            {/* Selecting Option */}
            <input
                type="checkbox"
                onClick={handleIconClick}
                className={`absolute top-4 left-4 h-5 w-5 accent-blue-500 transition-opacity delay-100 duration-100 ease-linear cursor-pointer ${imageData.isChecked ? "opacity-100" : "group-hover:opacity-100 opacity-0"
                    }`}
                onChange={() => handleToggleCheck(imageData.key)}
                checked={imageData.isChecked}
            />
        </div>
    );
};

export default ImageCard;
