import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import GuestLayout from './components/guestLayout/GuestLayout';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import Home from './components/guestLayout/Home';
import Register from './components/guestLayout/Register';
import Login from './components/guestLayout/Login';
import About from './components/guestLayout/About';
import AdminLayout from './components/adminLayout/AdminLayout';
import EditProfile from './components/guestLayout/EditProfile';
import ChangePassword from './components/guestLayout/ChangePassword';
import Dashboard from './components/adminLayout/DashBoard';
import Categories from './components/adminLayout/Categories';
import Notifications from './components/adminLayout/Notifications';
import UserLayout from './components/userLayout/UserLayout';
import UserCategories from './components/userLayout/UserCategories';
import UserNotifications from './components/userLayout/UserNotifications';
import TechExpertRegistration from './components/guestLayout/TechExpertRegistration';
import AdminLogin from './components/guestLayout/AdminLogin';
import TechExpertLogin from './components/guestLayout/TechExpertLogin';
import AdminForgotPassword from './components/adminLayout/AdminForgotPassword';
import TechForgotPassword from './components/TehExpertLayout/TechForgotPassword';
import UserForgotPassword from './components/userLayout/UserForgotPassword';
import Technologies from './components/adminLayout/Technologies';
import ErrorTypes from './components/adminLayout/ErrorTypes';
import TechExpertsList from './components/TehExpertLayout/TechExpertsList';
import TechExpertLayout from './components/TehExpertLayout/TechExpertLayout';
import Answers from './components/TehExpertLayout/Answers';
import ViewAnswers from './components/TehExpertLayout/ViewAnswers';
import CodeStack from './components/guestLayout/CodeStack';
import TechExpertEditProfile from './components/TehExpertLayout/TechExpertEditProfile';
import TechExpertChangePassword from './components/TehExpertLayout/TechExpertChangePassword';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/guestLayout/user' element={<Register />} />
          <Route path='/guestLayout/techExpert' element={<TechExpertRegistration />} />

          <Route path='/guestLayout/UserLogin' element={<Login />} />
          <Route path='/guestLayout/adminlogin' element={<AdminLogin />} />
          <Route path='/guestLayout/techExpertLogin' element={<TechExpertLogin />} />
          <Route path='/adminForgotPassword' element={<AdminForgotPassword />} />
          <Route path='/techExpertForgotPassword' element={<TechForgotPassword />} />
          <Route path='/forgotPassword' element={<UserForgotPassword />} />
          <Route path='codeStack' element={<CodeStack />} />
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          {/* <Route index element={<Navigate to="/admin/dashboard" />} /> */}
          {/* <Route path='/admin/dashboard' element={<Dashboard />} /> */}
          <Route path='/admin/notifications' element={<Notifications />} />
          <Route path='/admin/edit-profile' element={<EditProfile />} />
          <Route path='/admin/change-password' element={<ChangePassword />} />

          <Route path='/admin/technologies' element={<Technologies />} />
          <Route path='/admin/errorTypes' element={<ErrorTypes />} />
          <Route path='/admin/techExperts' element={<TechExpertsList />} />

          {/* 
          <Route path='/admin/categories' element={<Categories />} />
          <Route path='/admin/notifications' element={<Notifications />} /> */}
        </Route>

        <Route path='/user' element={<UserLayout />}>
          <Route index element={<Navigate to="/user/dashboard" />} />
          <Route path='/user/dashboard' element={<Dashboard />} />
          <Route path='/user/categories' element={<UserCategories />} />
          <Route path='/user/notifications' element={<UserNotifications />} />
        </Route>

        <Route path='/techExpert' element={<TechExpertLayout />}>
          <Route path='/techExpert/addAnswers' element={<Answers />} />
          <Route path='/techExpert/viewAnswers' element={<ViewAnswers />} />
          <Route path='/techExpert/notifications' element={<UserNotifications />} />
          <Route path='/techExpert/edit-profile' element={<TechExpertEditProfile />} />
          <Route path='/techExpert/change-password' element={<TechExpertChangePassword />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
