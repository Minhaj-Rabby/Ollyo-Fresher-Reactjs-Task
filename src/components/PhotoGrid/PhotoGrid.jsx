import React, { useEffect, useRef, useState } from 'react';
import PhotoCard from '../PhotoCard/PhotoCard';
import Header from '../Header/Header';
import AddPhoto from '../AddPhoto/AddPhoto';

const PhotoGrid = () => {
    const [imageComponents, setImageComponents] = useState([]);
    const [selectedComponents, setSelectedComponents] = useState([]);

    const [dragging, setDragging] = useState(false);
    const [dragOverItemIndex, setDragOverItemIndex] = useState(null);
    const [dragItemIndex ,setDragItemIndex] = useState(null);

    useEffect(() => {
        const loadImages = async () => {
            const imagePaths = import.meta.glob("../../assets/*");
            const imagePromises = Object.keys(imagePaths).map((imagePath) => imagePaths[imagePath]());
            const imageModules = await Promise.all(imagePromises);

            const initialImageComponents = imageModules.map((module, index) => ({
                key: index,
                src: module.default,
                alt: `Image ${index + 1}`,
                isChecked: false, // Initialize isChecked as false
            }));

            setImageComponents(initialImageComponents);
        };

        loadImages();
    }, []);

    // Callback function to update checkstatus for selected components
    const handleToggleCheck = (id) => {
        const updatedImageComponents = imageComponents.map((component) => {
            if (component.key === id) {
                return { ...component, isChecked: !component.isChecked };
            }
            return component;
        });

        setImageComponents(updatedImageComponents);
    };
    // Callback function to delete selected components
    const handleTodeleteSelectedComponents = () => {
        const updatedImageComponents = imageComponents.filter(
            (imageComponent) => imageComponent.isChecked == false
        );
        setImageComponents(updatedImageComponents);
        setSelectedComponents([]);
    };

    // Callback function to update selected Fcomponents
    const updateSelectedComponents = (imageComponent) => {
        const isAlreadySelected = selectedComponents.some((item) => {
            return item.key === imageComponent.key && item.src === imageComponent.src;
        });

        if (isAlreadySelected) {
            // Deselect the component by filtering it out
            setSelectedComponents(selectedComponents.filter((item) => {
                return item.key !== imageComponent.key || item.src !== imageComponent.src;
            }));
        } else {
            // Select the component if it's not already in the selected array
            setSelectedComponents([...selectedComponents, imageComponent]);
        }
    };

    const handleAddImage = (imageFile) => {
        // Create a new image component using the selected image file
        const newImageComponent = {
            key: imageComponents.length, // Generate a unique key based on the current number of images
            src: URL.createObjectURL(imageFile), // Use a temporary URL for the selected image
            alt: `New Image ${imageComponents.length + 1}`,
            isChecked: false, // Initialize isChecked as false
        };

        // Update the imageComponents state by adding the new image component
        setImageComponents([...imageComponents, newImageComponent]);
    };

    const dragItem = useRef(null);
    const dragOverItem = useRef(null);



    const handleDragStart = (e, index) => {
        console.log('start index :', index)
        e.dataTransfer.setData("text/plain", index);
        console.log('Drag Before: ',dragItem)

        dragItem.current = index;
        console.log('Drag After: ',dragItem.current)
        setDragging(true);
        setDragItemIndex(index);
    };

    const handleDragEnter = (e, index) => {
        console.log("Enter Index :", index)
        e.preventDefault()
        dragOverItem.current = index;
        setDragOverItemIndex(index);
    };

    const handleDragEnd = () => {

        console.log("Drag End");
        console.log(dragItem);
        console.log(dragOverItem);
        let _items = [...imageComponents];
        const draggedItemContent = _items.splice(dragItem.current, 1)[0];

        _items.splice(dragOverItem.current, 0, draggedItemContent);

        dragItem.current = null;
        dragOverItem.current = null;

        setDragging(false);
        setDragOverItemIndex(null);
        setDragItemIndex(null)

        setImageComponents([..._items]);

    };

    return (
        <div className='xl:w-1/2 mx-auto border-2 bg-white xl:my-10 border-slate-300 rounded-lg'>
            <Header
                selectedComponents={selectedComponents}
                handleTodeleteSelectedComponents={handleTodeleteSelectedComponents}
            ></Header>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 object-contain md:grid-cols-3 sm:grid-cols-2 sm:gap-6 gap-3 sm:px-6 px-2 my-6">
                {
                    imageComponents.map((imageComponent, index) => (
                        <PhotoCard

                            key={index}
                            index={index}
                            dragItemIndex={dragItemIndex}
                            dragOverItemIndex={dragOverItemIndex}
                            dragging={dragging}
                            imageComponent={imageComponent}
                            onToggleCheck={handleToggleCheck}
                            updateSelectedComponents={updateSelectedComponents}
                            handleDragStart={handleDragStart}
                            handleDragEnd={handleDragEnd}
                            handleDragEnter={handleDragEnter}

                        ></PhotoCard>

                    ))
                }
                <AddPhoto handleAddImage={handleAddImage} ></AddPhoto>
            </div>
        </div>
    );
};

export default PhotoGrid;