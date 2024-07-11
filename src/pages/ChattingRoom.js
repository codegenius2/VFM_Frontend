import React from 'react';
// import ChatBox from '../components/common/chatBox';
import { FaRegCalendarCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { IoContract } from 'react-icons/io5';
import ContractMessages from './ContractChat';
import { useParams } from 'react-router-dom';


const ChattingRoom = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="mt-20">
            {/* <ChatBox recipient_id={1} /> */}
            <ContractMessages contractId={id} />
            <div className="flex items-center justify-center mt-5">
                <Button type="primary" className='py-6 px-10' icon={<FaRegCalendarCheck className="w-5 h-5" />} onClick={() => { navigate('/progress') }} >
                    契約する。
                </Button>
            </div>
        </div>
    )


}

export default ChattingRoom