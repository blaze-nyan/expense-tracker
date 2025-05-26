import Container from "@mui/material/Container";
import AddButton from "@/components/AddButton";
import React from "react";
import TotalExpense from "@/components/TotalExpense";

const page = () => {
  return (
    <Container maxWidth="xl">
      <TotalExpense />
      <AddButton />
    </Container>
  );
};

export default page;
