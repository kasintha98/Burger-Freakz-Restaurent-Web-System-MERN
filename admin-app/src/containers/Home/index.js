import React from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../../components/Layouts";

function Home(props) {
  return (
    <div>
      <Layout sidebar>
        <Jumbotron
          className="text-center"
          style={{ margin: "60px", backgroundColor: "#fff" }}
        >
          <h1>Welcome to Admin Dashboard</h1>
        </Jumbotron>
      </Layout>
    </div>
  );
}

export default Home;
