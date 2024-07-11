import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import ItemCard from "../components/card/ItemCard/ItemCard";
import SearchBox from "../components/common/searchBox";
import { PaginationButtons } from "../components/common/pagination";
import SetKwd from '../components/searchTag/index'

function Hashtagsearch() {
    const { products } = useSelector(state => state.common);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const handleSearch = (searchQuery) => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <>
            <Breadcrumb
                className="p-5"
                separator=">"
                items={[
                    {
                        title: 'TOP_PAGE',
                        href: '/'
                    },
                    {
                        title: 'HASH_TAG_SEARCH',
                    },
                ]}
            />
            <SetKwd onSearch={handleSearch} />
            <div className="gap-10 p-20 flex flex-wrap justify-center">

                {filteredProducts?.length ? filteredProducts?.map((item, index) => (
                    <ItemCard key={index} {...item} />
                )) : <div className="h-60 pt-20"> <p className="text-gray text-3xl">No Result</p> </div>}
            </div>
            <PaginationButtons />
        </>
    );
}

export default Hashtagsearch;
