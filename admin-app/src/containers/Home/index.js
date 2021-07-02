import React, { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../../components/Layouts";

function Home(props) {
  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);

  let orderNumbers = 0;

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
          {order.orders.map((orderItem, index) => (
            <div>
              {orderItem.orderStatus.map((status) => (
                <div>
                  <p>
                    {status.isCompleted && status.type === "delivered"
                      ? ` Number Of Completed Orders: ${(orderNumbers =
                          orderNumbers + 1)}`
                      : null}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </Jumbotron>
      </Layout>
    </div>
  );
}

export default Home;
