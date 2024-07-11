import { useTranslation } from "react-i18next";
import { Modal } from 'antd';

const SuccessModal = ({ open, onCancel, title }) => {
    const [t, i18] = useTranslation();
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={<></>}
        >
            <div id="success_tic" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="page-body">
                            <div className="head pb-5">
                                <p className="text-center">{t(title)}</p>
                            </div>
                            <div className="checkmark-circle ml-20">
                                <div className="background"></div>
                                <div className="checkmark draw"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >

    )

}

export default SuccessModal;