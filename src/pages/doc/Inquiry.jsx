import React, { useState } from "react";
import {
    Button,
    Form,
    Breadcrumb,
    Input, Badge, Card
} from 'antd';
import { useTranslation } from 'react-i18next';
import SuccessModal from "../../components/common/modal/success";

function Inquiry() {
    const [age, setAge] = useState('');
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <>
            {/* <Header page={"webscreens"} pagetitle={"INQUIRY"} /> */}
            <section id="main-section" className="cart-section-main-1 flex items-center justify-center">
                <div id="login" className="w-full py-5">
                    <Breadcrumb
                        className="p-5"
                        separator=">"
                        items={[
                            {
                                title: 'TOP PAGE',
                                href: '/'
                            },
                            {
                                title: 'お問い合わせ',
                            },
                        ]}
                    />

                    <Badge.Ribbon text={t("お問い合わせ")} color="red" className="mt-4 p-2 px-7 text-xl" >
                        <Card size="small" >
                            <Form variant="filled" className="max-w-[640px] w-full mx-auto px-4 py-20">
                                <Form.Item label="お名前" name="Input" rules={[{ required: true, message: 'お名前' }]}>
                                    <Input className="p-2 sm:ml-16 sm:w-96" />
                                </Form.Item>
                                <Form.Item label="メールアドレス" name="email" rules={[{ required: true, message: 'メールアドレス' }]}>
                                    <Input className="p-2 sm:ml-3 sm:w-96" />
                                </Form.Item>
                                <Form.Item
                                    label="お問い合わせ内容"
                                    name="TextArea"
                                    rules={[{ required: true, message: 'お問い合わせ内容' }]}
                                >
                                    <Input.TextArea className="p-2 sm:w-96" rows={8} />
                                </Form.Item>
                                <div className="flex items-center justify-center">
                                    <button
                                        class="w-[320px] mx-auto text-md font-normal select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                        onClick={handleOpen}
                                    >
                                        送信する
                                    </button>
                                </div>
                            </Form>
                        </Card>
                         <SuccessModal open={open}
                                onCancel={handleClose}
                                title="お問い合わせ内容が送信されました。"
                            />
                    </Badge.Ribbon>
                </div >
            </section >
        </>
    );
}

export default Inquiry;
