import { Routes, Route, Link, Outlet, createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './components/pages/Home'
import './App.css'
import Ads from "./components/pages/Ads"
import Chat from "./components/pages/Chat"
import Create from "./components/pages/Create"
import Profile from './components/pages/Profile'
import Error404 from "./components/main/Error404"
import Header from "./components/header/Header"
import Listing from "./components/pages/Listing"
import User from "./components/pages/User"
import AllChats from "./components/pages/AllChats"
import Query from "./components/pages/Query"
import Notification from "./components/pages/Notification"
import EditProfile from "./components/pages/EditProfile"
import SimpleBottomNavigation from "./components/header/SimpleBottomNavigation"
import Setting from "./components/pages/Setting"
import Support from "./components/pages/Support"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import PrivateRoutes from "./components/utilities/PrivateRoutes"
import { useAuth } from "./components/Contexts/UserContext"
import { useEffect } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "./components/utilities/firebase"
const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

function App() {
  const {currentUser} = useAuth()

  useEffect(() => {
    // Add event listener for beforeunload event
    const handleBeforeUnload =async () => {
      // Update user's online status to false when they close the tab
      console.log('set user status to offline')
      await updateDoc(doc(db, 'users', currentUser.uid), {
        isOnline: false,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <RouterProvider router={router} />
  )
}

function Root() {
  return (
    <Routes>
      
      
      <Route element={<> <Header /> <Outlet /> <SimpleBottomNavigation /></>} >
      <Route path="/" element={ <Home/> } />
      <Route path="/listings/:id" element={ <Listing /> } />
       
      {/* private routes  */}
      <Route element={<><PrivateRoutes /></>}>
      <Route path="/allchats" element={ <AllChats /> }/>
      <Route path="/query/:id" element={ <Query /> } />
      <Route path="/notification" element={<Notification />} />
      <Route path="/ads" element={ <Ads /> } />
      <Route path="/profile" element={ <Profile /> } />
      </Route>
      {/* private routes */}

      <Route path="*" element={ <Error404 /> } />
      </Route>
      
      
      <Route element={<><PrivateRoutes /></>}>
      <Route path="/sell" >  
      <Route index element={<Create />} />
      </Route>
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/chat" element={ <Chat /> } />
      <Route path="/help-and-support" element={ <Support /> } />
      <Route path="/setting" element={ <Setting /> } />
      </Route>
      
      <Route element={<><Outlet/> <SimpleBottomNavigation /></>}>
      <Route path="/user/:id" element={ <User /> } />
      </Route >


      


      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />
      
      <Route path="/edulisting.apk" element={ <Link to="/edulisting.apk"></Link> } />
    </Routes>
  );
}


export default App
