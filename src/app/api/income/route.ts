/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/lib/mongodb";
import Income from "@/models/incomeModel";

import { getCurrentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { amount, source } = reqBody;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    const newIncome = new Income({
      userId: user._id,
      amount,
      source,
    });
    const createdIncome = await newIncome.save();

    const response = NextResponse.json({
      message: "Income created successfully",
      success: true,
      createdIncome,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     const user = await getCurrentUser();
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 400 });
//     }
//     console.log("found current user");
//     const id = user._id;
//     const expenses = await Expense.find({ userId: id });
//     console.log(expenses);

//     const response = NextResponse.json({
//       expenses: expenses,
//     });
//     return response;
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message + "Server Error" },
//       { status: 500 }
//     );
//   }
// }
