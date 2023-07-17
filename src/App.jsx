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
import ErrorPage from "./components/main/ErrorPage"
import { getNotificationPermission } from "./components/utilities/getNotificationPermission"
import { ChatContextProvider } from "./components/Contexts/ChatContext"
import Listing2 from "./components/pages/Listing2"
const router = createBrowserRouter([
  { path: "*", Component: Root , errorElement: <> <Header /> <ErrorPage /> <SimpleBottomNavigation /></>},
]);

function App() {
  const {currentUser} = useAuth()

  useEffect(() => {
    // Add event listener for beforeunload event
    const handleUnload =async () => {
      // Update user's online status to false when they close the tab
      if(currentUser.uid){
      console.log('set user status to offline')
      await updateDoc(doc(db, 'users', currentUser.uid), {
        isOnline: false,
      });}
    };
    

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);
    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
     window.addEventListener('pagehide', handleUnload);

      handleUnload()
    };
  }, []);
  return (
    <RouterProvider router={router}/>
  )
}

function Root() {
  return (
    
      <ChatContextProvider>
    <Routes>
      
      <Route element={<> <Header /> <Outlet /> <SimpleBottomNavigation /></>}>
      <Route path="/" element={ <Home/> } />
      <Route path="/listings/:id" element={ <Listing /> } />
      <Route path="/listings2" element={ <Listing2 /> } />
       
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
      </ChatContextProvider>
  );
}


export default App
