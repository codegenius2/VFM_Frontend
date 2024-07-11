import React from 'react';

function ItemCounter({ cartItemId, quantity, onIncrease, onDecrease }) {

    return (
        <div className='flex flex-row gap-2 items-center rounded-2xl bg-gray-50 border'>
            <button className='text-xl rounded-l-2xl py-1 px-3 border bg-gray-100 shadow-md shadow-gray-400 transition duration-300 hover:shadow-none' onClick={() => { onDecrease(cartItemId); }}>-</button>
            <span className='p-2'>{quantity ? quantity : 0}</span>
            <button className='text-xl rounded-r-2xl py-1 px-3 border bg-gray-100 shadow-md shadow-gray-400 transition duration-300 hover:shadow-none' onClick={() => { onIncrease(cartItemId); }}>+</button>
        </div >
    );
}

export default ItemCounter;
