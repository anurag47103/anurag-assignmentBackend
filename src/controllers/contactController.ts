import { Request, Response } from "express";
import pool from "../config/db";

export const identifyContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, phoneNumber } = req.body;
  console.log(email, phoneNumber);
  //   try {
  //     const client = await pool.connect();

  // Step 1: Find contacts with the provided email or phone number

  // Assume we found primary contacts 1 and 11

  // Step 2: Update recent primary contact to secondary

  // Step 3: Update linked contacts to point to older primary contact

  // Step 4: Aggregate the final result
};
