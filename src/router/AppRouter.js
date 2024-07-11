import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { withLoading } from '../hocs/withLoading.hoc';
import { useSelector } from 'react-redux';

const Landing = lazy(() => import('../pages'));
const Product = lazy(() => import('../pages/Product'));
const Auth = lazy(() => import('../feature/auth'));
const Cart = lazy(() => import('../feature/cart'));
const Marketplace = lazy(() => import('../pages/MarketPlace'));
const HashtagSearch = lazy(() => import('../pages/HashTagSearch'));
const Progress = lazy(() => import('../pages/contract/Progress'));
const RequesterProfile = lazy(() => import('../pages/requester/RequesterProfile'));
const DesignerProfile = lazy(() => import('../pages/designer/DeisgnerProfile'));
const RequestDesigner = lazy(() => import('../pages/requester/RequestClient'))
const DesignerDashboard = lazy(() => import('../pages/designer/Dashboard'));
const DesignerAccount = lazy(() => import('../pages/designer/Account'));
const ChatRoom = lazy(() => import('../pages/ChattingRoom'));
const ContractChat = lazy(() => import('../pages/ContractChat'));

const CreatorSearch = lazy(() => import('../pages/designer/CreatorSearch'));
const ItemDetail = lazy(() => import('../pages/ItemDetail'));
const DigitalFashion = lazy(() => import('../pages/DigitalFashion'));
const AddShowRoom = lazy(() => import('../pages/designer/AddShowRoom'))
const Error404Page = lazy(() => import('../pages/error/Error404Page'));
const ServerErrorPage = lazy(() => import('../pages/error/ServerErrorPage'));
const AdminSearch = lazy(() => import('../pages/admin/AdminSearch'));
const AdminStatus = lazy(() => import('../pages/admin/AdminStatus'));
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const AdminDesigner = lazy(() => import('../pages/admin/AdminDesigner'));

const Request = lazy(() => import('../pages/requester/Request'));
const RequestSearch = lazy(() => import('../pages/requester/RequestSearch'));
const Requester = lazy(() => import('../pages/requester/Requester'));
const AddRequest = lazy(() => import('../pages/requester/AddRequest'));
const RequesterList = lazy(() => import('../pages/requester/RequestList'));
const RequesterDashboard = lazy(() => import('../pages/requester/Dashboard'));
const RequestPreview = lazy(() => import('../pages/RequestPreview'));
const Forgot = lazy(() => import('../feature/auth/forgot'))
const Payment = lazy(() => import('../components/payment-card'))


const HowToWear = lazy(() => import('../pages/doc/HowToWear'));
const TermsOfService = lazy(() => import('../pages/doc/TermsOfService'));
const PrivacyPolicy = lazy(() => import('../pages/doc/PrivacyPolicy'));
const AboutUs = lazy(() => import('../pages/doc/AboutUs'));
const Inquiry = lazy(() => import('../pages/doc/Inquiry'));
const FAQ = lazy(() => import('../pages/doc/Faq'));
const AdminBank = lazy(() => import('../pages/admin/AdminBank'))
const AdminPayment = lazy(() => import('../pages/admin/AdminPayment'))


