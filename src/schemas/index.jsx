import * as Yup from "yup";

export const contactSchema=Yup.object({
    username:Yup.string().min(3).max(20).required("please enter your firstname"),
    lastname:Yup.string().min(3).max(20).required("please enter your lastname"),
    email:Yup.string().email().required("email is required"),
    age:Yup.number().required().positive().integer()
})