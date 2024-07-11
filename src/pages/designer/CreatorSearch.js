import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { PaginationButtons } from "../../components/common/pagination";
import SetKwd from "../../components/searchTag";
import { useSelector } from "react-redux";


function Creatorsearch() {
    const navigate = useNavigate();
    const { creators } = useSelector(state => state.common)
    const [filteredCreators, setFilteredCreators] = useState([]);

    useEffect(() => {
        setFilteredCreators(creators);
    }, [creators]);

    const handleSearch = (searchQuery) => {
        const filtered = creators.filter(creator =>
            creator?.user?.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCreators(filtered);
    };
    return (
        <>
            {/* <Header /> */}
            <section id="main-section">
                <div className="py-12">
                    <Breadcrumb
                        className="p-5"
                        separator=">"
                        items={[
                            {
                                title: 'TOP_PAGE',
                                href: '/'
                            },
                            {
                                title: 'CREATEER_SEARCH',
                            },
                        ]}
                    />

                    <div className="border border-gray-500 py-[50px]">
                        <p className="text-[15px] mb-3">CREATEER SEARCH</p>
                        <div className="text-center">
                            <SetKwd onSearch={handleSearch} />
                            <div className="flex items-center justify-center gap-2 w-2/5 flex-wrap m-0 relative left-0 right-0 ml-auto mr-auto">
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 cart-bar">
                        <p>#CREATER</p>
                    </div>
                    <div className="mt-16 flex items-center gap-7 flex-wrap justify-center bg-gray-100 p-10">
                        {filteredCreators.length ? filteredCreators?.map((creator, index) => (
                            <div key={index} onClick={() => { navigate("/designer/profile/" + creator?.id) }} id="card" className="w-52 shadow-md shadow-gray-600 bg-white">
                                <div className="relative">
                                    <img className="w-full h-44" src={creator?.user?.background_image} alt="main" />
                                    <p className="absolute top-2 left-4 bg-gray-700 text-white font-bold rounded-lg px-10 py-[1px]">CREATER</p>
                                    <p className="bg-blue-800 text-white absolute rounded-lg text-xs top-9 left-4 px-3 py-1">案件依頼中</p>
                                </div>
                                <img className="w-20 h-20 rounded-full shadow-md shadow-gray-600 mt-[-40px] ml-16 absolute" src={creator?.user?.avatar} alt="user" />
                                <h1 className="pt-16 text-center text-[15px] font-bold">{creator?.user?.username}</h1>
                                <p className="pb-2 pt-5 text-center text-[7px] font-semibold">{creator?.user?.bio}</p>
                            </div>
                        )) : <div className="h-60 pt-20"> <p className="text-white text-3xl">No Result</p> </div>}
                    </div>
                </div>
                <PaginationButtons />
                {/* <div id="pagination" className="pagination-section mb-10">
                    <button className="pagination-jp-btn px-4 py-2">最初へ</button>
                    <button className="pagination-jp-btn"><ChevronLeftIcon /></button>
                    <button className="pagination-jp-btn px-4 py-2">1</button>
                    <button className="pagination-jp-btn"><ChevronRightIcon /></button>
                    <button className="pagination-jp-btn px-4 py-2">最後へ</button>
                </div> */}
            </section>
        </>
    );
}

export default Creatorsearch;
