import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUserCreateInput } from "@enterprise-commerce/core/platform/types"
import { createUser, findUserByEmail } from "../models/User"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  
  try {
    // Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: "Couldn't create user. The email address may be already in use." });
      return;
    }
    
    const newUser: PlatformUserCreateInput = {
      email,
      password
    };

    const user = await createUser(newUser);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({message: error.message || "Registration failed"});
  }

};