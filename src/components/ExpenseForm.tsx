/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, LinearProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "formik-mui-x-date-pickers";
import { TextField, Select } from "formik-mui";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import * as Yup from "yup";
import * as React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Values {
  amount: number;
  date: Date | dayjs.Dayjs;
  category: string;
  paymentmethod: string;
  note: string;
}
const expenseSchema = Yup.object().shape({
  amount: Yup.number().required("Required").min(0, "Amount cannot be negative"),
  date: Yup.date().max(dayjs(), "Invalid date"),
  category: Yup.string().required("Required"),
  paymentmethod: Yup.string().required("Required"),
  note: Yup.string(),
});

export default function ExpenseForm() {
  const router = useRouter();
  const handleCreateExpense = async (
    values: Values,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const response = await fetch("/api/expense", {
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
      router.refresh();
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={{
          amount: 0,
          date: dayjs(),
          category: "",
          paymentmethod: "",
          note: "",
        }}
        validationSchema={expenseSchema}
        onSubmit={handleCreateExpense}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className="min-w-[320px] max-w-[400px] flex flex-col gap-5 flex-wrap">
            <div className="flex sm:flex-row flex-col gap-3 flex-wrap">
              <Field
                component={TextField}
                name="amount"
                type="number"
                label="Amount"
                textField={{ helperText: "Type amount", variant: "filled" }}
              />
              <Field
                component={DatePicker}
                name="date"
                label="Date"
                textField={{ helperText: "Pick a date", variant: "filled" }}
                className="sm:w-[194px] w-full"
              />
            </div>
            <div className="flex sm:flex-row flex-col gap-3 flex-wrap">
              <Field
                component={Select}
                formHelperText={{ children: "Select category" }}
                id="category"
                name="category"
                labelId="category"
                label="Category"
                className="sm:w-[194px] w-full"
              >
                <MenuItem value={"food"}>Food</MenuItem>
                <MenuItem value={"transport"}>Transport</MenuItem>
                <MenuItem value={"health"}>Health</MenuItem>
                <MenuItem value={"education"}>Education</MenuItem>
                <MenuItem value={"household"}>HouseHold</MenuItem>
              </Field>

              <Field
                component={Select}
                formHelperText={{ children: "Select payment method" }}
                id="paymentmethod"
                name="paymentmethod"
                labelId="paymentmethod"
                label="Payment Method"
                className="sm:w-[194px] w-full"
              >
                <MenuItem value={"mobile-banking"}>Mobile Banking</MenuItem>
                <MenuItem value={"cash"}>Cash</MenuItem>
              </Field>
            </div>
            <Field
              component={TextField}
              multiline
              name="note"
              label="Note"
              minRows={3}
              maxRows={6}
              textField={{ helperText: "Add your note", variant: "outlined" }}
            />
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
    </LocalizationProvider>
  );
}
