import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions";
import { Form, Button } from "react-bootstrap";
import Input from "../../components/Input";

export default function AddressForm(props) {
  const [noNew, setNoNew] = useState("");
  const [streetNew, setStreetNew] = useState("");
  const [cityNew, setCityNew] = useState("");
  const [submitFlag, setSubmitFlag] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  let addressNew;

  const onAddressSubmit = (e) => {
    addressNew = `${noNew}, ${streetNew}, ${cityNew}.`;
    const payload = {
      addressNew: {
        addressNew,
      },
    };
    console.log(payload);
    dispatch(addAddress(payload));
    setSubmitFlag(true);
  };

  useEffect(() => {
    console.log("addressCount", user.addressNew);
    if (submitFlag) {
      console.log("data", user);
      const address = user.addressNew.slice(user.addressNew.length - 1)[0];
      props.onSubmitForm(address);
    }
  }, [user.addressNew]);

  return (
    <div>
      <div className="text-center">
        <h3 style={{ marginBottom: "30px" }}>Input New Address</h3>
      </div>
      <Form>
        <Input
          lable="No"
          placeholder="No"
          value={noNew}
          onChange={(e) => {
            setNoNew(e.target.value);
          }}
        ></Input>
        <Input
          lable="Street"
          placeholder="Street"
          value={streetNew}
          onChange={(e) => {
            setStreetNew(e.target.value);
          }}
        ></Input>
        <Input
          lable="City"
          placeholder="City"
          value={cityNew}
          onChange={(e) => {
            setCityNew(e.target.value);
          }}
        ></Input>
        <Button onClick={onAddressSubmit}>Save Address</Button>
      </Form>
    </div>
  );
}
