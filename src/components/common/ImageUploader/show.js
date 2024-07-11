import React, { useState } from 'react';
import { RiCameraLine } from 'react-icons/ri';

const ImageShow = ({ img, isBack }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="flex">
            <label
                htmlFor="file-input"
                className={`relative ${isBack ? "" : 'w-32'}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {isBack ? <img
                    className={`h-[300px] w-auto object-cover transition-opacity duration-500`}
                    src={img}
                    alt="wait"
                /> :
                    <img
                        src={img}
                        alt="Upload"
                        className={`w-32 h-32 object-cover shadow-md shadow-gray-400 rounded-full transition-opacity duration-500 `}
                    />}
            </label>
        </div>
    );
}

export default ImageShow;
