/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, LinearProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { useRouter } from "next/navigation";
import * as React from "react";

interface Values {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const handleLogIn = async (values: Values, { setSubmitting }: any) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-36">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors: Partial<Values> = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          } else if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 4) {
            errors.password = "Password must have at least 4 characters";
          }
          return errors;
        }}
        onSubmit={handleLogIn}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className="flex flex-col justify-center items-center w-[300px]">
            <h3 className="mb-5">Login Here</h3>
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
            {isSubmitting && <LinearProgress />}
            <br />
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
