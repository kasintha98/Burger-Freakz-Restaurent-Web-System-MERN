import React, { useState } from "react";
import { generatePublicUrl } from "../../urlConfig";

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);

  const { _id, name, price, img } = props.cartItem;

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
        <button className="btn btn-danger">Remove</button>
      </td>
      <td>{price}</td>
      <td>
        {/* qrty control */}
        <div className="input-group mb-3">
          <span className="input-group-text">
            <button onClick={onQuantityDecrement} class="btn btn-primary">
              -
            </button>
          </span>
          <input
            className="form-control"
            value={qty}
            style={{ maxWidth: "60px" }}
          />
          <span className="input-group-text">
            <button onClick={onQuantityIncrement} class="btn btn-primary">
              +
            </button>
          </span>
        </div>
      </td>
      <td>{Number(price) * Number(qty)}</td>
    </tr>
  );
};

export default CartItem;