const Error404Fallback = withLoading(Error404Page);
const LandingFallback = withLoading(Landing);
const ProductFallback = withLoading(Product);
const AuthFallback = withLoading(Auth);
const CartFallback = withLoading(Cart);
const MarketplaceFallback = withLoading(Marketplace);
const HashtagSearchFallback = withLoading(HashtagSearch);
const CreatorSearchFallback = withLoading(CreatorSearch);
const ProgressFallback = withLoading(Progress);
const RequesterFallback = withLoading(Requester);
const RequestSearchFallback = withLoading(RequestSearch);
const DesignerDashboardFallback = withLoading(DesignerDashboard);
const RequesterDashboardFallback = withLoading(RequesterDashboard);
const RequestPreviewFallback = withLoading(RequestPreview);
const ChatRoomFallback = withLoading(ChatRoom)
const ItemDetailFallback = withLoading(ItemDetail);
const AddRequestFallback = withLoading(AddRequest);
const AddShowRoomFallback = withLoading(AddShowRoom);
const AdminSearchFallback = withLoading(AdminSearch);
const AdminStatusFallback = withLoading(AdminStatus);
const AdminLoginFallback = withLoading(AdminLogin);
const AdminDesignerFallback = withLoading(AdminDesigner);
const HowToWearFallback = withLoading(HowToWear);
const RequestDesignerFallback = withLoading(RequestDesigner);
const TermsOfServiceFallback = withLoading(TermsOfService);
const PrivacyPolicyFallback = withLoading(PrivacyPolicy);
const AboutUsFallback = withLoading(AboutUs);
const InquiryFallback = withLoading(Inquiry);
const FAQFallback = withLoading(FAQ);
const DesignerProfileFallback = withLoading(DesignerProfile);
const DesignerAccountFallback = withLoading(DesignerAccount);
const RequesterProfileFallback = withLoading(RequesterProfile);
const DigitalFashionFallback = withLoading(DigitalFashion);
const ForgotFallback = withLoading(Forgot);
const PaymentFallback = withLoading(Payment);
const AdminBankFallback = withLoading(AdminBank);
const AdminPaymentFallback = withLoading(AdminPayment)

const AppRouter = () => {

    const { user } = useSelector(state => state.user);

    return (
        <Routes>
            <Route path="/" element={<LandingFallback />} />

            {user?.user?.user_type === 'Admin' &&
                <Route path="/admin">
                    <Route path="designer" element={<AdminDesignerFallback />} />
                    <Route path="matching-status" element={<AdminStatusFallback />} />
                    <Route path="login" element={<AdminLoginFallback />} />
                    <Route path="requester" element={<AdminSearchFallback />} />
                    <Route path="bank-info" element={<AdminBankFallback />} />
                    <Route path='payment' element={<AdminPaymentFallback />} />
                </Route>
            }
            <Route path="/designer">
                {user?.user?.user_type === 'Creator' && < Route path="dashboard" element={<DesignerDashboardFallback />} />}
                {user?.user?.user_type === 'Creator' && <Route path="add-show-room" element={<AddShowRoomFallback />} />}
                {user?.user?.user_type === 'Creator' && <Route path="account" element={<DesignerAccountFallback />} />}
                <Route path="profile/:id" element={<DesignerProfileFallback />} />
            </Route>
            <Route path='/requester'>
                {user?.user?.user_type === 'Client' && <Route path="dashboard" element={<RequesterDashboardFallback />} />}
                {user?.user?.user_type === 'Client' && <Route path="add-request" element={<AddRequestFallback />} />}
                <Route path="profile/:id" element={<RequesterProfileFallback />} />
            </Route>

            <Route path="requirement/:id" element={<RequesterFallback />} />
            <Route path="payment" element={<PaymentFallback />} />
            <Route path="contract-chat" element={<ContractChat />} />
            <Route path="di" element={<DigitalFashionFallback />} />
            <Route path="chat/:id" element={<ChatRoomFallback />} />
            <Route path="item-detail" element={<ItemDetailFallback />} />
            <Route path="reques/:id" element={<RequestDesignerFallback />} />
            <Route path="request-preview" element={<RequestPreviewFallback />} />
            <Route path="product/:id" element={<ProductFallback />} />
            <Route path="cart" element={<CartFallback />} />
            <Route path="progress/:id" element={<ProgressFallback />} />
            <Route path="request" element={<RequesterFallback />} />
            <Route path="all-items" element={<MarketplaceFallback />} />
            <Route path="hashtag-search" element={<HashtagSearchFallback />} />
            <Route path="creator-search" element={<CreatorSearchFallback />} />
            <Route path="request-search" element={<RequestSearchFallback />} />
            <Route path="/forgot" element={<ForgotFallback />} />
            <Route path="/auth" element={<AuthFallback />} />
            <Route path="/how-to-wear" element={<HowToWearFallback />} />
            <Route path="/terms-of-service" element={<TermsOfServiceFallback />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyFallback />} />
            <Route path="/about-us" element={<AboutUsFallback />} />
            <Route path="/inquiry" element={<InquiryFallback />} />
            <Route path="/faq" element={<FAQFallback />} />
            <Route path='/*' element={<Error404Fallback />} />

        </Routes>
    );
};

export default AppRouter;
