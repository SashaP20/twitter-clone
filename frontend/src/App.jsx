import { Routes,Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignupPage from "./pages/auth/signup/SignupPage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";


function App() {
  const {data: authUser,isLoading,error,isError} = useQuery({
    // we use queryKey to give a unique name to our query
    queryKey: ['authUser'],
    queryFn: async () => {
      try{
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if(data.error) return null;
        if(!res.ok){
          throw new Error(data.error || 'Something went wrong');
        }
        console.log("authUser is here: ",data);
        return data;

      } catch(error){
        throw new Error(error);

      }
    },
    retry:false, // retry once
  });

  if(isLoading){
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg"/>
      </div>
    )
  }

  return (
    <div className="flex max-w-6xl">
     {authUser &&  <Sidebar />}
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />


      </Routes>
      <RightPanel/>
      <Toaster />
    </div>
  );
}

export default App
