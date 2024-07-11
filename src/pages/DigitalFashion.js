import React from 'react';
import { TagGroup } from "../components/common/tagGroup";
import { Carousel } from 'react-responsive-carousel';
import imageProduct from "../assets/images/image 35.png";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const DigitalFashion = () => {

    return (<div className="grid md:grid-cols-12 grid-row gap-5 mb-10 mt-10">
        <div className="col-span-6 ">
            <Carousel>
                {[imageProduct, imageProduct, imageProduct].map((image, index) => (
                    <div key={index}>
                        <img className="" src={image} alt="product" />
                    </div>
                ))}
            </Carousel>
        </div>
        <div className='grid col-span-6 grid-row gap-2 shadow-sm shadow-gray-400 p-5'>
            <div className='grid grid-cols-6'>
                <div className='col-span-2'>
                    カテゴリー
                </div>
                <div className='col-span-4'>
                    LADIES FASHION DRESS
                </div>
            </div>
            <div className='grid grid-cols-6'>
                <div className='col-span-2'>
                    ハッシュタグ
                </div>
                <div className='col-span-4'>
                    <TagGroup tags={['＃2024-SS', 'First', 'Collection', '#DRESS', '#JAPA']} />
                </div>
            </div>
            <div className='grid grid-cols-6'>
                <div className='col-span-2'>
                    オプション
                </div>
                <div className='col-span-4'>
                    <p className='text-red-500 text-xs'>クライアントから送られてきた各画像・動画に</p>
                    <p className="text-red-500 text-xs">デジタルファッションを合成して納品する1枚当たりの価格</p>
                </div>
            </div>
            <hr />
            <div className='grid grid-cols-6'>
                <div className='col-span-2'>
                    本体価格
                </div>
                <div className='col-span-4'>
                    <p >＄350.00 USD</p>
                </div>
            </div>
            <hr />
            <div className='grid grid-cols-6'>
                <div className='col-span-2'>
                    上半身画像１枚分
                </div>
                <div className='col-span-4'>
                    <p >＄35.00 USD</p>
                </div>
            </div>
            <hr />
            <div className='grid grid-cols-6'>
                <div className='col-span-2'>
                    全身画像１枚分
                </div>
                <div className='col-span-4'>
                    <p >＄35.00 USD</p>
                </div>
            </div>
            <hr />
            <div className='grid grid-cols-6'>
                <div className='col-span-2'>
                    動画５秒分
                </div>
                <div className='col-span-4'>
                    <p >＄35.00 USD</p>
                </div>
            </div>
            <hr />
            <div className='grid grid-cols-6 mb-20'>
                <div className='col-span-2'>
                    動画10秒分
                </div>
                <div className='col-span-4'>
                    <p >＄35.00 USD</p>
                </div>
            </div>
        </div>
    </div>)

}

export default DigitalFashion;