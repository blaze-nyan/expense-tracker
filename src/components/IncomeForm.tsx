/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, LinearProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";

import { TextField, Select } from "formik-mui";
import MenuItem from "@mui/material/MenuItem";

import * as Yup from "yup";
import * as React from "react";

interface Values {
  amount: number;
  source: string;
}
const incomeSchema = Yup.object().shape({
  amount: Yup.number().required("Required").min(0, "Amount cannot be negative"),
  source: Yup.string().required("Required"),
});

export default function IncomeForm() {
  const handleCreateIncome = async (
    values: Values,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const response = await fetch("/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create expense");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };
  return (
    <Formik
      initialValues={{
        amount: 0,
        source: "",
      }}
      validationSchema={incomeSchema}
      onSubmit={handleCreateIncome}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            name="amount"
            type="number"
            label="Amount"
            textField={{ helperText: "Type amount", variant: "filled" }}
          />

          <Field
            component={Select}
            formHelperText={{ children: "Select source of income" }}
            id="source"
            name="source"
            labelId="source"
            label="Source"
          >
            <MenuItem value={"salary"}>Salary</MenuItem>
            <MenuItem value={"pocket-money"}>Pocket Money</MenuItem>
          </Field>

          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
}
