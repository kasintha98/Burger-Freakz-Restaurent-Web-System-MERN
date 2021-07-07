import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts";
import { Table, Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../actions";

export default function Employee(props) {
  const employees = useSelector((state) => state.employees.employees);

  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const renderEmployees = (emp) => {
    return (
      <tbody>
        {emp.map((employee) => (
          <tr>
            {filter === "all" ? (
              <>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.role}</td>
                <td>{employee.nic}</td>
                <td>{employee.gender}</td>
                <td>{employee.email}</td>
                <td>{employee.contactNumber}</td>
                <td>{employee.address}</td>
              </>
            ) : filter === "employees" && employee.role !== "user" ? (
              <>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.role}</td>
                <td>{employee.nic}</td>
                <td>{employee.gender}</td>
                <td>{employee.email}</td>
                <td>{employee.contactNumber}</td>
                <td>{employee.address}</td>
              </>
            ) : filter === "customers" && employee.role === "user" ? (
              <>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.role}</td>
                <td>{employee.nic}</td>
                <td>{employee.gender}</td>
                <td>{employee.email}</td>
                <td>{employee.contactNumber}</td>
                <td>{employee.address}</td>
              </>
            ) : null}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Employee Users &amp; Customers</h3>
              <Form>
                <Form.Group>
                  <Form.Label>Filter</Form.Label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setFilter(e.target.value);
                    }}
                  >
                    <option value="all">All</option>
                    <option value="employees">Employees</option>
                    <option value="customers">Customers</option>
                  </select>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Table responsive>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>NIC</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                </tr>
              </thead>
              {renderEmployees(employees)}
            </Table>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
