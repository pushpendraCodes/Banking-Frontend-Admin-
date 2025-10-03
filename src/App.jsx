import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./modules/dashboard/Dashboard";
import Layout from "./component/Layout";
import CoustomerList from "./modules/coustomer/CoustomerList";
import AddCustomer from "./modules/coustomer/AddCustomer";
import ViewEditCoustomer from "./modules/coustomer/ViewEditCoustomer";
import AgentList from "./modules/agent/AgentList";
import AddAgent from "./modules/agent/AddAgent";
import ViewEditAgent from "./modules/agent/ViewEditAgent";
import ManagerList from "./modules/manager/ManagerList";
import AddManager from "./modules/manager/AddManager";
import ViewEditManager from "./modules/manager/ViewEditManager";
import PaymentHistory from "./modules/payments/PaymentHistory";
import ViewPayment from "./modules/payments/ViewPayment";
import WithdrawalHistory from "./modules/withdrawals/WithdrawalHistory";
import GalleryList from "./modules/gallery/GalleryList";
import AddGallery from "./modules/gallery/AddGallery";
import UpdateGallery from "./modules/gallery/UpdateGallery";
import Banners from "./modules/banner/Banners";
import AddBanner from "./modules/banner/AddBanner";
import UpdateBanner from "./modules/banner/UpdateBanner";
import Settings from "./modules/settings/Settings";
import ApplicationsList from "./modules/settings/ApplicationList";
import AddApplicationForm from "./modules/settings/AddApplicationsForm";
import AddCareer from "./modules/settings/AddCareer";
import CareerList from "./modules/settings/CareerList";
import LoginPage from "./modules/login/LoginPage";
import LegalDocuments from "./modules/settings/LegalDocuments";
import LegalDocumentsAdd from "./modules/settings/LegalDocumentsAdd";
import ProfilePage from "./modules/settings/ProfilePage";
import ViewDetails from "./modules/coustomer/ViewDetails";
import PaymentDetails from "./modules/coustomer/PaymentDetails";
import ViewAgent from "./modules/agent/ViewAgent";
import ViewManager from "./modules/manager/ViewManager";
import ResetPassword from "./modules/login/ResetPassword";
import ForgotOtpSend from "./modules/login/ForgotOtpSend";
import VerifyOtp from "./modules/login/VerifyOtp";

import ProtectedRoute from "./modules/login/ProtectedRoute"; // ✅
import Schems from "./modules/settings/Schems";
import AddScheme from "./modules/settings/AddScheme";
import EditScheme from "./modules/settings/EditScheme";
import AboutUsUpdateForm from "./modules/settings/AboutUsUpdateForm";
import Faq from "./modules/settings/Faq";
import AreaManagerList from "./modules/areaManager/AreaManagerList";
import AddAreaManager from "./modules/areaManager/AddAreaManager";
import EditAreaManager from "./modules/areaManager/EditAreaManager";
import ViewAreaManager from "./modules/areaManager/ViewAreaManager";

import CreateRDForm from "./modules/coustomer/CreateRDForm";
import CreateFDForm from "./modules/coustomer/CreateFDForm";
import CreateLoan from "./modules/coustomer/CreateLoan";
import CreatePigmyForm from "./modules/coustomer/CreatePigmyForm";
import CreateLakhpatiSchem from "./modules/coustomer/CrateLakhpatiSchem";
import CreateMipForm from "./modules/coustomer/CreateMipForm";
// import ViewAreaManager from "./modules/areaManager/ViewAreaManager.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
           
              <LoginPage />
           
          }
        />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        <Route path="/send-otp" element={<ForgotOtpSend />} />
        <Route path="/otp-verify/:email" element={<VerifyOtp />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <CoustomerList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/coustomers"
          element={
            <ProtectedRoute>
              <Layout>
                <CoustomerList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddCustomer />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewEditCoustomer />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/view/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewDetails />
              </Layout>
            </ProtectedRoute>
          }
        />


   <Route
            path="/create-fd/:customerId/:savingAc"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateFDForm/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-rd/:customerId/:savingAc"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateRDForm/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-loan/:customerId"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateLoan/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-mip/:customerId/:savingAc"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateMipForm/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-lakhpati/:customerId/:savingAc"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateLakhpatiSchem/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-pigmy/:customerId/:savingAc"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreatePigmyForm/>
                </Layout>
              </ProtectedRoute>
            }
          />

        <Route
          path="/coustomers/paymentdetails/:customerId/:schemeType"
          element={
            <ProtectedRoute>
              <Layout>
                <PaymentDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent"
          element={
            <ProtectedRoute>
              <Layout>
                <AgentList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddAgent />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent/View-Edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewEditAgent />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent/view/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewAgent />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/managers"
          element={
            <ProtectedRoute>
              <Layout>
                <ManagerList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/managers/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddManager />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/managers/view-edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewEditManager />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/managers/view/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewManager />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/area-manager"
          element={
            <ProtectedRoute>
              <Layout>
                <AreaManagerList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/area-manager/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddAreaManager />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/area-manager/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditAreaManager/>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/area-manager/view/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewAreaManager />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments-history"
          element={
            <ProtectedRoute>
              <Layout>
                <PaymentHistory />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments/view/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ViewPayment />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/withdrawalhistory"
          element={
            <ProtectedRoute>
              <Layout>
                <WithdrawalHistory />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/gallary"
          element={
            <ProtectedRoute>
              <Layout>
                <GalleryList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/gallary/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddGallery />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/gallary/update/:id/:itemId"
          element={
            <ProtectedRoute>
              <Layout>
                <UpdateGallery />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/banners"
          element={
            <ProtectedRoute>
              <Layout>
                <Banners />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/banner/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddBanner />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/banner/update/:id/:itemId"
          element={
            <ProtectedRoute>
              <Layout>
                <UpdateBanner />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/forms/:type"
          element={
            <ProtectedRoute>
              <Layout>
                <ApplicationsList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/forms/add/:type"
          element={
            <ProtectedRoute>
              <Layout>
                <AddApplicationForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/add-career"
          element={
            <ProtectedRoute>
              <Layout>
                <AddCareer />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/add-career/:itemId"
          element={
            <ProtectedRoute>
              <Layout>
                <AddCareer />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/recruitment"
          element={
            <ProtectedRoute>
              <Layout>
                <CareerList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/forms/legal"
          element={
            <ProtectedRoute>
              <Layout>
                <LegalDocuments />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/forms/schemes"
          element={
            <ProtectedRoute>
              <Layout>
                <Schems />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/forms/schemes/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddScheme />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/forms/schemes/update/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditScheme />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/aboutUs"
          element={
            <ProtectedRoute>
              <Layout>
                <AboutUsUpdateForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/faq"
          element={
            <ProtectedRoute>
              <Layout>
                <Faq />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/forms/legal/add"
          element={
            <ProtectedRoute>
              <Layout>
                <LegalDocumentsAdd />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/profilepage"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
