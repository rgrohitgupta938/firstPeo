import React, { Component } from "react";
import * as yup from "yup";
const schemaValidation = yup.object().shape({
  companyName: yup.string().required().min(4),
  email: yup.string().required().email(),
  website: yup.string().required().url(),
  city: yup.array().required().min(1),
  country: yup.string().required().min(3),
});
