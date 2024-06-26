import React, { Fragment, useEffect, useState } from "react";
import { DashboardCards } from "./component/DashboardCards";
import { useDispatch } from "react-redux";
import { GetAllContacts, GetAllProperty, updateNavigation } from "../redux/features/user/userSlice";
import { toast } from "react-toastify";


const Dashboard = () => {
  const dispatch = useDispatch();
  const [inquiries, setInquiries] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    onLoadFetchData();
  },[])

  const onLoadFetchData = async() =>{
    dispatch(updateNavigation("Dashboard"));
    let resultQ = await dispatch(GetAllProperty());
    if (resultQ.meta.requestStatus === "fulfilled") {
      setProperties(resultQ.payload);
    } else if (resultQ.meta.requestStatus === "rejected") {
      toast.error("Please contact administrator.");
    }

    let resultQ2= await dispatch(GetAllContacts());
    if (resultQ2.meta.requestStatus === "fulfilled") {
      setInquiries(resultQ2.payload);
    } else if (resultQ.meta.requestStatus === "rejected") {
      toast.error("Please contact administrator.");
    }
  }

  return (
    <Fragment>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 justify-center">
        <DashboardCards type={4} title={420} description={"Sales"} />
        <DashboardCards type={3} title={properties?.length} description={"Properties Registered"} />
        <DashboardCards type={1} title={inquiries?.length} description={"Inquiries Registered"} />
      </div>
    </Fragment>
  );
};

export default Dashboard;
