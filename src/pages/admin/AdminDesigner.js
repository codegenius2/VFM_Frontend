import Header from "../../components/header";
import React, { useEffect, useState } from "react";
import SearchBox from "../../components/common/searchBox";
import { tableData } from '../../constant/table_data'
import { Breadcrumb, Button } from 'antd';
import axios from "axios";
import CreatorTable from "../../components/admin/creatorTable";
import { LuRefreshCw } from "react-icons/lu";

function Admindesigner() {
    const [creators, setCreators] = useState([])
    const [filteredCreators, setFilteredCreators] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDesign()
    }, [])

    useEffect(() => {
        setFilteredCreators(creators);
    }, [creators]);

    const handleSearch = (searchQuery) => {
        const filtered = creators.filter(creator =>
            creator?.user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCreators(filtered);
    };

    const fetchDesign = async () => {
        setLoading(true);
        const creators = await axios.get("/creators");
        setCreators(creators?.data);
        setLoading(false);
    }



    return (
        <>
            {/* <Header page={"adminscreen"} pagetitle={"管理画面 リクエスター管理 ホーム画面"} /> */}
            <section id="main-section">
                <Button onClick={fetchDesign} className="my-2" icon={<LuRefreshCw />} loading={loading}>リフレッシュ</Button>
                <CreatorTable tableData={filteredCreators} refresh={fetchDesign} />

            </section>
        </>
    );
}

export default Admindesigner;
