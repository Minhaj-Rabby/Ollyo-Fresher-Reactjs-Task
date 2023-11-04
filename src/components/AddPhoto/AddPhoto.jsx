import React from 'react';

const AddPhoto = ({ handleAddImage}) => {

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (handleAddImage) {
            handleAddImage(file);
        }
    };

    return (
        <div className="relative border-2 border-dashed border-slate-300 rounded-lg  py-7 flex justify-center items-center">
            <input
                type="file"
                name="images"
                id="images"
                className="absolute  opacity-0 "
                title="Try to upload photos..."
                onChange={handleImageChange}
            />
            <div className="h-full w-full flex flex-col justify-center items-center gap-y-1">
                <img alt="placeholder" fetchpriority="high" decoding="async" data-nimg="1" src="addimage.png" />
                <div className="text-center text-xs">Add Photo</div>
            </div>
        </div>
    );
};

export default AddPhoto;
