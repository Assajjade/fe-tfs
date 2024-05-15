import React from "react";
import LoginForm from "../components/LoginForm";
import Organizer from "../components/Organizer";
import { Route, Router, Routes } from "react-router-dom";
import Home, { OrganizerHome } from "../components/Home";
import Volunteer from "../components/pages/Volunteer";
import VolunteerDetail from "../components/pages/VolunteerDetail";
import VolunteerForm from "../components/VolunteerForm";
import Layout from "../components/pages/Layout";
import VolunteerSignUp from "../components/VolunteerSignUp";
import ForgetPassword from "../components/ForgetPassword";
import Blog from "../components/pages/Blog";
import DetailBlog from "../components/pages/blog/BlogDetail";
import CrowdFundingUserView from "../components/CrowdFundingUserView";
import MerchandiseHome from "../components/MerchandiseHome";
import EditMerchandise from "../components/EditMerchandise";
import CreateMerchandise from "../components/CreateMerchandise";
import MerchandiseSectionManage from "../components/MerchandiseSectionManage";
import MerchandiseManage from "../components/MerchandiseManage";
import EditMerchandiseSection from "../components/EditMerchandiseSection";
import CreateMerchandiseSection from "../components/CreateMerchandiseSection";
import ContentDetail from "../components/pages/admin/ContentDetail";
import ContentList from "../components/pages/admin/ContentList";
import UserListCrm from "../components/pages/admin/UserListCrm";
import UserDetailCrm from "../components/pages/admin/UserDetailCrm";
import EditProfile from "../components/EditProfile";
import ViewHistory from "../components/ViewHistory";
import AboutUsPage from "../components/AboutUsPage";
import FormQuestions from "../components/FormQuestion";
const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup/" element={<VolunteerSignUp />} />
        <Route path="/signin/" element={<LoginForm />} />
        {/* <Route path="/crowdfunding/highlighted" element={<HighlightedCrowdFunding/>}/> 
      <Route path="/crowdfunding/writing" element={<CrowdFundingWriting/>}/> */}
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/organizer" element={<Organizer />} />
          <Route path="/volunteer/:language" element={<Volunteer />} />
          <Route
            path="/volunteer/detail/:trip_id"
            element={<VolunteerDetail />}
          />
          <Route
            path="/volunteer/:trip_id/register"
            element={<VolunteerForm />}
          />
          <Route path="/blog/:languange" element={<Blog />} />
          <Route path="/blog/" element={<Blog />} />
          <Route path="/blog/detail/:blog_id" element={<DetailBlog />} />
          <Route path="/blog/detail/" element={<DetailBlog />} />
          <Route path="/merchandise" element={<MerchandiseHome />} />
          <Route path="/merchandise/:id" element={<EditMerchandise />} />
          <Route path="/merchandise/manage" element={<MerchandiseManage />} />
          <Route path="/merchandise/create" element={<CreateMerchandise />} />
          <Route path="/trip/:tripId/questions" element={<FormQuestions/>} />

          <Route
            path="/merchandisesection"
            element={<MerchandiseSectionManage />}
          />
          <Route
            path="/merchandisesection/:id"
            element={<EditMerchandiseSection />}
          />
          <Route
            path="/merchandisesection/create"
            element={<CreateMerchandiseSection />}
          />
          <Route path="/blogmetrics/" element={<ContentList />} />
          <Route path="/blogmetrics/:id" element={<ContentDetail />} />
          <Route path="/usermetrics/" element={<UserListCrm />} />
          <Route path="/usermetrics/:id" element={<UserDetailCrm />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/view-history" element={<ViewHistory />} />
          <Route path="/crowdfunding" element={<CrowdFundingUserView />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
