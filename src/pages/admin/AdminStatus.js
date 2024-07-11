import Header from "../../components/header";
import React, { useEffect, useState } from "react";
import TableStatus from "../../components/admin/tablestatus";
import { Button } from 'antd';
import { LuRefreshCw } from "react-icons/lu";
import axios from "axios";


function AdminStatus() {
    const [loading, setLoading] = useState(false);
    const [contracts, setContracts] = useState([])
    const [filteredcontracts, setFilteredContracts] = useState([]);

    useEffect(() => {
        fetchContracts()
    }, [])

    useEffect(() => {
        setFilteredContracts(contracts);
    }, [contracts]);

    const fetchContracts = async () => {
        setLoading(true);
        const contracts = await axios.get("/contracts-all");
        setContracts(contracts?.data?.data);
        setLoading(false);
    }
    return (
        <>
            {/* <Header page={"adminscreen"} pagetitle={"管理画面 リクエスター管理 ホーム画面"} /> */}
            <section id="main-section">
                <Button onClick={fetchContracts} className="my-2" icon={<LuRefreshCw />} loading={loading}>リフレッシュ</Button>
                <TableStatus categoryData={contracts} />
            </section>
        </>
    );
}

export default AdminStatus;
