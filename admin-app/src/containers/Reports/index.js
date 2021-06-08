import React, { useState } from "react";
import BarChart from "../../components/BarChart";
import Layout from "../../components/Layouts";
import { Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Reports(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [showReport, setShowReport] = useState(false);

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
      <Row>
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
      {showReport ? <BarChart dates={dates}></BarChart> : null}
    </Layout>
  );
}
