import React, { useState } from "react";
import Layout from "../../components/Layouts";
import { Row, Col, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import FeedbackReport from "../../components/Reports/FeedbackReport";
import InventoryReport from "../../components/Reports/InventoryReport";
import OrderReport from "../../components/Reports/OrderReport";
import ProductsReport from "../../components/Reports/ProductsReport";
import UserReport from "../../components/Reports/UserReport";
import "./style.css";

export default function Reports(props) {
  const [showReport, setShowReport] = useState("");

  const createPDF = () => {
    // get elements of report data
    var report1 = document.getElementById("report").innerHTML;

    var style = "<style>";
    style =
      style + "table {width: 100%;font: 17px Calibri;} body{font-size:12px}";
    style =
      style +
      "table, th, td {border: solid 1px #DDD;color: black ;border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open("", "", "height=700,width=700");
    win.document.write("<title>Report</title>"); // <title> FOR PDF HEADER.
    win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write("</head>");
    win.document.write(report1);
    // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write("</body></html>");

    setTimeout(function () {
      win.document.close(); // CLOSE THE CURRENT WINDOW.
      win.print();
    }, 6000);
  };

  return (
    <Layout sidebar>
      <Row>
        <Col>
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
        </Col>
        <Col>
          <Button
            size="sm"
            variant="success"
            onClick={() => {
              createPDF();
            }}
          >
            Download Report
          </Button>
        </Col>
      </Row>
      <br></br>
      <Row>
        {showReport && showReport === "feedback" ? (
          <div id="report">
            <FeedbackReport></FeedbackReport>
          </div>
        ) : null}
        {showReport && showReport === "inventory" ? (
          <div id="report">
            <InventoryReport></InventoryReport>
          </div>
        ) : null}
        {showReport && showReport === "order" ? (
          <div id="report">
            <OrderReport></OrderReport>
          </div>
        ) : null}
        {showReport && showReport === "products" ? (
          <div id="report">
            <ProductsReport></ProductsReport>
          </div>
        ) : null}
        {showReport && showReport === "user" ? (
          <div id="report">
            <UserReport></UserReport>
          </div>
        ) : null}
      </Row>
      <br></br>
    </Layout>
  );
}
