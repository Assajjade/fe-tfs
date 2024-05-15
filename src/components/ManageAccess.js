import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Business, Report } from "@mui/icons-material"; // Import icons for each card
import { IoAirplane } from "react-icons/io5";

const ManageAccess = () => {
  return (
    <div className="flex flex-col mt-7">
      <div>
        <h2  style={{ fontFamily: 'Nunito', fontWeight: 'bold' }} className="text-5xl">manage organizer access here</h2>
      </div>
      <div className="flex gap-10 items-center justify-center h-full mt-10">

        <Card variant="outlined" className="shadow-xl ">
          <CardContent className="flex flex-col items-center bg-blue-200">
            <IoAirplane className="text-3xl " />
            <Typography variant="h6" component="div"  style={{ fontFamily: 'Nunito', fontWeight: 'bold' }}>
              Content Writer
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/admin/content-writer/`}
            >
              Manage Content Writers
            </Button>
          </CardContent>
        </Card>

        {/* Island Organizer Card */}
        <Card variant="outlined" className="shadow-xl">
          <CardContent className="bg-blue-200">
            <Business fontSize="large" />
            <Typography variant="h6" component="div" fontWeight="bold"  style={{ fontFamily: 'Nunito', fontWeight: 'bold' }}>
              Island Organizer
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/admin/island-organizer/`}
            >
              Manage Island Organizers
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageAccess;
