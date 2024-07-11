import Header from "../../components/header";
import React, { useEffect, useState } from "react";
import SearchBox from "../../components/common/searchBox";
import { tableData } from '../../constant/table_data';
import { Breadcrumb, Button } from 'antd';
import axios from "axios";
import BankTable from "../../components/admin/bankTable";
import { LuRefreshCw } from "react-icons/lu";

function AdminBank() {
    const [loading, setLoading] = useState(false);
    const [bankInfo, setbankInfo] = useState([]);
    const [filteredBankInfo, setFilteredBankInfo] = useState([]);

    useEffect(() => {
        setFilteredBankInfo(bankInfo);
    }, [bankInfo]);

    useEffect(() => {
        fetchBankInfo()
    }, [])

    const fetchBankInfo = async () => {
        setLoading(true);
        const bankInfo = await axios.get("/bank-info-all");
        setbankInfo(bankInfo?.data?.bankInfo);
        setLoading(false);
    }

    return (
        <>
            <section id="main-section">
                <Button onClick={fetchBankInfo} className="my-2" icon={<LuRefreshCw />} loading={loading}>リフレッシュ</Button>
                <BankTable tableData={filteredBankInfo} refresh={fetchBankInfo} />
            </section>
        </>
    );
}

export default AdminBank;
