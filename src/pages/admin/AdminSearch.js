import Header from "../../components/header";
import React, { useEffect, useState } from "react";
import SearchBox from "../../components/common/searchBox";
import { tableData } from '../../constant/table_data';
import { Breadcrumb, Button } from 'antd';
import ClientTable from "../../components/admin/clientTable";
import axios from "axios";
import { LuRefreshCw } from "react-icons/lu";

function AdminSearch() {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);

    useEffect(() => {
        setFilteredClients(clients);
    }, [clients]);

    useEffect(() => {
        fetchDesign()
    }, [])

    const handleSearch = (searchQuery) => {
        const filtered = clients.filter(client =>
            client?.user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredClients(filtered);
    };

    const fetchDesign = async () => {
        setLoading(true);
        const clients = await axios.get("/clients");
        setClients(clients?.data);
        setLoading(false);
    }

    return (
        <>
            {/* <Header page={"adminscreen"} pagetitle={"管理画面 リクエスター管理 ホーム画面"} /> */}
            <section id="main-section">
                <Button onClick={fetchDesign} className="my-2" icon={<LuRefreshCw />} loading={loading}>リフレッシュ</Button>
                <ClientTable tableData={filteredClients} refresh={fetchDesign} />

            </section>
        </>
    );
}

export default AdminSearch;
