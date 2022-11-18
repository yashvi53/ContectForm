import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useFormik } from "formik";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ContactForm.css";
import { contactSchema } from "./schemas";

function ContactForm() {
  const [value, setValue] = useState();
  const [records, setRecords] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const initialValues = {
    username: "",
    lastname: "",
    email: "",
    gender: "",
    age: "",
    country: "",
    state: "",
    city: "",
    pannum:"",
    pcode:""
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: contactSchema,

    onSubmit: (values, action) => {
      alert("working");
      console.log(values, JSON.stringify(values));
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const body = {
        userData: values,
      };

      const options = {
        method: "POST",
        headers,
        mode: "cors",
        body: JSON.stringify(body),
      };

      fetch("https://eos4ryec5bx7ucd.m.pipedream.net/", options);
    },
  });

  const countries = Country.getAllCountries();
  const updateCountries = countries.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));
  const updateState = (countryCode) =>
    State.getStatesOfCountry(countryCode).map((state) => ({
      label: state.name,
      value: state.isoCode,
      ...state,
    }));
  console.log("states", State.getStatesOfCountry(93));
  const updateCities = (countryCode, stateCode) =>
    City.getCitiesOfState(countryCode, stateCode).map((city) => ({
      label: city.name,
      value: city.isoCode,
      ...city,
    }));

  useEffect(() => {}, [values]);
  console.log("value", values);
  // console.log("======000===>", City.getCitiesOfState("IN", "GJ"));

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
      <div className="person-detail">
        <div className="form-group">
        
          
          <input
            type="text"
            name="username"
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="FirstName"
            className="form-control "
          />
          {errors.username && touched.username ? (
            <p className="form-error">{errors.username}</p>
          ) : null}
        </div>
        <div className="form-group">
        
          <input
            type="text"
            name="lastname"
            value={values.lastname}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="LastName"
            className="form-control"
          />
          {errors.lastname && touched.lastname ? (
            <p className="form-error">{errors.lastname}</p>
          ) : null}
        </div>
        </div>
        <div className="form-group">
         
          <input
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            name="email"
            placeholder="Email"
          />
          {errors.email && touched.email ? (
            <p className="form-error">{errors.email}</p>
          ) : null}
        </div>
        <div 
        className="form-group">
          <input type="text" className="pincode" placeholder="PAN-NUMBER" name="pannum"  value={values.pannum}
            onBlur={handleBlur}
            onChange={handleChange} />
            {errors.pannum && touched.pannum ? (
            <p className="form-error">{errors.pannum}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="">Female</label>
          <input
            className="gender-e"
            type="radio"
            onChange={handleChange}
            name="gender"
            value="Female"
          />
          &nbsp;
          &nbsp;
          &nbsp;
          <label htmlFor="">Male</label>
          <input
            type="radio"
            className="gender-m"
            onChange={handleChange}
            name="gender"
            value="Male"
          />
          &nbsp;
          &nbsp;
          &nbsp;
          <label htmlFor="">Other</label>
          <input
            type="radio"
            className="gender-o"
            onChange={handleChange}
            name="gender"
            value="Other"
          />
        </div>
        <div className="form-group">
        <DatePicker className="birth-d" placeholderText="birthdate" selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <div className="addressline">
            <div className="address-1">
            
            <textarea name="adress" placeholder="AddressLine-1"  cols="50" rows="3"></textarea>
            </div>
            <div className="address-2">
        
            <textarea name="adress" placeholder="AddressLine-2"    cols="50" rows="3"></textarea>
            </div>
           
        </div>
        <div className="form-group">
          <input type="text" className="pincode" placeholder="pincode" name="pcode"  value={values.pcode}
            onBlur={handleBlur}
            onChange={handleChange} />
          {errors.pcode && touched.pcode ? (
            <p className="form-error">{errors.pcode}</p>
          ) : null}
        </div>
        
        <div className="form-group">
          <div className="csc">
          
          <Select
            name="country"
            id="country"
            placeholder=" Select Country"
            options={updateCountries}
            value={values.country}
            onChange={(value) => {
              setValues({ country: value, state: "", city: "" }, false);
            }}
            className="csc-input"
            required
          ></Select>
          
          <Select
            name="state"
            id="state"
            placeholder="Select State"
            options={updateState(values.country ? values.country.value : null)}
            value={values.state}
            onChange={(value) => {
              setValues({ state: value, city: "" }, false);
            }}
            required
          ></Select>
         
          <Select
            name="city"
            id="city"
            placeholder="Select City..."
            options={updateCities(
              values.state ? values.state.countryCode : null,
              values.state ? values.state.isoCode : null
            )}
            value={values.city}
            onChange={(value) => {
              setValues({ ...values, city: value }, false);
            }}
            required
          ></Select>
          </div>

          <p>{JSON.stringify(Country.get)}</p>
          <p>{JSON.stringify(State.get)}</p>
          <p>{JSON.stringify(City.get)}</p>
        </div>

        <div className="form-group">
          <div className="phone-input">
          <PhoneInput
            placeholder="Enter phone number"
            value={value}
            onChange={setValue}
            required
           
          />
          </div>
        </div>
        <div className="form-group">
          <button type="button">Submit</button>
        </div>
      </form>
      <div>
        {records.map((curElem) => {
          return (
            <div className="showDataStyle">
              <p>{curElem.username}</p>
              <p>{curElem.lastname}</p>
              <p>{curElem.email}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ContactForm;
