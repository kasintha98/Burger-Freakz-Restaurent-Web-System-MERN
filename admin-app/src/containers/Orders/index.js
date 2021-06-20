import React from "react";
import Layout from "../../components/Layouts";
import { useSelector } from "react-redux";

function Orders(props) {
  const order = useSelector((state) => state.order);

  return <Layout sidebar>Orders</Layout>;
}

export default Orders;
