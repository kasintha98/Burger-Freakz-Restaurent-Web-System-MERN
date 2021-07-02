import React, { useEffect } from "react";
import Layout from "../../components/Layouts";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  ButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../actions";

export default function Employee(props) {
  const employees = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const renderEmployees = (emp) => {
    return (
      <tbody>
        {emp.map((employee) => (
          <tr>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.role}</td>
            <td>{employee.nic}</td>
            <td>{employee.gender}</td>
            <td>{employee.email}</td>
            <td>{employee.contactNumber}</td>
            <td>{employee.address}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <Layout sidebar>
      <div className="text-center">
        <h3>Employee Users</h3>
      </div>
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
    </Layout>
  );
}
