import React, { useEffect, useState } from "react";
import Trips from "../components/Trips";
import CreateTrips from "../components/CreateTrips";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import EditTrips from "../components/EditTrips";
import DetailTrips from "../components/DetailTrips";
import ShowParticipants from "../components/ShowParticipants";
import FormQuestions from "../components/FormQuestion";
import DetailParticipants from "../components/DetailParticipants";
import EditApplicationStatus from "../components/EditApplicationStatus";
import Admin from "../components/pages/Admin";
import IslandOrganizer from "../components/pages/admin/IslandOrganizer";
import ContentWriter from "../components/pages/admin/ContentWriter";
import CommentReport from "../components/pages/admin/CommentReport";
import OrganizerHome from "../components/OrganizerHome";
import FundingLandingPage from "../components/FundingLandingPage";
import HighlightedFunding from "../components/HighlightedFunding";
import FundingWritingPage from "../components/FundingWritingPage";
import CrowdFundingAdmin from "../components/CrowdFundingAdmin";
import BlogList from "../components/pages/organizer/BlogList";
import BlogDetail from "../components/pages/organizer/BlogDetail";
import BlogCreate from "../components/pages/organizer/BlogCreate";
import BlogEdit from "../components/pages/organizer/BlogEdit";
import ManageHomepage from "../components/homepage/ManageHomepage";
import AdminDashboard from "../components/adminView/AdminDashboard";
import ContentWriterDashboard from "../components/cWView/ContentWriterDashboard";
import AboutUsAdmin from "../components/AboutUsAdmin";
import SidebarIO from "../components/SidebarIO";
import CreateQuestions from "../components/CreateQuestions";
import SidebarCW from "../components/SidebarCW";
import CWSignUp from "../components/pages/admin/CWSignUp";
import IOSignUp from "../components/pages/admin/IOSignUp";
import { useAuth } from "../context/authContext";
import AxiosInstance from "../components/Axios";

const OrganizerRouter = () => {
  const [data, setData] = useState();
  const { currentUser } = useAuth();

  const fetchData = async () => {
    try {
      let responseData = null;
      if (currentUser?.uid) {
        const response = await AxiosInstance.get(
          `user/detail/${currentUser.uid}`
        );
        responseData = response.data;
      }
      console.log(responseData);

      setData(responseData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser?.uid]);

  return (
    <div>
      {/* Conditionally render SidebarIO based on user's role */}
      {/* {data && data.role && data.role.includes("IO") && ( */}
        <SidebarIO
          drawerWidth={220}
          content={
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/admin/island-organizer"
                element={<IslandOrganizer />}
              />
              <Route path="/admin/content-writer" element={<ContentWriter />} />
              <Route path="/admin/comment-report" element={<CommentReport />} />
              <Route
                path="/admin/island-organizer/signup"
                element={<IOSignUp />}
              />
              <Route
              path="/admin/content-writer/signup"
              element={<CWSignUp />}
            />
              <Route path="/fund" element={<FundingLandingPage />} />
              <Route path="/highlighted" element={<HighlightedFunding />} />
              <Route path="/crowdfunding" element={<CrowdFundingAdmin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/cw/dashboard"
                element={<ContentWriterDashboard />}
              />
              <Route path="/about-us" element={<AboutUsAdmin />} />
              <Route path="/homepage/manage" element={<ManageHomepage />} />
              <Route
                path="/cw/dashboard"
                element={<ContentWriterDashboard />}
              />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blog/:blog_id" element={<BlogDetail />} />
              <Route path="/blog/update/:blog_id" element={<BlogEdit />} />
              <Route path="/blog/create" element={<BlogCreate />} />
              <Route path="/organizer" element={<OrganizerHome />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/trips/create" element={<CreateTrips />} />
              <Route path="/edit/:id" element={<EditTrips />} />
              <Route path="/detail/:id" element={<DetailTrips />} />
              <Route
                path="/trips/:id/participants"
                element={<ShowParticipants />}
              />
              <Route
                path="/trips/:id/add-questions/"
                element={<CreateQuestions />}
              />
              <Route
                path="/trips/:tripId/participants/:userId"
                element={<DetailParticipants />}
              />
              <Route
                path="/trips/:tripId/participants/:userId/edit"
                element={<EditApplicationStatus />}
              />
            </Routes>
          }
        />
      {/* )} */}

      {data && data.role && data.role.includes("CW") && (
        <SidebarCW
          drawerWidth={260}
          content={
            <Routes>
              <Route
                path="/cw/dashboard"
                element={<ContentWriterDashboard />}
              />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blog/:blog_id" element={<BlogDetail />} />
              <Route path="/blog/update/:blog_id" element={<BlogEdit />} />
              <Route path="/blog/create" element={<BlogCreate />} />
            </Routes>
          }
        />
      )}

      {data && data.role && data.role.includes("Admin") && (
        <SidebarCW
          drawerWidth={260}
          content={
            <Routes>
              <Route
                path="/cw/dashboard"
                element={<ContentWriterDashboard />}
              />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blog/:blog_id" element={<BlogDetail />} />
              <Route path="/blog/update/:blog_id" element={<BlogEdit />} />
              <Route path="/blog/create" element={<BlogCreate />} />
            </Routes>
          }
        />
      )}
    </div>
  );
};

export default OrganizerRouter;
