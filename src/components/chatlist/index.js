import React from 'react';
import { Avatar, List, Badge } from 'antd';
import ReactEmoji from 'react-emoji';

const ChatList = ({ data, markAsRead, unreadMessages }) => {

    const isUnread = (messageId) => {
        return unreadMessages.some(unread => unread.id === messageId);
    };

    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={data}

            renderItem={(item) => {
                return isUnread(item.id) ?
                    <Badge.Ribbon text="Unread Message" color="red" placement="end">
                        <List.Item
                            onClick={() => markAsRead(item.id)}
                            key={item.title}

                            extra={
                                <p className="text-gray-500 text-xs mt-16">{item?.created_at?.slice(0, 10) + " " + item?.created_at?.slice(11, 16)}</p>

                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar className="w-12 h-12" src={item.sender.avatar} />}
                                title={<a href={item.href}>{item.sender.username}</a>}
                                description={<pre>{ReactEmoji.emojify(item?.message_text)}</pre>}
                            />

                        </List.Item>
                    </Badge.Ribbon>
                    : <List.Item
                        key={item.title}
                        extra={
                            <p className="text-gray-500 text-xs mt-16">{item?.created_at?.slice(0, 10) + " " + item?.created_at?.slice(11, 16)}</p>}>
                        <List.Item.Meta
                            avatar={<Avatar className="w-12 h-12" src={item.sender.avatar} />}
                            title={<a href={item.href}>{item.sender.username}</a>}
                            description={<pre>{ReactEmoji.emojify(item?.message_text)}</pre>}
                        />
                    </List.Item>
            }}
        />
    );
}
export default ChatList;