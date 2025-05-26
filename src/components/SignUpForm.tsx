/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, LinearProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/navigation";
import * as React from "react";

interface Values {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const handleSignUp = async (values: Values, { setSubmitting }: any) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...DataToBeSent } = values;
      console.log(DataToBeSent);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DataToBeSent),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error + "=>: registration failed");
      }
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validate={(values) => {
        const errors: Partial<Values> = {};
        if (!values.username) {
          errors.username = "Required";
        } else if (values.username.trim().length < 5) {
          errors.username = "Name must have at least 5 chars";
        } else if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        } else if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 6) {
          errors.password = "Password must have at least 6 chars";
        } else if (values.password != values.confirmPassword) {
          errors.confirmPassword = "Must match with the password";
        }

        return errors;
      }}
      onSubmit={handleSignUp}
    >
      {({ submitForm, isSubmitting }) => (
        <Form className="w-[300px] flex flex-col justify-center items-center gap-1 ml-auto mr-auto p-10">
          <h3>Sign Up Here</h3>
          <Field
            className="w-full"
            component={TextField}
            type="username"
            label="Name"
            name="username"
          />
          <br />
          <Field
            className="w-full"
            component={TextField}
            name="email"
            type="email"
            label="Email"
          />

          <br />
          <Field
            className="w-full"
            component={TextField}
            type="password"
            label="Password"
            name="password"
          />
          <br />
          <Field
            className="w-full"
            component={TextField}
            type="password"
            label="Confirm Password"
            name="confirmPassword"
          />

          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
