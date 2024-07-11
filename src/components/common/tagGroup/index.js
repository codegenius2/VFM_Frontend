import React from 'react'
import { Tag } from 'antd'
export const TagGroup = ({ tags }) => {
    console.log(tags);
    return (
        <div className="flex items-center justify-start gap-2 w-full flex-wrap m-0 relative left-0 right-0 ml-auto mr-auto my-5">
            {tags.map(item => <Tag key={item.id} closable bordered={false} color="blue">{item}</Tag>)}
        </div >
    )
}
