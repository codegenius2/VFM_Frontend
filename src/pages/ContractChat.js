
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Alert, Select } from 'antd';
import axios from 'axios';
import ChatList from '../components/chatlist';

const { TextArea } = Input;

const ContractMessages = ({ contractId }) => {
    const [form] = Form.useForm();
    const [messages, setMessages] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [loadedMessage, setLoadedMessage] = useState([]);
    const [bufferLength, setBufferLength] = useState(0);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [templates, setTemplates] = useState([
        'Hello, how can I assist you?',
        'Thank you for your message!',
        'I will get back to you shortly.'
    ]);

    const handleTemplateChange = (value) => {
        form.setFieldsValue({ message_text: value });
    };


    useEffect(() => {
        axios.get('/templates')
            .then(response => setTemplates(response?.data?.data))
            .catch(error => console.error(error));
    }, [])

    useEffect(() => {
        console.log(templates);
        setHasMore(messages?.length > page * 5)
        setLoadedMessage(messages?.slice(0, page * 5))
    }, [page, messages, templates])

    // useEffect(() => {
    //     if (unreadMessages?.filter(message => contractId === message?.contract_id).length > 0)
    //         message.info("new message is deliveried!")
    // }, [unreadMessages])

    useEffect(() => {
        fetchMessages();
        fetchUnreadMessages();
        const interval = setInterval(() => {
            fetchMessages();
            fetchUnreadMessages();
        }, 10000);
        setPage(1);
        return () => clearInterval(interval);
    }, [contractId]);

    const fetchMessages = () => {
        axios.get(`/contract-messages/${contractId}`)
            .then(response => setMessages(response.data.messages?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))))
            .catch(error => setError(error.response.data.message))
    };

    const token = localStorage.getItem("token");
    const fetchUnreadMessages = () => {
        axios.get(`/unread-messages`)
            .then(response => {
                setUnreadMessages(response.data.unreadMessages);
            })
            .catch(error => setError(error.response.data.message));
    };

    const markAsRead = (messageId) => {
        axios.post(`/contract-messages/read/${messageId}`)
            .then(() => {
                setUnreadMessages((prevMessages) =>
                    prevMessages.filter((message) => message.id !== messageId)
                );
            })
            .catch(error => setError(error.response.data.message));
    };

    const onFinish = (values) => {
        axios.post('/contract-messages', { ...values, contract_id: contractId })
            .then(response => {
                fetchMessages();
                form.resetFields();
            })
            .catch(error => setError(error.response.data.message));
    };

    return (
        <div>
            {error && <Alert message={error} type="error" showIcon />}
            {hasMore && (
                <Button onClick={() => setPage(page + 1)} className="w-full my-2">
                    Load More
                </Button>
            )}
            <ChatList data={loadedMessage.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))} markAsRead={markAsRead} unreadMessages={unreadMessages} />
            <Form form={form} onFinish={onFinish} >
                <div className="p-4 bg-gray-200 flex relative">
                    <div className="w-full mx-auto">
                        <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                            <div className="flex flex-col">
                                <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                                </button>
                                <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                            <Form.Item
                                className='w-full mx-4 mt-7'
                                name="message_text"
                                rules={[{ required: true, message: 'Please enter your message' }]}
                            >
                                <TextArea
                                    id="chat"
                                    rows="3"
                                    className="block w-full text-sm  p-2.5 text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="例）はじめまして。これからお取引よろしくお願いします。" />
                            </Form.Item>
                            <Form.Item className='mt-4'>
                                <button type="primary" htmlType="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                    <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                    </svg>
                                </button>
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <Form.Item>
                    <hr className="my-5" />
                    {templates?.length > 0 && <Select Select
                        placeholder="Select a template"
                        onChange={handleTemplateChange}
                    >
                        <Select.Option value="">
                            なし
                        </Select.Option>
                        {templates?.map((template, index) => (

                            <Select.Option key={index} value={template?.content}>
                                {template?.title}
                            </Select.Option>
                        ))}
                    </Select>
                    }
                </Form.Item>

            </Form >
        </div >
    );
};

export default ContractMessages;
