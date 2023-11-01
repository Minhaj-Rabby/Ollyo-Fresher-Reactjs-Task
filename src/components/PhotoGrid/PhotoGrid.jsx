import React from 'react';
import { useEffect, useState } from 'react';
import PhotoCard from '../PhotoCard/PhotoCard';

const PhotoGrid = () => {

    const [imageComponents, setImageComponents] = useState([]);


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


    return (
        <div className="grid grid-cols-5 gap-6 container mx-auto mb-10 mt-10 ">
            {
                imageComponents && imageComponents.length > 0 && (
                    <div className="col-span-2 row-span-2 border-2 rounded-md">
                        <img src={imageComponents[0].props.src} alt="" />
                    </div>
                )}
            {
                imageComponents.slice(1).map((imageComponent, index) => (
                   
                    <PhotoCard
                    key={index}
                    imageComponent={imageComponent}
                    ></PhotoCard>
                ))}

        </div>


    );
};

export default PhotoGrid;




