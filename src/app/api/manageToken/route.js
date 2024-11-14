import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { patientId } = await request.json();
    console.log("patientId:", patientId);
    if (!patientId) {
      return new Response(JSON.stringify({ error: "patientId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Call the function to create a token with the given patientId
    const newToken = await createTokenForPatient(patientId);
    return new Response(JSON.stringify(newToken), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
async function createTokenForPatient(patientId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of day

  // Count tokens issued today
  const tokensIssuedToday = await prisma.token.count({
    where: {
      issuedAt: {
        gte: today,
      },
    },
  });

  // Format tokenNumber with a date prefix for uniqueness
  const datePrefix = today.toISOString().split("T")[0].replace(/-/g, ""); // Format YYYYMMDD
  const tokenNumber = `${datePrefix}-TKN-${String(
    tokensIssuedToday + 1
  ).padStart(3, "0")}`;

  const newToken = await prisma.token.create({
    data: {
      tokenNumber,
      status: "active",
      patientId,
      issuedAt: new Date(),
      called: false,
    },
  });

  return newToken;
}
