import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions";
import { Form, Button } from "react-bootstrap";
import Input from "../../components/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddressForm(props) {
  const [noNew, setNoNew] = useState("");
  const [streetNew, setStreetNew] = useState("");
  const [cityNew, setCityNew] = useState("");
  const [submitFlag, setSubmitFlag] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  let addressNew;

  //add a new address
  const onAddressSubmit = (e) => {
    //validations of data
    if (noNew === "") {
      toast.error("Address No. can't be empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (streetNew === "") {
      toast.error("Address street can't be empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (!cityNew) {
      toast.error("Address city can't be empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

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

  //when user selecting delivery address detecting it
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
      <ToastContainer />
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
        <Button style={{ width: "100%" }} onClick={onAddressSubmit}>
          Save Address And Deliver Here
        </Button>
      </Form>
    </div>
  );
}
