import React, { useState } from "react";
import { Breadcrumb, Badge } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

function FAQ() {
    const [age, setAge] = useState('');
    const { t, i18n } = useTranslation();
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <>
            {/* <Header page={"webscreens"} pagetitle={"FAQ"} /> */}
            <section id="main-section" className="cart-section-main-1 flex">
                <div id="login" className="w-full md:py-20 py-4">
                    <Breadcrumb
                        className="p-5"
                        separator=">"
                        items={[
                            {
                                title: 'TOP PAGE',
                                href: '/'
                            },
                            {
                                title: 'ヘルプとよくある質問',
                            },
                        ]}
                    />
                    <Badge.Ribbon
                        text={t("ヘルプとよくある質問")}
                        color="red"
                        className="mt-4 p-2 px-7 text-xl"
                    >
                    <div className="main-box-howtowear">
                        <div className="w-full">
                            <h5 className="font-bold text-[22px] mb-4">ヘルプとよくある質問をまとめました</h5>
                            <div className="border-b border-gray-500 py-4">
                                <h3 className="font-semibold mb-1 text-[18px]">■VIRTUAL FASHION MALLの登録方法</h3>
                                <p>
                                ・アーティスト（VIRTUAL FASHIONを作成する人）として登録したい方は<Link to="/login" className="text-blue-800 font-bold ml-1">こちらから </Link>
                                </p>
                                <p>
                                ・クライアント（VIRTUAL FASHIONを購入する人）として登録したい方は<Link to="/login" className="text-blue-800 font-bold ml-1">こちらから </Link>
                                </p>
                            </div>
                            <div className="border-b border-gray-500 py-4">
                                <h3 className="font-semibold mb-1 text-[18px]">■VIRTUAL FASHIONの着用方法</h3>
                                <p>
                                ・アーティスト/クライアントともに<Link to="/how-to-wear" className="text-blue-800 font-bold ml-1">こちらをご確認ください </Link>
                                </p>
                            </div>
                            <div className="border-b border-gray-500 py-4">
                                <h3 className="font-semibold mb-1 text-[18px]">■VIRTUAL FASHION MALLへのお問い合わせ</h3>
                                <p>
                                <Link to="/inquiry" className="text-blue-800 font-bold ml-1">こちらをご確認ください </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    </Badge.Ribbon>
                </div>
            </section >
        </>
    );
}

export default FAQ;
