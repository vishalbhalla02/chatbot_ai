// lib/prisma.js
import { PrismaClient } from "../lib/generated/prisma";

let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

export default global.prisma;
