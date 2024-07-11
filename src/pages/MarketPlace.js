import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import ItemCard from "../components/card/ItemCard/ItemCard";
import SearchBox from "../components/common/searchBox";
import SetKwd from "../components/searchTag";
import { Breadcrumb } from 'antd';
import { PaginationButtons } from "../components/common/pagination";

const MarketPlace = () => {
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
                        title: 'ALL_ITEM',
                    },
                ]}
            />
            <SetKwd onSearch={handleSearch} />
            <div className="gap-10 p-20 flex flex-wrap justify-center">
                {filteredProducts?.map((item, index) => (
                    <ItemCard key={index} {...item} />
                ))}
            </div>
            <PaginationButtons />
        </>
    );
}

export default MarketPlace;
