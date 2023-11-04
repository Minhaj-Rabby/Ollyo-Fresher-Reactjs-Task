import React, { useEffect, useRef, useState } from 'react';
import PhotoCard from '../PhotoCard/PhotoCard';
import Header from '../Header/Header';

const PhotoGrid = () => {
    const [imageComponents, setImageComponents] = useState([]);
    const [selectedComponents, setSelectedComponents] = useState([]);
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

    return (
        <div className='w-1/2 mx-auto border-2  border-slate-300 rounded-md'>
            <Header
                selectedComponents={selectedComponents}
                handleTodeleteSelectedComponents={handleTodeleteSelectedComponents}
            ></Header>
            <div className="grid grid-cols-5 gap-6 px-6 mb-10 mt-10">
                {imageComponents.map((imageComponent, index) => (
                    <PhotoCard
                        key={index}
                        imageComponent={imageComponent}
                        updateSelectedComponents={updateSelectedComponents}
                        onToggleCheck={handleToggleCheck}
                        index={index}
                    ></PhotoCard>
                ))}
            </div>
        </div>
    );
};

export default PhotoGrid;