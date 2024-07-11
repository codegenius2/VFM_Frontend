import { Breadcrumb } from 'antd';
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Avatar } from "antd";
import { PaginationButtons } from '../../components/common/pagination';
import { useSelector } from 'react-redux';
import SetKwd from '../../components/searchTag';

function Requestsearch() {
    const [age, setAge] = useState('');
    const { t, i18n } = useTranslation();
    const [filteredRequirement, setFilteredRequirement] = useState([]);
    const { requirements } = useSelector(state => state.common);
    const navigate = useNavigate();
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const { clients } = useSelector(state => state.common)

    useEffect(() => {
        setFilteredRequirement(requirements);
        console.log(requirements);
    }, [requirements]);

    const handleSearch = (searchQuery) => {
        const filtered = requirements.filter(requirement =>
            requirement?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRequirement(filtered);
    };

    return (
        <>
            {/* <Header page={"webscreens"} pagetitle={"Client"} /> */}
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
                                title: 'CLIENT_SEARCH',
                            },
                        ]}
                    />

                    <SetKwd onSearch={handleSearch} />
                    <div className="cart-bar w-2/5">
                        <p>#REQUIREMENT </p>
                    </div>
                    <div className="mt-16 flex items-center gap-7.5 flex-wrap justify-center my-5">
                        {filteredRequirement?.map((request, index) => (
                            <div key={index} id="card" onClick={() => { navigate('/requirement/' + request?.id) }} className="cursor-pointer border bg-box rounded-xl border-gray-200 shadow-md shadow-gray-400 w-full flex md:flex-row flex-col justify-between md:px-12 p-3 md:py-6 mt-5" >
                                <div className="relative">
                                    <p className="bg-blue-800 p-2 text-white w-32 rounded-md text-center font-bold text-sm my-2">{request.completed}</p>
                                    <p className="text-badge font-bold text-xl">■REQUEST■ <br />
                                        {request?.title}</p>
                                    <p className="font-semibold text-xl md:text-2xl mt-5">{request.tags.name}</p>
                                    <div className="flex items-center gap-2.5 font-bold text-gray-800 mt-20">
                                        {/* <VFM_Avatar img={request?.client?.avatar} /> */}
                                        <Avatar className="absolute bottom-2 w-12 h-12 rounded-full" src={request?.user?.avatar} alt="user" />
                                        <p className="absolute bottom-4 left-16">{request?.client?.username}</p>
                                    </div>
                                </div>
                                <div className="w-[50%]">
                                    <p>{request?.description}</p>
                                </div>
                                <div className="relative md:p-12 p-2">
                                    <div className=" h-24 border-l-4 border-l-blue-800">
                                        <p className="mb-0 bg-blue-800 p-1 px-5 text-white rounded-md text-center font-bold text-xs-box-btn-tag">REWARD</p>
                                        <h1 className="mt-10 font-extrabold text-xl">{request?.reward}</h1>
                                    </div>
                                    <p className="absolute bottom-0 right-0">掲載日：{request.created_at.slice(0, 10)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-1/3 cart-bar">
                        <p>#CLIENT</p>
                    </div>
                    <div className="mt-16 flex items-center gap-7 flex-wrap justify-center bg-gray-100 p-10">
                        {clients.length ? clients?.map((client, index) => (
                            <div key={index} onClick={() => { navigate("/requester/profile/" + client?.id) }} id="card" className="w-52 shadow-md shadow-gray-600 bg-white">
                                <div className="relative">
                                    <img className="w-full h-44" src={client?.user?.background_image} alt="main" />
                                    <p className="absolute top-2 left-4 bg-gray-700 text-white font-bold rounded-lg px-10 py-[1px]">CLIENT</p>
                                    <p className="bg-blue-800 text-white absolute rounded-lg text-xs top-9 left-4 px-3 py-1">案件依頼中</p>
                                </div>
                                <img className="w-20 h-20 rounded-full shadow-md shadow-gray-600 mt-[-40px] ml-16 absolute" src={client?.user?.avatar} alt="user" />
                                <h1 className="pt-16 text-center text-[15px] font-bold">{client?.user?.username}</h1>
                                <p className="pb-2 pt-5 text-center text-[7px] font-semibold">{client?.user?.bio}</p>
                            </div>
                        )) : <div className="h-60 pt-20"> <p className="text-white text-3xl">No search</p> </div>}
                    </div>
                    <PaginationButtons />
                </div>
            </section>
        </>
    );
}

export default Requestsearch;
