import React from 'react';

const AddPhoto = ({ handleAddImage }) => {

    //Handle the add image
    const handleImageAdd = (e) => {
        const file = e.target.files[0];
        if (handleAddImage) {
            handleAddImage(file);
        }
    };

    //Add Image Div
    return (
        <div className="relative border-2 border-dashed border-slate-300 rounded-lg  py-7 flex justify-center items-center">
            <input
                type="file"
                name="images"
                id="images"
                className="absolute  opacity-0 "
                title="Try to upload photos..."
                onChange={handleImageAdd}
            />
            <div className="h-full w-full flex flex-col justify-center items-center gap-y-1">
                <img alt="Add Photo" fetchpriority="high" decoding="async" data-nimg="1" src="addimage.png" />
                <div className="hidden sm:block text-center text-xs"><p></p>Add Photo</div>
            </div>
        </div>
    );
};

export default AddPhoto;
