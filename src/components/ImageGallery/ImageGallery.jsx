import React, { useEffect, useRef, useState } from 'react';
import Header from '../Header/Header';
import AddPhoto from '../AddPhoto/AddPhoto';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = () => {

    //Declearing all the State 
    const [imageDatas, setImageDatas] = useState([]);
    const [selectedImageDatas, setSelectedImageDatas] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [dragOverItemIndex, setDragOverItemIndex] = useState(null);
    const [dragItemIndex, setDragItemIndex] = useState(null);

    // Reading all the Image from the File
    useEffect(() => {
        const loadImages = async () => {
            const imagePaths = import.meta.glob("../../assets/*");
            const imagePromises = Object.keys(imagePaths).map((imagePath) => imagePaths[imagePath]());
            const imageModules = await Promise.all(imagePromises);

            // Setting image information
            const initialImageComponents = imageModules.map((module, index) => ({
                key: index,
                src: module.default,
                alt: `Image ${index + 1}`,
                isChecked: false, // Declaring Initial Selected Image state
            }));

            setImageDatas(initialImageComponents);
        };

        loadImages();
    }, []);

    // Callback function to update checkstatus for selected components
    const handleToggleCheck = (id) => {
        const updatedImageComponents = imageDatas.map((component) => {
            if (component.key === id) {
                return { ...component, isChecked: !component.isChecked };
            }
            return component;
        });

        setImageDatas(updatedImageComponents);
    };

    // Callback function to delete selected components
    const handledeleteSelectedData = () => {
        const updatedImageComponents = imageDatas.filter(
            (imageData) => imageData.isChecked == false
        );
        setImageDatas(updatedImageComponents);
        setSelectedImageDatas([]);
    };

    // Callback function to update selected Fcomponents
    const handleUpdateSelectedImageData = (imageData) => {
        const isAlreadySelected = selectedImageDatas.some((item) => {
            return item.key === imageData.key && item.src === imageData.src;
        });

        if (isAlreadySelected) {
            // Deselect the component by filtering it out
            setSelectedImageDatas(selectedImageDatas.filter((item) => {
                return item.key !== imageData.key || item.src !== imageData.src;
            }));
        } else {
            // Select the component if it's not already in the selected array
            setSelectedImageDatas([...selectedImageDatas, imageData]);
        }
    };

    
    // Callback function to add image
    const handleAddImage = (imageFile) => {

        // Create a new image  Data using the selected image file
        const newImageComponent = {
            key: imageDatas.length, // Generate a unique key based on the current number of images
            src: URL.createObjectURL(imageFile), // Use a temporary URL for the selected image
            alt: `New Image ${imageDatas.length + 1}`,
            isChecked: false,
        };

        // Update the imageDatas state by adding the new imagData
        setImageDatas([...imageDatas, newImageComponent]);
    };


    const dragItem = useRef(null);
    const dragOverItem = useRef(null);


    // Event handler for onDragStart
    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("text/plain", index);
        dragItem.current = index;
        setDragging(true);
        setDragItemIndex(index);
    };

     // Event handlers for onDragEnter
    const handleDragEnter = (e, index) => {
        e.preventDefault()
        dragOverItem.current = index;
        setDragOverItemIndex(index);
    };

     // Event handlers for onDragEnd
    const handleDragEnd = () => {
        let _items = [...imageDatas];
        const draggedItemContent = _items.splice(dragItem.current, 1)[0]; // remove the Dragged Image

        _items.splice(dragOverItem.current, 0, draggedItemContent); //sort the image by LTR

        dragItem.current = null; //set the reference value to null
        dragOverItem.current = null;

        //Setting the Dragging index values 
        setDragging(false);
        setDragOverItemIndex(null);
        setDragItemIndex(null)

        setImageDatas([..._items]); //set the sort Image data to state

    };

    return (
        <div className='xl:w-1/2 mx-auto border-2 bg-white xl:my-10 border-slate-300 rounded-lg'>
           {/* Displaying Header Section */}
            <Header
                selectedImageDatas={selectedImageDatas}
                handledeleteSelectedData={handledeleteSelectedData}
            ></Header>

            {/* Displaying all the Images to the Grid */}
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 object-contain md:grid-cols-3 sm:grid-cols-2 sm:gap-6 gap-3 sm:px-6 px-2 my-6">
                {
                    imageDatas.map((imageData, index) => (
                        <ImageCard

                            key={index}
                            index={index}
                            dragItemIndex={dragItemIndex}
                            dragOverItemIndex={dragOverItemIndex}
                            dragging={dragging}
                            imageData={imageData}
                            handleToggleCheck={handleToggleCheck}
                            handleUpdateSelectedImageData={handleUpdateSelectedImageData}
                            handleDragStart={handleDragStart}
                            handleDragEnd={handleDragEnd}
                            handleDragEnter={handleDragEnter}

                        ></ImageCard>

                    ))
                }
                {/* Add Photos Section */}
                <AddPhoto handleAddImage={handleAddImage} ></AddPhoto>
            </div>
        </div>
    );
};

export default ImageGallery;