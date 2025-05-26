import Container from "@mui/material/Container";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import Test from "@/components/Test";
import ExpenseTable from "@/components/ExpenseTable";
import { Box } from "@mui/material";

const page = () => {
  return (
    <Container maxWidth="xl" sx={{ p: 5 }}>
      <div className="w-full flex md:flex-row flex-col gap-5">
        <ExpenseForm />
        {/* <ExpenseList /> */}
        <ExpenseTable />
      </div>

      <LogoutButton />
    </Container>
  );
};

export default page;
