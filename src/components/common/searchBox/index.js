
import React, { useState } from 'react';
import { BiSearchAlt } from "react-icons/bi";

const SearchBox = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
        setInput(e.target.value);
        onSearch(e.target.value); // Emit search query to parent component
    };

    return (
        <div className="p-4 flex relative bg-gray-50">
            <div className="w-full mx-auto">
                <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        className="block sm:mx-20 mx-2 p-2.5 w-full rounded-full border px-5"
                        placeholder="Search products..."
                    />
                    <BiSearchAlt className="relative sm:right-32 right-12 w-7 h-7" />
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
