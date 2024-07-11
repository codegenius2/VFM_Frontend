

// const ChatBox = () => {

//     const [t, i18] = useTranslation();

//     return (<div className="chat-box">
//         <p className="chat-title p-4">{t("Inquiries regarding this product (2)")}</p>
//         <div className="chat-title-1">
//             <p className="p-4">Kaiyo Aoki [ Eclipse of Elegance ] EDY-MADE Fist Collections2024</p>
//         </div>
//         <div className="relative right-0 left-0 w-[60%]">
//             <p>はじめまして。購入希望です 10秒程度の動画と、画像5枚 バストアップ２枚・全身３枚）を希望しています。
//                 納期と金額を教えてください。</p>
//         </div>
//         <div className="left-sms-ui">
//             <div className="chat-user-img">
//                 <VFM_Avatar img={Ellipse2} size={20} name="Kaiyo　Aoki" />
//             </div>
//             <div className="chat-right-sub">
//                 <p className='p-3'>TEST USER001様
//                     お問い合わせいただ、誠にありがとうございます。
//                     金額は以下の通りでござ います。
//                     ドレス代 $400.00 USD
//                     動画
//                     ～５秒 $250.00 USD
//                     ～１０秒 $300.00 USD

//                     画像 各１枚ずつ
//                     上半身   $35.00 USD
//                     全身     $50.00 USD

//                     ご依頼の内容ですと、合計で $890.00USDとなります。
//                     ご依頼について検討いただけますと幸いです。Kaiyo Aoki
//                 </p>
//             </div>
//         </div>
//         <div className="p-5">
//             <p className="text-sm font-bold mt-10 mb-2">{t("Your inquiry will be published on the product page, so please refrain from writing any information that could identify you.")}</p>
//             <Input.TextArea rows={5} className="txt-chat-area" placeholder="例）はじめまして。商品購入を検討しています。商品購入は可能でしょうか？s" />
//             <p className="title-b-message-box">{t("1000 characters left (full-width)")}</p>
//             <button className="chat-send-btn hover:opacity-50 duration-500 shadow-md shadow-gray-500">{t("Send")}</button>
//         </div>
//     </div>)
// }

// export default ChatBox;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd'
import Ellipse2 from "../../../assets/images/Ellipse 2.png";
import VFM_Avatar from "../../../components/common/avatar";
import { RiSendPlaneFill } from "react-icons/ri";
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChatBox = ({ recipient_id }) => {

    const { user } = useSelector(state => state.user);

    const [messages, setMessages] = useState([
        {
            text: "Hello! How can I help you today?", sender: "bot",
            avatar: <VFM_Avatar img={Ellipse2} size={16} />
        },
    ]);
    const [message_text, setMessageText] = useState("");

    const fetchMessages = async () => {
        try {
            const response = await axios.get('/messages/1');
            setMessages(response?.data?.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages(); // Fetch messages initially
        const intervalId = setInterval(() => {
            fetchMessages(); // Fetch messages every 10 seconds
        }, 3000); // 10 seconds in milliseconds

        return () => clearInterval(intervalId);
    }, []);


    const handleSend = async () => {
        if (message_text.trim()) {
            await axios.post("/send-message", { recipient_id, message_text })
            setMessages([...messages, {
                text: message_text, sender: "user", name: "User",
                avatar: <VFM_Avatar img={Ellipse2} size={16} />
            }]);
            setMessageText("");
        }
    };

    return (
        <div className='shadow-lg shadow-gray-400'>
            <div className='w-100 bg-badge text-white text-center p-5'>取引チャット</div>
            <div className="flex flex-col h-full w-xl mx-auto shadow-lg rounded-lg">
                <div className="flex-1 max-h-[500px] md:p-10 p-2 overflow-y-scroll bg-gray-100">
                    {messages.map((message, index) => (
                        <div key={index} className={`mb-5 flex ${message?.sender?.id === user?.user?.id ? "justify-end" : "justify-start"}`}>
                            {message.sender?.id === "2" && (
                                <div className="flex space-x-2 items-start md:flex-row flex-col">
                                    <span className="text-2xl md:pb-4">
                                        <VFM_Avatar img={message?.sender?.avatar} size={16} />
                                    </span>
                                    <div className="flex flex-col mt-3">
                                        <div className="rounded-lg bg-gray-100 text-white p-4 mr-2">

                                            <pre>{message?.message_text}</pre>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {message.sender?.id === user?.user?.id && (
                                <div className="flex space-x-2 items-end md:flex-row  flex-col-reverse">

                                    <div className="flex flex-col mt-3">
                                        <div className="rounded-lg bg-blue-400 text-white p-4 mr-2">
                                            {message?.message_text}
                                        </div>
                                    </div>
                                    <span className="text-2xl md:pb-4">
                                        <VFM_Avatar img={message?.recieve?.avatar} size={16} />
                                    </span>
                                </div>

                            )}
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-gray-200 flex relative">
                    <div className="w-full mx-auto">
                        <label for="chat" className="sr-only">Your message</label>
                        <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                            <div className="flex flex-col">
                                <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                                </button>
                                <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                            <textarea value={message_text}
                                onChange={(e) => setMessageText(e.target.value)} id="chat" rows="3" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="例）はじめまして。これからお取引よろしくお願いします。"></textarea>
                            <button onClick={handleSend} className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ChatBox;
