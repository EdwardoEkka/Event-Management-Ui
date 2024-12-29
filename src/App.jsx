import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './pages/sign-in-page/signInPage';
import Signup from './pages/sign-up-page/signUpPage';
import ProtectedRoute from './components/protectedRoute';
import RedirectIfAuthenticated from './components/redirectIfAuthenticated';
import HomePage from './pages/home-page/homePage';
import CreateEventForm from './pages/create-event-page/createEvent'
import ListEvent from './pages/list-event-page/listEvent';
import { useSelector } from 'react-redux';
import Navbar from './components/common/navbar';
import NotFound from './components/common/notFound';
import SuperAdmin from './pages/super-admin-page/superAdmin';
import OrganizedEventsPage from './pages/organized-events-page/organizedEventsPage';
import AdminEventApprovalPage from './pages/admin-event-approval-page/adminEventApprovalPage';


function App() {
  const user= useSelector((state)=>state.user.user)
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/create-event"
            element={
              user?.role === 'ORGANIZER' || user?.role === 'ADMIN'? (
                <CreateEventForm />
              ) : (
                <div>You do not have permission to access this page.</div>
              )
            }
          />
          <Route path="/list" element={<ListEvent />} />
          <Route path="/super-admin" element={<SuperAdmin/>}/>
          <Route path="/my-events" element={<OrganizedEventsPage/>}/>
          <Route path="/requests" element={<AdminEventApprovalPage/>}/>
        </Route>

        {/* Public Routes */}
        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <Signup />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/signin"
          element={
            <RedirectIfAuthenticated>
              <Signin />
            </RedirectIfAuthenticated>
          }
        />
         <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
