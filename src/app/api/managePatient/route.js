import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      age,
      address,
      sex,
      height,
      weight,
      maritalStatus,
      phoneNumber,
      email,
    } = body;

    const newPatient = await prisma.patient.create({
      data: {
        name,
        age: parseInt(age), // Convert age to integer
        address,
        sex,
        height: height ? parseFloat(height) : null, // Convert height to float or set to null
        weight: weight ? parseFloat(weight) : null, // Convert weight to float or set to null
        maritalStatus,
        phoneNumber,
        email: email || null, // Convert empty email string to null
      },
    });

    return new Response(
      JSON.stringify({
        message: "patient added successfully",
        data: newPatient,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error saving patient:", error);
    return new Response(JSON.stringify({ error: "Error saving patient" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get("patientId");
  const countOnly = searchParams.get("count") === "true";

  if (patientId) {
    try {
      const patient = await prisma.patient.findUnique({
        where: { patientId: parseInt(patientId, 10) },
      });
      return new Response(JSON.stringify(patient), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching patient:", error);
      return new Response(JSON.stringify({ error: "Error fetching patient" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else if (countOnly) {
    console.log("hit count only");
    try {
      const count = await prisma.patient.count();
      return new Response(JSON.stringify({ count }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error counting patients:", error);
      return new Response(
        JSON.stringify({ error: "Error counting patients" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } else {
    console.log("hit get all");
    try {
      const patients = await prisma.patient.findMany();
      return new Response(JSON.stringify(patients), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching patients:", error);
      return new Response(
        JSON.stringify({ error: "Error fetching patients" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const {
      patientId,
      name,
      age,
      address,
      sex,
      height,
      weight,
      maritalStatus,
      phoneNumber,
      email,
    } = body;

    const updatedPatient = await prisma.patient.update({
      where: { patientId: parseInt(patientId, 10) },
      data: {
        name,
        age,
        address,
        sex,
        height: height ? parseFloat(height) : null, // Convert height to float
        weight: weight ? parseFloat(weight) : null, // Convert weight to float
        maritalStatus,
        phoneNumber,
        email,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Patient updated successfully",
        data: updatedPatient,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating Patient:", error);
    return new Response(JSON.stringify({ error: "Error updating Patient" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE function to delete a medicine by ID
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get("patientId");

  if (!patientId) {
    return new Response(JSON.stringify({ error: "patientId  is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await prisma.patient.delete({
      where: { patientId: parseInt(patientId, 10) },
    });

    return new Response(
      JSON.stringify({ message: "patient deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting patient:", error);
    return new Response(JSON.stringify({ error: "Error deleting patient" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
