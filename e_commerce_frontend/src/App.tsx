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
import { PageNavigation } from "./utils/PageNavigation";
import SellerRegistrationPage from "./features/auth/SellerRegistrationPage.tsx";
import Dashboard from "./features/seller/ui/Dashboard.tsx";
import AddBike from "./features/products/ui/AddBike.tsx";


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

        <Route path={PageNavigation.SELLER_DASHBOARD} element={<Dashboard />} />

        {/* <Route path={PageNavigation.ADD_BIKE} element={<AddBike />} /> */}

        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
