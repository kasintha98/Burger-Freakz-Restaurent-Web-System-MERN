import React, { useState } from "react";
import BarChart from "../../components/BarChart";
import Layout from "../../components/Layouts";
import { Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FeedbackReport from "../../components/Reports/FeedbackReport";
import InventoryReport from "../../components/Reports/InventoryReport";
import OrderReport from "../../components/Reports/OrderReport";
import ProductsReport from "../../components/Reports/ProductsReport";
import UserReport from "../../components/Reports/UserReport";
import "./style.css";

export default function Reports(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [showReport, setShowReport] = useState("");

  const getDates = (startDate, endDate) => {
    var dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    setDates(dates);
  };

  return (
    <Layout sidebar>
      {/* <Row>
        <Col sm={4}>
          <Row>
            <div className="text-center">
              <h3>Report Type</h3>
              <br></br>
            </div>
          </Row>
          <Row>
            <select className="form-select" aria-label="Default select example">
              <option selected>Order Prediction Report</option>
              <option value={1}>Income Report</option>
              <option value={2}>Product Ratings Report</option>
            </select>
          </Row>
        </Col>
        <Col sm={4}>
          <Row>
            <div className="text-center">
              <h3>From</h3>
              <br></br>
            </div>
          </Row>
          <Row>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </Row>
        </Col>
        <Col sm={4}>
          <Row>
            <div className="text-center">
              <h3>To</h3>
              <br></br>
            </div>
          </Row>
          <Row>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </Row>
        </Col>
      </Row>
      <br></br>
      <div className="text-center">
        <Button
          onClick={() => {
            getDates(startDate, endDate);
            setShowReport(true);
          }}
        >
          Generate Report
        </Button>
      </div>
      {showReport ? <BarChart dates={dates}></BarChart> : null} */}

      <Row>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            setShowReport(e.target.value);
          }}
        >
          <option selected value={null}>
            Select Report Type
          </option>
          <option value="feedback">Feedbacks Report</option>
          <option value="inventory">Inventory &amp; Purchases Report</option>
          <option value="order">Order Report</option>
          <option value="products">Products &amp; Categories Report</option>
          <option value="user">User Report</option>
        </select>
      </Row>
      <Row>
        {showReport && showReport === "feedback" ? (
          <FeedbackReport></FeedbackReport>
        ) : null}
        {showReport && showReport === "inventory" ? (
          <InventoryReport></InventoryReport>
        ) : null}
        {showReport && showReport === "order" ? (
          <OrderReport></OrderReport>
        ) : null}
        {showReport && showReport === "products" ? (
          <ProductsReport></ProductsReport>
        ) : null}
        {showReport && showReport === "user" ? <UserReport></UserReport> : null}
      </Row>
    </Layout>
  );
}
