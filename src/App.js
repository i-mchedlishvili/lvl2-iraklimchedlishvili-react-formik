import React, { useState } from "react";
import "./App.css";
import { useFormik, FormikProvider, Field } from "formik";

function App() {

const [long, setLong] = useState(null)
const [lat, setLat] = useState(null)

  const success = (position) => {
   let latitude = position.coords.latitude;
   let longitude = position.coords.longitude;
    setLong(longitude)
    setLat(latitude)
  };

console.log(long)
console.log(lat)
  const error = () => {
    console.log("error");
  };

  navigator.geolocation.getCurrentPosition(success, error);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      name: {
        firstname: "",
        lastname: "",
      },
      address: {
        city: "",
        street: "",
        number: "",
        zipcode: "",
      },
      phone: "",
    },
    onSubmit: (values) => {
      fetch("https://fakestoreapi.com/users", {
        method: "POST",
        body: JSON.stringify({
          email: formik.values.email,
          username: formik.values.username,
          password: formik.values.password,
          name: {
            firstname: formik.values.name.firstname,
            lastname: formik.values.name.lastname,
          },
          address: {
            city: formik.values.address.city,
            street: formik.values.address.street,
            number: formik.values.address.number,
            zipcode: formik.values.address.zipcode,
            geolocation: {
              lat: lat,
              long: long
            },
          },
          phone: formik.values.phone,
        }),
      })
        .then((res) => res.json())
        .then((json) => console.log(json));
        
    },
  });

  console.log(formik.values);

  return (
    <FormikProvider value={formik}>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email</label>
          <Field name="email" id="email" />

          <label htmlFor="username">Username</label>
          <Field name="username" id="username" />

          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          <label htmlFor="firstname">firstname</label>
          <input
            type="firstname"
            id="firstname"
            name="name.firstname"
            onChange={formik.handleChange}
            value={formik.values.name.firstname}
          />

          <label htmlFor="lastname">lastname</label>
          <input
            type="lastname"
            id="lastname"
            name="name.lastname"
            onChange={formik.handleChange}
            value={formik.values.name.lastname}
          />

          <label htmlFor="city">city</label>
          <input
            type="city"
            id="city"
            name="address.city"
            onChange={formik.handleChange}
            value={formik.values.address.city}
          />

          <label htmlFor="street">street</label>
          <input
            type="street"
            id="street"
            name="address.street"
            onChange={formik.handleChange}
            value={formik.values.address.street}
          />

          <label htmlFor="number">number</label>
          <input
            type="number"
            id="number"
            name="address.number"
            onChange={formik.handleChange}
            value={formik.values.address.number}
          />

          <label htmlFor="zipcode">zipcode</label>
          <input
            type="zipcode"
            id="zipcode"
            name="address.zipcode"
            onChange={formik.handleChange}
            value={formik.values.address.zipcode}
          />

          <label htmlFor="phone">phone</label>
          <input
            type="phone"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </FormikProvider>
  );
}

export default App;
