import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './modules/dashboard/Dashboard';
import Layout from './component/Layout';
import CoustomerList from './modules/coustomer/CoustomerList';
import AddCustomer from './modules/coustomer/AddCustomer';
import ViewEditCoustomer from './modules/coustomer/ViewEditCoustomer';
import AgentList from './modules/agent/AgentList';
import AddAgent from './modules/agent/AddAgent';
import ViewEditAgent from './modules/agent/ViewEditAgent';
import ManagerList from './modules/manager/ManagerList';
import AddManager from './modules/manager/AddManager';
import ViewEditManager from './modules/manager/ViewEditManager';
import PaymentHistory from './modules/payments/PaymentHistory';
import ViewPayment from './modules/payments/ViewPayment';
import WithdrawalHistory from './modules/withdrawals/WithdrawalHistory';
import GalleryList from './modules/gallery/GalleryList';
import AddGallery from './modules/gallery/AddGallery';
import UpdateGallery from './modules/gallery/UpdateGallery';
import Banners from './modules/banner/Banners';
import AddBanner from './modules/banner/AddBanner';
import UpdateBanner from './modules/banner/UpdateBanner';
import Settings from './modules/settings/Settings';
import ApplicationsList from './modules/settings/ApplicationList';
import AddApplicationForm from './modules/settings/AddApplicationsForm';
import AddCareer from './modules/settings/AddCareer';
import CareerList from './modules/settings/CareerList';
import LoginPage from './modules/login/LoginPage';
import LegalDocuments from './modules/settings/LegalDocuments';
import LegalDocumentsAdd from './modules/settings/LegalDocumentsAdd';
import ProfilePage from './modules/settings/ProfilePage';
import ViewDetails from './modules/coustomer/ViewDetails';
import PaymentDetails from './modules/coustomer/PaymentDetails';
import ViewAgent from './modules/agent/ViewAgent';
import ViewManager from './modules/manager/ViewManager';

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all admin pages inside Layout */}
        <Route path="/login" element={<Layout>
          <LoginPage />
        </Layout>} />
        <Route path="/" element={<Layout>
          <CoustomerList />
        </Layout>} />
        <Route path="/coustomers" element={<Layout>
          <CoustomerList />
        </Layout>} />
        <Route path="/managers" element={<Layout>
          <ManagerList />
        </Layout>} />
        <Route path="/payments-history" element={<Layout>
          <PaymentHistory />
        </Layout>} />
        <Route path="/withdrawalhistory" element={<Layout>
          <WithdrawalHistory />
        </Layout>} />
        <Route path="/payments-history/:id" element={<Layout>
          <ViewPayment />
        </Layout>} />
        <Route path="/managers/add" element={<Layout>
          <AddManager />
        </Layout>} />
        <Route path="/managers/view-edit/:id" element={<Layout>
          <ViewEditManager />
        </Layout>} />
        <Route path="/managers/view/:id" element={<Layout>
          <ViewManager />
        </Layout>} />
        <Route path="/coustomers/add" element={<Layout>
          <AddCustomer />
        </Layout>} />
        <Route path="/coustomers/View-Edit/:id" element={<Layout>
          <ViewEditCoustomer />
        </Layout>} />
        <Route path="/coustomers/viewdetails/:id" element={<Layout>
          <ViewDetails />
        </Layout>} />
        <Route path="/coustomers/paymentdetails/:customerId/:schemeType" element={<Layout>
          <PaymentDetails />
        </Layout>} />
        <Route path="/agent" element={<Layout>
          <AgentList />
        </Layout>} />
        <Route path="/gallary" element={<Layout>
          <GalleryList />
        </Layout>} />
        <Route path="/banners" element={<Layout>
          <Banners />
        </Layout>} />
        <Route path="/banner/add" element={<Layout>
          <AddBanner />
        </Layout>} />
        <Route path="/banner/update/:id/:itemId" element={<Layout>
          <UpdateBanner />
        </Layout>} />
        <Route path="/gallary/add" element={<Layout>
          <AddGallery />
        </Layout>} />
        <Route path="/gallary/update/:id/:itemId" element={<Layout>
          <UpdateGallery />
        </Layout>} />
        <Route path="/agent/add" element={<Layout>
          <AddAgent />
        </Layout>} />
        <Route path="/agent/View-Edit/:id" element={<Layout>
          <ViewEditAgent />
        </Layout>} />
        <Route path="/agent/view/:id" element={<Layout>
          <ViewAgent />
        </Layout>} />
        <Route path="/settings" element={<Layout>
          <Settings />
        </Layout>} />
        <Route path="/settings/forms/:type" element={<Layout>
          <ApplicationsList />
        </Layout>} />
        <Route path="/settings/forms/add/:type" element={<Layout>
          <AddApplicationForm />
        </Layout>} />
        <Route path="/settings/add-career" element={<Layout>
          <AddCareer />
        </Layout>} />

   <Route path="/settings/add-career/:itemId" element={<Layout>
          <AddCareer />
        </Layout>} />

        <Route path="/settings/recruitment" element={<Layout>
          <CareerList />
        </Layout>} />
        <Route path="/settings/forms/legal" element={<Layout>
          <LegalDocuments />
        </Layout>} />
        <Route path="/settings/forms/legal/add" element={<Layout>
          <LegalDocumentsAdd />
        </Layout>} />
        <Route path="/settings/profilepage" element={<Layout>
          <ProfilePage />
        </Layout>} />

        {/* Add other public routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
