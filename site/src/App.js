import React from "react";
import PropTypes from "prop-types";
import CardLayout from "./components/CardLayout";
import NumberFormat from "react-number-format";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import config from "./config";
import Pharmacy from "./models/Pharmacy";

const App = () => {
  const [values, setValues] = React.useState({
    latitude: "",
    longitude: "",
  });
  const [closestPharm, setClosestPharm] = React.useState();

  /**
   * Makes the API call when the Get nearest Pharmacy button is pushed
   */
  const handleNearestPharmacy = () => {
    const lat = document.getElementById("latitude-input").value;
    const long = document.getElementById("longitude-input").value;

    if (lat && long) {
      const raw = JSON.stringify({ latitude: lat, longitude: long });
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      fetch(`${config.domains.api}/pharmacy`, {
        method: "POST",
        headers,
        body: raw,
      })
        .then((res) => res.json())
        .then((data) => {
          const pharmacy = new Pharmacy(data.pharmacy, data.distance);
          setClosestPharm(pharmacy);
        })
        .catch((error) => {
          console.log(error);
          window.alert("An error occurred while getting the closet pharmacy");
        });
    } else {
      window.alert("Latitude and Longitude are required");
    }
  };

  const handleLatAndLongChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const cardContent = (
    <>
      <TextField
        label="latitude"
        value={values.latitude}
        onChange={handleLatAndLongChange}
        name="latitude"
        id="latitude-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <TextField
        label="longitude"
        value={values.longitude}
        onChange={handleLatAndLongChange}
        name="longitude"
        id="longitude-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      {closestPharm && (
        <div>
          <br />
          <Typography variant="h6" gutterBottom>
            Result:
          </Typography>
          <Typography variant="body1" gutterBottom>
            Name: {closestPharm.name}
            <br />
            Address: {closestPharm.address} <br />
            {closestPharm.city}, {closestPharm.state} {closestPharm.zip}
            <br />
            Distance: {closestPharm.distance} miles
          </Typography>
        </div>
      )}
    </>
  );

  return (
    <CardLayout
      cardHeaderTitle={"Pharmacy Locator"}
      cardContent={cardContent}
      cardActions={
        <Button
          size="medium"
          color="primary"
          variant="contained"
          onClick={handleNearestPharmacy}
        >
          Get nearest Pharmacy
        </Button>
      }
    />
  );
};

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
};

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default App;
