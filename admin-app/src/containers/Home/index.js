import React from "react";
import { Jumbotron } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../../components/Layouts";

function Home(props) {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <Layout sidebar>
        <Jumbotron
          className="text-center"
          style={{ margin: "60px", backgroundColor: "#fff" }}
        >
          <h1>Welcome to Admin Dashboard</h1>
          <h2>
            {auth.authenticate ? <div>{auth.user.fullName} </div> : null}{" "}
          </h2>
        </Jumbotron>
      </Layout>
    </div>
  );
}

export default Home;
