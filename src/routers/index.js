import { Routes, Route } from "react-router-dom";
import  Home from "../components/Home"; // Corrected import paths
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import Organizer from "../components/Organizer";
import Footer from "../components/Footer";
import '../App.css';
import Sidebar from "../components/Sidebar";
import Trips from "../components/Trips";
import CreateTrips from "../components/CreateTrips";
import DetailTrips from "../components/DetailTrips";
import EditTrips from "../components/EditTrips";
import CreateQuestions from '../components/CreateQuestions';
import ShowParticipants from '../components/ShowParticipants';
export const AppRouter = () => {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/organizer" element={<Organizer />} />
            </Routes>
            <Footer />
        </div>
    );
};


export const OrganizerRouter = () => {
  const myWidth = 220;

  return (
    <div className="App">
       <Sidebar
      drawerWidth={myWidth}
      content={
        <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<CurrentApp />} />
        <Route path="/trips" element={<Trips />} /> 
        <Route path="/trips/:id/add-questions/" element={<CreateQuestions />} /> 
        <Route path="/create/" element={<CreateTrips />} /> 
        <Route path="/edit/:id" element={<EditTrips />} />
        <Route path="/detail/:id" element={<DetailTrips />} />
        <Route path="/trips/:id/participants" element={<ShowParticipants />} />
        <Route path="/trips/:tripId/register/" element={<FormQuestions />} />
        <Route path="/trips/:trip_id/participants/:user_id" element={<DetailParticipants />} />
         */}
      </Routes>
      }
      />
    </div>
  );
};