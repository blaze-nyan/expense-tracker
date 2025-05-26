import Container from "@mui/material/Container";
import AddButton from "@/components/AddButton";
import React from "react";

const page = () => {
  return (
    <Container maxWidth="xl">
      <h2>Dashboard page</h2>
      <AddButton />
    </Container>
  );
};

export default page;
