import { Route, Routes, Navigate } from "react-router-dom";

import { ForgetPassword } from "pages/ForgotPassword";
import { ResetPassword } from "pages/ResetPassword";
import { Businesses } from "pages/Businesses";
import { BusinessTransactions } from "pages/Businesses/BusinessTransactions";
import { Login } from "pages/Login";
import { CheckMail } from "pages/CheckMail";
import { Dashboard } from "pages/Dashboard/";
import { Transactions } from "pages/Transaction/Transaction";
import { TransactionDetails } from "pages/Transaction/TransactionDetails";
import { Activity } from "pages/Activity/Activity";
import { Setting } from "pages/Settings/Settings";
import { Team } from "pages/Administration/Team/Team";
import { Roles } from "pages/Administration/Roles/Roles";
import Layout from "components/Layout/Layout";
import { useAuthContext } from "context/AuthContext";
import VerifyOtp from "pages/2FA/VerifyOtp";
import { RequestOtp } from "pages/2FA/RequestOtp";

function App() {
  const { isLoggedIn } = useAuthContext();

  const unauthenticatedRoutes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forget" element={<ForgetPassword />} />
      <Route path="/check" element={<CheckMail />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );

  const authenticatedRoute = (
    <Routes>
      <Route path="/request-otp" element={<RequestOtp />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions">
          <Route index element={<Transactions />} />
          <Route path=":id" element={<TransactionDetails />} />
        </Route>
        <Route path="/administration">
          <Route path="team" element={<Team />} />
          <Route path="roles" element={<Roles />} />
        </Route>
        <Route path="/business">
          <Route index element={<Businesses />} />
          <Route path=":id" element={<BusinessTransactions />} />
        </Route>

        <Route path="/activity" element={<Activity />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );

  return isLoggedIn ? authenticatedRoute : unauthenticatedRoutes;
}

export default App;
