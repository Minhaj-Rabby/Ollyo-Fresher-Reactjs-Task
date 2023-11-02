import React, { useEffect, useState } from 'react';
import PhotoCard from '../PhotoCard/PhotoCard';
import Header from '../Header/Header';

const PhotoGrid = () => {
    const [imageComponents, setImageComponents] = useState([]);
    const [selectedComponents, setSelectedComponents] = useState([]);
    

    useEffect(() => {
        // Load and create image components dynamically
        const loadImages = async () => {
            const imagePaths = import.meta.glob("../../assets/*");
            const imagePromises = Object.keys(imagePaths).map((imagePath) => imagePaths[imagePath]());
            const imageModules = await Promise.all(imagePromises);

            const imageComponents = imageModules.map((module, index) => (
                <img
                    key={index}
                    src={module.default}
                    alt={`Image ${index + 1}`}
                />
            ));

            setImageComponents(imageComponents);
        };

        loadImages();
    }, []);

    const handleTodeleteSelectedComponents = () => {
        const updatedImageComponents = imageComponents.filter(
            (imageComponent) => !selectedComponents.includes(imageComponent)
        );

        setImageComponents(updatedImageComponents);
        setSelectedComponents([]);
         
        
        // Clear the selected components
    };

    // Callback function to update selected components
    const updateSelectedComponents = (imageComponent) => {
        if (selectedComponents.includes(imageComponent)) {
            // Deselect the component
            setSelectedComponents(selectedComponents.filter(item => item !== imageComponent));
        } else {
            // Select the component
            setSelectedComponents([...selectedComponents, imageComponent]);
        }
        
    };

    return (
        <>
         <Header
         selectedComponents={selectedComponents}
         handleTodeleteSelectedComponents={handleTodeleteSelectedComponents}

         ></Header>
        <div className="grid grid-cols-5 gap-6 container mx-auto mb-10 mt-10 ">
            {
                imageComponents && imageComponents.length > 0 && (
                    <div className="col-span-2 row-span-2 ">
                        <PhotoCard
                            key={0}
                            imageComponent={imageComponents[0]}
                            onSelect={updateSelectedComponents} // Pass the callback function
                        ></PhotoCard>
                    </div>
                )}
            {
                imageComponents.slice(1).map((imageComponent, index) => (
                    <PhotoCard
                        key={index}
                        imageComponent={imageComponent}
                        onSelect={updateSelectedComponents} // Pass the callback function
                    ></PhotoCard>
                ))}
            <div>
                <h2>Selected Components:{selectedComponents.length}</h2>
            </div>
        </div>
        </>
    );
};

export default PhotoGrid;