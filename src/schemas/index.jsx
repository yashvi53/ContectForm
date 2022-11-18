import * as Yup from "yup";

export const contactSchema=Yup.object({
    username:Yup.string().min(3).max(20).matches(/^[a-zA-Z\-]+$/,"please not enter witespace").required("please enter your firstname"),
    lastname:Yup.string().min(3).max(20).matches(/^[a-zA-Z\-]+$/,"please not enter witespace").required("please enter your lastname"),
    email:Yup.string().email().required("email is required"),
    age:Yup.number().required().positive().integer(),
    gender:Yup.string().min(1).required("please select gender"),
    pannum:Yup.string().matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/,"pan number must in correct format"),
    pcode:Yup.string().matches(/^[1-9][0-9]{5}$/,"please enter valid pincode")

})