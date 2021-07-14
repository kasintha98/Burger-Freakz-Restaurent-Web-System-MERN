import React, { useState } from "react";
import BarChart from "../../components/BarChart";
import Layout from "../../components/Layouts";
import { Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "./style.css";

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
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual and qna
          id: "304dbb8a-452e-4425-b74e-bb3487a5b17f",
          embedUrl:
            "https://app.powerbi.com/reportEmbed?reportId=304dbb8a-452e-4425-b74e-bb3487a5b17f&groupId=6766f4ca-b07a-4089-9f20-12d26ee3cd19&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJjZXJ0aWZpZWRUZWxlbWV0cnlFbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d",
          accessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODRjMzFjYTAtYWMzYi00ZWFlLWFkMTEtNTE5ZDgwMjMzZTZmLyIsImlhdCI6MTYyNjI0NTI5NywibmJmIjoxNjI2MjQ1Mjk3LCJleHAiOjE2MjYyNDkxOTcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFnQ1JxOEtJMDJoT1loM2RwVElEbmh5VW5zdU9FWmVEcDRWUDJiVUIvQkZqSGdwbUU5b0o5a3R5dG5FaFJMdlp4IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImlwYWRkciI6IjEwMy4yNDcuNTEuMTI5IiwibmFtZSI6IktBU0lOVEhBIEtBTEhBUkEiLCJvaWQiOiJhNjA4ZmMwNC1lMGZiLTQwYjYtOGIwZC1hMzcyYjRhYzVlNGEiLCJwdWlkIjoiMTAwMzIwMDEwOUQ4NEFGNyIsInJoIjoiMC5BUVFBb0J6RGhEdXNyazZ0RVZHZGdDTS1idzhCSElkaFhyRlBnNnlZWVFwLWtSQUVBTEEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiWVB6UjlpcFN2YmxtNU5wTF94NVpFMGlfb0ZOSVVnWFM2bTJ1eWVqMzNYZyIsInRpZCI6Ijg0YzMxY2EwLWFjM2ItNGVhZS1hZDExLTUxOWQ4MDIzM2U2ZiIsInVuaXF1ZV9uYW1lIjoiS0FTSU5USEEuS0FMSEFSQUBzdHVkZW50YW1iYXNzYWRvcnMuY29tIiwidXBuIjoiS0FTSU5USEEuS0FMSEFSQUBzdHVkZW50YW1iYXNzYWRvcnMuY29tIiwidXRpIjoiRzA1Nkx5Sm04RXFLTUUwd010REVBZyIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.Wde9p9gwVWo2UIIgniOiqPe6ZXvjhqJU7GfgabeoyE7e7kcsYBNnr9pi9XrmNS6hUdv_4SnxsA7lLEhmmxs9xj-QdNfjywh2kk3XCiCSadPysOrIcUamFA_chk4t8ynxQVz-64aZS-z-cD5CMhus6cp6G7s6IoNc3d06aoIQHtAKMVRKRWgtd9WHKo_O2D4CE3nzNHmE7iOrSiNQBDpDzosHyHUBhsNk_3-I5aI51NHHIsO9C06LBxz-MKJPtqg-xpe8tcu4cslNjYtAmuOhoqmKEfRoWpfjQDLS_cKiqH4r_W30pzxW1xWI0RjzodlkqEm8CV4hTYKZm9FyUspIrQ",
          tokenType: models.TokenType.Aad,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: true,
              },
            },
            //background: models.BackgroundType.Transparent,
          },
        }}
        eventHandlers={
          new Map([
            [
              "loaded",
              function () {
                console.log("Report loaded");
              },
            ],
            [
              "rendered",
              function () {
                console.log("Report rendered");
              },
            ],
            [
              "error",
              function (event) {
                console.log(event.detail);
              },
            ],
          ])
        }
        cssClassName={"Embed-container"}
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport;
        }}
      />
    </Layout>
  );
}
