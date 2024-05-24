"use server";

import { prisma } from "@/db/prisma";
import bcrypt from "bcryptjs";

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function signup({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    console.log(email, password, name);
    const existUser = await prisma.user.findUnique({ where: { email } });
    console.log(existUser);
    if (existUser) return { messg: "Email already exists" };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
    return { messg: "successful" };
  } catch (err) {
    console.log(err);
    return { messg: "error" };
  }
}
