import React, { useState } from "react";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";
import CurrencyFormat from "react-currency-format";

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);

  const { _id, name, price, img, offer } = props.cartItem;

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) {
      return;
    }
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };

  return (
    <tr className="text-center">
      <td>
        <img
          src={generatePublicUrl(img)}
          alt="pic"
          width="100px"
          height="100px"
        />
      </td>
      <td>
        {name}
        <br></br>
        <br></br>
        <button className="btn btn-success">Save For Later</button>
        <button
          className="btn btn-danger"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </td>
      <td>
        <CurrencyFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rs. "}
          suffix={".00"}
        />
      </td>
      <td className="form-row justify-content-center">
        {/* qty control */}
        <div class="form-group col-md-7">
          <div className="input-group mx-auto mb-3">
            <span className="input-group-text">
              <button onClick={onQuantityDecrement} class="btn btn-primary">
                <i className="fa fa-minus"></i>
              </button>
            </span>
            <input
              className="form-control"
              value={qty}
              style={{ maxWidth: props.width, height: "55px" }}
            />
            <span className="input-group-text">
              <button onClick={onQuantityIncrement} class="btn btn-primary">
                <i className="fa fa-plus"></i>
              </button>
            </span>
          </div>
        </div>
      </td>
      <td>
        <CurrencyFormat
          value={Number(price) * Number(qty) - Number(offer) * Number(qty)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rs. "}
          suffix={".00"}
        />
        {offer > 0 ? (
          <div style={{ color: "red" }}>
            Total Offer{" "}
            <CurrencyFormat
              value={Number(offer) * Number(qty)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rs. "}
              suffix={".00"}
            />
          </div>
        ) : null}
      </td>
    </tr>
  );
};

export default CartItem;
