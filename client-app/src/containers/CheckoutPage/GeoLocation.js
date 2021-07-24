import React, { useEffect, useState } from "react";
import { addAddress } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { key } from "../../apikey";

export default function GeoLocation(props) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);
  const [submitFlag, setSubmitFlag] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  let addressNew;

  const onAddressSubmit = (e) => {
    addressNew = `Latitude:${latitude}, Longtitude:${longitude}`;
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

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getCoordinates,
        handleLocationError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getCoordinates = (position) => {
    setLatitude(position.coords.latitude);
    setlongitude(position.coords.longitude);
  };

  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  };

  const getUserAddr = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${latitude},${longitude}&key=${key}`
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => alert(err));
  };

  return (
    <div>
      <Button onClick={getLocation} className="w-100">
        Use My Current Location
      </Button>
      <p>Latitude: {latitude}</p>
      <p>Longtitude: {longitude}</p>
      {latitude && longitude ? (
        <>
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${latitude},${longitude}&key=${key}`}
            alt="map"
          />
          <div className="text-center">
            <Button variant={"success"} onClick={onAddressSubmit}>
              Deliver Here
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}
