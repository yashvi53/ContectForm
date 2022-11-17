import React,{useState,useEffect} from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useFormik } from "formik";
import Select from "react-select";
import {Country,State,City} from "country-state-city";
import './ContactForm.css';
import { contactSchema } from './schemas';

function ContactForm() {
      const [value, setValue] = useState();
      const [records,setRecords]=useState([]);
     
      
const initialValues = {
    username: "",
    lastname:"",
    email: "",
    gender:"",
    age:"",
    country: "India",
    state: null,
    city: null
    
  };

      const { values, errors, touched, handleBlur,handleChange,handleSubmit ,setFieldValue,setValues} =
      useFormik({
        initialValues:initialValues,
        validationSchema: contactSchema,
        onSubmit: (values, action) => {
          console.log(
            
            values,
            JSON.stringify(values)
          );
         
          action.resetForm();
          const headers = new Headers()
        headers.append("Content-Type", "application/json")

        const body = {
        "userData": values
        }

        const options = {
        method: "POST",
        headers,
        mode: "cors",
        body: JSON.stringify(body),
        }

fetch("https://eos4ryec5bx7ucd.m.pipedream.net", options)
        },
      });
  
    
  
      const countries = Country.getAllCountries();
      const updateCountries = countries.map((country)=>({
        label:country.name,
        value:country.isoCode,
        ...country

      }));
      const updateState=(countryCode)=>
      State.getStatesOfCountry(countryCode).map((state)=>({
        label:state.name,
        value:state.isoCode,
        ...state
      }));
      console.log("states",State.getStatesOfCountry
      (93));
      const updateCities=(countryCode,stateCode)=>
      City.getCitiesOfState(countryCode,stateCode).map((city)=>({
        label:city.name,
        value:city.isoCode,
        ...city
      }));
 
      useEffect(() => {}, [values]);
      console.log("value",values);
      // console.log("======000===>", City.getCitiesOfState("IN", "GJ"));
  return (
    <>
    <form className='contact-form' onSubmit={handleSubmit}>
        <div className='form-group'>
            <label htmlFor="name">Firstname</label>
            <input type="text" name='username' value={values.username} onBlur={handleBlur} onChange={handleChange}  className='form-control' />     
           { errors.username && touched.username ? <p className='form-error'>{errors.username}</p>:null }
        </div>
        <div className='form-group'>
        <label htmlFor="name">Lastname</label>
            <input type="text" name='lastname' value={values.lastname} onBlur={handleBlur}  onChange={handleChange}  className='form-control' />
            { errors.lastname && touched.lastname ? <p className='form-error'>{errors.lastname}</p>:null }
        </div>
        <div className='form-group'>
           <label htmlFor="emailInput">Email</label>
           <input type="email" onChange={handleChange} onBlur={handleBlur}   value={values.email} name="email"/>
           { errors.email && touched.email ? <p className='form-error'>{errors.email}</p>:null }
        </div>
        <div className='form-group'>
        <label htmlFor="">Female</label>
            <input className='gender-e' type="radio" onChange={handleChange} name="gender" value="Female" />
            &nbsp;
            <label htmlFor="">Male</label>
            <input type="radio" className='gender-m' onChange={handleChange}  name="gender" value="Male" />
            &nbsp;
            <label htmlFor="">Other</label>
            <input type="radio" className='gender-o' onChange={handleChange}  name="gender" value="Other" />
        </div>
        <div className='form-group'>
          <label htmlFor="">Age</label>
          <input type="number"  name='age' onChange={handleChange} onBlur={handleBlur} value={values.age} required/>
          { errors.age && touched.age ? <p className='form-error'>{errors.age}</p>:null }
        </div>
        <div className='form-group'>
           <label htmlFor="">Country</label>
           <Select name="country" 
           id="country"
           options={updateCountries}
           value={values.country}
           onChange={(value)=>{
            setValues({country:value,state:null,city:null},false);
           }}
           required
           ></Select>
           <label htmlFor="">State</label>
           <Select name="state" 
           id="state"
           options={updateState(values.country ? values.country.value:null)}
           value={values.state}
           onChange={(value)=>{
            setValues({state:value,city:null},false);
           }}
           required
           ></Select>
            <label htmlFor="">City</label>
           <Select name="city" 
           id="city"
           options={updateCities(values.state ? values.state.countryCode : null,
            values.state ? values.state.isoCode : null)}
           value={values.city}
           onChange={(value)=>{
            setFieldValue("city", value)
           }}
           required
           ></Select>

            <p>{JSON.stringify(Country.get)}</p>
            <p>{JSON.stringify(State.get)}</p>
            <p>{JSON.stringify(City.get)}</p>
        </div>

        <div className='form-group'>
        <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}/>
        </div>
        <div className='form-group'>
            <button>Submit</button>
        </div>
        

    </form>
    <div>
        {
            records.map((curElem)=>{
                return(
                    <div className='showDataStyle' >
                         <p>{curElem.username}</p>
                         <p>{curElem.lastname}</p>
                         <p>{curElem.email}</p>
                    </div>
                )
            })
        }
    </div>
    </>
  )
}

export default ContactForm