import React, { useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";
import Layout from "../../components/Layouts";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../actions";

export default function Employee(props) {
  const employees = useSelector((state) => state.employees.employees);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const selectOptionsGender = {
    male: "Male",
    female: "Female",
    other: "Other",
  };

  const selectOptionsRole = {
    user: "Customer",
    admin: "Admin",
    manager: "Manager",
    chef: "Chef",
    deliveryrider: "Delivery Rider",
  };

  const columns = [
    {
      dataField: "firstName",
      text: "First Name",
      filter: textFilter(),
    },
    {
      dataField: "lastName",
      text: "Last Name",
      filter: textFilter(),
    },
    {
      dataField: "role",
      text: "Role",
      formatter: (cell) => selectOptionsRole[cell],
      filter: selectFilter({
        options: selectOptionsRole,
      }),
    },
    {
      dataField: "nic",
      text: "NIC",
      filter: textFilter(),
    },
    {
      dataField: "gender",
      text: "Gender",
      formatter: (cell) => selectOptionsGender[cell],
      filter: selectFilter({
        options: selectOptionsGender,
      }),
    },
    {
      dataField: "email",
      text: "Email",
      filter: textFilter(),
    },
    {
      dataField: "contactNumber",
      text: "Contact Number",
      filter: textFilter(),
    },
    {
      dataField: "address",
      text: "Address",
      filter: textFilter(),
    },
  ];

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className="text-center">
              <h3>Employee Users &amp; Customers</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <BootstrapTable
              keyField="id"
              data={employees}
              columns={columns}
              filter={filterFactory()}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
