import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CustomerRegistration from "./features/auth/CustomerRegistration.tsx";
import Home from "./features/home/Home";
import LoginScreen from "./features/auth/LoginScreen.tsx";
// import SellerRegistrationPage from "./features/seller/SellerRegistrationPage";
import { PageNavigation } from "./utils/PageNavigation";
import SellerRegistrationPage from "./features/auth/SellerRegistrationPage.tsx";
import SellerHome from "./features/seller/SellerHome.tsx";
// import SellerHome from "./features/seller/SellerHome";
// import AddBike from "./features/seller/AddBike";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={PageNavigation.LOGIN_SCREEN} />} />

        <Route path={PageNavigation.LOGIN_SCREEN} element={<LoginScreen />} />

        <Route
          path={PageNavigation.CUSTOMER_REGISTRATION_SCREEN}
          element={<CustomerRegistration />}
        />

        <Route
          path={PageNavigation.SELLER_REGISTRATION_SCREEN}
          element={<SellerRegistrationPage />}
        />

        <Route path={PageNavigation.SELLER_HOME_SCREEN} element={<SellerHome />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
