import React, { useRef, useEffect } from "react";

export default function Paypal(props) {
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Burger Freakz Payment",
                amount: {
                  currency_code: "USD",
                  value:
                    Math.round(
                      Number(
                        (props.totalPrice + props.distance * 15 - props.offer) /
                          195
                      ) * 100
                    ) / 100,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          localStorage.setItem("paid", true);
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}

//sb-lzthc6846426@personal.example.com
//|'$6_phM
