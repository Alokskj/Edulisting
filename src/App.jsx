import {
  Routes,
  Route,
  Link,
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/pages/Home";
import "./App.css";
import Ads from "./components/pages/Ads";
import Chat from "./components/pages/Chat";
import Create from "./components/pages/Create";
import Profile from "./components/pages/Profile";
import Error404 from "./components/main/Error404";
import Header from "./components/header/Header";
import Listing from "./components/pages/Listing";
import User from "./components/pages/User";
import AllChats from "./components/pages/AllChats";
import Query from "./components/pages/Query";
import Notification from "./components/pages/Notification";
import EditProfile from "./components/pages/EditProfile";
import SimpleBottomNavigation from "./components/header/SimpleBottomNavigation";
import Setting from "./components/pages/Setting";
import Support from "./components/pages/Support";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PrivateRoutes from "./components/utilities/PrivateRoutes";
import { useAuth } from "./components/Contexts/UserContext";
import { useEffect } from "react";
import ErrorPage from "./components/main/ErrorPage";
import { getAndSaveUserToken } from "./components/utilities/getAndSaveUserToken";
import { ChatContextProvider } from "./components/Contexts/ChatContext";
import Listing2 from "./components/pages/Listing2";
import { ListingProvider } from "./components/Contexts/ListingContext";
import ScrollToTop from "./components/utilities/ScrollToTop";
import getUserLocation from "./components/utilities/getUserLocation";
import { AnimatePresence } from "framer-motion";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";

const router = createBrowserRouter([
  {
    path: "*",
    Component: Root,
    errorElement: (
      <>
        
        <Header /> <ErrorPage /> <SimpleBottomNavigation />
      </>
    ),
  },
]);

function App() {
  const { currentUser } = useAuth();
  

  useEffect(() => {
    const disableRightClick = (event) => {
      if (window.innerWidth <= 767) { // You can adjust the threshold as per your requirement
        event.preventDefault();
      }
    };

    
    document.addEventListener('contextmenu', disableRightClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);
  if (currentUser?.uid) {
    getAndSaveUserToken(currentUser.uid);
  } else {
    console.log("user not found");
  }

  return <RouterProvider router={router} />;
}
function Root() {
  return (
    <AnimatePresence mode="wait">
    <AnimatePresence mode="wait">
    <ScrollToTop>
      <ChatContextProvider>
        <ListingProvider>


          <Routes>
            <Route
              element={
                <>
                  {" "}
                  <Header /> <Outlet /> <SimpleBottomNavigation />
                </>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/listings/:id" element={<Listing />} />
              <Route path="/query/:id" element={<Query />} />
              <Route path="/notification" element={<Notification />} />

              {/* private routes  */}
              <Route
                element={
                  <>
                    <PrivateRoutes />
                  </>
                }
              >

                <Route path="/allchats" element={<AllChats />} />
                <Route path="/ads" element={<Ads />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              {/* private routes */}

              <Route path="*" element={<Error404 />} />
            </Route>

            <Route
              element={
                <>
                  <PrivateRoutes />
                </>
              }
            >
                <Route path="/sell" element={<Create />} />
              
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/help-and-support" element={<Support />} />
              <Route path="/setting" element={<Setting />} />
            </Route>

            <Route
              element={
                <>
                  <Outlet /> <SimpleBottomNavigation />
                </>
              }
            >

              <Route path="/user/:id" element={<User />} />
            </Route>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            <Route
              path="/edulisting.apk"
              element={<Link to="/edulisting.apk"></Link>}
            />
          </Routes>
        </ListingProvider>
      </ChatContextProvider>
    </ScrollToTop>
    </AnimatePresence>
    </AnimatePresence>
  );
}

export default App;
