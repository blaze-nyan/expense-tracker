/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/lib/mongodb";
import Expense from "@/models/expenseModel";

import { getCurrentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { amount, date, category, paymentmethod, note } = reqBody;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    const newExpense = new Expense({
      userId: user._id,
      amount,
      date,
      category,
      paymentmethod,
      note,
    });
    const createdExpense = await newExpense.save();

    const response = NextResponse.json({
      message: "Expense created successfully",
      success: true,
      createdExpense,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    console.log("found current user");
    const id = user._id;
    const expenses = await Expense.find({ userId: id });
    console.log(expenses);

    const response = NextResponse.json({
      expenses: expenses,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message + "Server Error" },
      { status: 500 }
    );
  }
}
