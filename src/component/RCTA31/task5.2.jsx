import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  empId: Yup.number()
    .integer("Employee ID must be an integer")
    .min(1000, "Employee ID must be between 1000 and 2000")
    .max(2000, "Employee ID must be between 1000 and 2000")
    .required("Employee ID is required"),
  bills: Yup.array()
    .of(
      Yup.object().shape({
        billId: Yup.number()
          .min(1, "Bill ID must be at least 1")
          .max(100, "Bill ID must be at most 100")
          .required("Bill ID is required"),
        amount: Yup.number()
          .positive("Amount must be a positive number")
          .required("Amount is required"),
        purpose: Yup.string()
          .min(5, "Purpose must be at least 5 characters")
          .required("Purpose is required"),
      })
    )
    .required("At least one bill is required"),
});

export default validationSchema;
