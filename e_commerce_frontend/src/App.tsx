import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CustomerRegistration from "./features/auth/CustomerRegistration";
import Home from "./features/home/Home";
import LoginScreen from "./features/auth/LoginScreen";
import SellerRegistrationPage from "./features/seller/SellerRegistrationPage";
import { PageNavigation } from "./utils/PageNavigation";
import SellerHome from "./features/seller/SellerHome";
import AddBike from "./features/seller/AddBike";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/loginScreen" />} />
        <Route path={PageNavigation.LOGIN_SCREEN} element={<LoginScreen />} />
        <Route
          path={PageNavigation.CUSTOMER_REGISTRATION_SCREEN}
          element={<CustomerRegistration />}
        />
        <Route
          path={PageNavigation.SELLER_REGISTRATION_SCREEN}
          element={<SellerRegistrationPage />}
        />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/verify-otp" element={<OtpVerification onVerify={}/>} /> */}
        <Route path={PageNavigation.SELLER_HOME_SCREEN} element={<SellerHome />} />
        <Route path={PageNavigation.ADD_BIKE} element={<AddBike />} />
      </Routes>
    </Router>
  );
}

export default App;
