// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";

// const SetKwd = () => {
//   const [fakeButtons, setFakeButtons] = useState([]);
//   const [selectedResults, setSelectedResults] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [showList, setShowList] = useState(false);
//   const [selectedItem, setSelectedItem] = useState("");
//   const [options, setOption] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);

//   const navigate = useNavigate();

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       const keywords = inputValue.split(",").filter(Boolean);
//       const buttons = keywords
//         .map((keyword) => {
//           const fakeButtons = [];
//           for (let i = 1; i <= 5; i++) {
//             fakeButtons.push(`${keyword}${i}`);
//           }
//           return fakeButtons;
//         })
//         .flat();
//       setFakeButtons(buttons);
//       setSelectedResults([]);
//       setShowList(false);
//     }
//   };

//   const handleResultClick = (result) => {
//     setSelectedResults((prevSelectedResults) => {
//       if (prevSelectedResults.includes(result)) {
//         return prevSelectedResults.filter((r) => r !== result);
//       } else {
//         return [...prevSelectedResults, result];
//       }
//     });
//   };
//   const runProcess = (result) => {
//     if (selectedResults.length > 2) {
//       navigate("/artgen/progress", { state: { selectedResults } });
//     } else {
//       window.alert("Please select the keywords");
//     }
//   };

//   // const options = ["Option 1", "Option 2", "Option 3"];
//   const apiUrl = process.env.REACT_APP_API_URL;

//   const handleChange = async (e) => {
//     setInputValue(e.target.value);
//     setShowList(e.target.value !== "");
//     const inputValue = e.target.value;

//     if (inputValue.length > 2) {
//       try {
//         const response = await axios.get('/autosuggest',
//           {
//             params: {
//               q: inputValue,
//               client: "chrome", // or 'chrome', 'toolbar', 'youtube', etc.
//             },
//           }
//         );
//         setOption(response.data[1])
//         setSuggestions(response.data[1]);
//       } catch (error) {
//         console.error("Error fetching suggestions:", error);
//         setSuggestions([]);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSelectItem = (item) => {
//     setSelectedItem(item);
//     setInputValue(item);
//     setShowList(false);
//   };

//   const handleCloseButton = () => {
//     setInputValue("");
//     setShowList(false);
//   };

//   return (
//     <div className="relative flex flex-col flex-1 justify-between items-start px-40">
//       <div className="py-2 font text-[calc(2vmin)] text-[#014361] rounded-md mt-10 mb-8">
//         <div className="w-full">
//           <TextField
//             variant="outlined"
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             placeholder="キーワードを検索してください"
//             value={inputValue}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <InputAdornment
//                   position="end"
//                   style={{
//                     cursor: "pointer",
//                     visibility: inputValue ? "visible" : "hidden",
//                   }}
//                 >
//                   <CloseIcon
//                     onClick={handleCloseButton}
//                     style={{ cursor: "pointer" }}
//                   />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           {showList && (
//             <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full z-10">
//               {options.map((option, index) => (
//                 <li
//                   key={index}
//                   className="cursor-pointer py-1 px-3 text-gray-800 hover:bg-gray-200"
//                   onClick={() => handleSelectItem(option)}
//                 >
//                   {option}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SetKwd;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input, List, Button } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

const SetKwd = ({ onSearch }) => {
  const [fakeButtons, setFakeButtons] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [options, setOptions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const keywords = inputValue.split(',').filter(Boolean);
      const buttons = keywords
        .map((keyword) => {
          const fakeButtons = [];
          for (let i = 1; i <= 5; i++) {
            fakeButtons.push(`${keyword}${i}`);
          }
          return fakeButtons;
        })
        .flat();
      setFakeButtons(buttons);
      setSelectedResults([]);
      setShowList(false);
    }
  };

  const handleChange = async (e) => {
    onSearch(e.target.value)
    setInputValue(e.target.value);
    setShowList(e.target.value !== '');
    const inputValue = e.target.value;

    if (inputValue.length > 2) {
      try {
        const response = await axios.get('/autosuggest', {
          params: {
            q: inputValue,
            client: 'chrome', // or 'chrome', 'toolbar', 'youtube', etc.
          },
        });
        setOptions(response.data[1]);
        setSuggestions(response.data[1]);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setInputValue(item);
    setShowList(false);
    onSearch(item)
  };

  const handleCloseButton = () => {
    setInputValue('');
    setShowList(false);
  };

  return (
    <div className="relative flex flex-col flex-1 justify-between items-start px-20 my-4">
      <div className="w-full">
        <Input
          className="w-full rounded-full p-3"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="キーワードを検索してください"
          value={inputValue}
          prefix={<SearchOutlined className="ml-2 w-5 h-5" />}
          suffix={
            inputValue ? (
              <CloseOutlined onClick={handleCloseButton} style={{ cursor: 'pointer' }} />
            ) : null
          }
        />
        {showList && (
          <List
            className="absolute border border-gray-300 rounded-md shadow-lg mt-1 w-full z-10 bg-white"
            dataSource={options}
            renderItem={(option) => (
              <List.Item
                className="cursor-pointer text-gray-800 hover:bg-gray-300 p-10"
                onClick={() => handleSelectItem(option)}
              >
                <span className="mx-5">&nbsp;{option}</span>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default SetKwd;
