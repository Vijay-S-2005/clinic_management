import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      medicine_id, // Assuming medicine_id is passed from the frontend
      name,
      brand,
      groupName, // Updated to match the schema field name
      dosageForm,
      strength,
      quantity,
      expiryDate,
      price,
      notes,
    } = body;

    // Validate required fields
    if (
      !medicine_id ||
      !name ||
      !brand ||
      !groupName ||
      !dosageForm ||
      !strength ||
      !quantity ||
      !expiryDate ||
      !price
    ) {
      return new Response(
        JSON.stringify({ error: "All fields except notes are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse expiryDate to JavaScript Date format
    const parsedExpiryDate = new Date(expiryDate);

    // Save the data to the database
    const newMedicine = await prisma.medicine.create({
      data: {
        medicine_id, // Explicitly handle the unique medicine ID
        name,
        brand,
        groupName,
        dosageForm,
        strength,
        quantity: parseInt(quantity, 10), // Ensure integer
        expiryDate: parsedExpiryDate, // Ensure valid Date
        price: parseFloat(price), // Ensure float
        notes: notes || null, // Optional field
      },
    });

    return new Response(
      JSON.stringify({
        message: "Medicine added successfully",
        data: newMedicine,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error saving medicine:", error);
    return new Response(
      JSON.stringify({
        error: "Error saving medicine. Details: " + error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(request) {
  try {
    // Parse the query parameters
    const url = new URL(request.url);
    const medicineId = url.searchParams.get("medicine_id_auto");
    const count = url.searchParams.get("count");

    // If `medicine_id_auto` is provided, fetch a specific medicine
    if (medicineId) {
      const medicine = await prisma.medicine.findUnique({
        where: { medicine_id_auto: parseInt(medicineId, 10) },
      });

      if (!medicine) {
        return new Response(JSON.stringify({ error: "Medicine not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(
        JSON.stringify({
          message: "Medicine retrieved successfully",
          data: medicine,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // If `count=true` is provided, return the count of medicines
    if (count === "true") {
      const medicineCount = await prisma.medicine.count();

      return new Response(
        JSON.stringify({
          message: "Medicine count retrieved successfully",
          data: { count: medicineCount },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Otherwise, fetch all medicines and include unique groups and forms
    const medicines = await prisma.medicine.findMany();
    const uniqueGroups = [
      ...new Set(medicines.map((medicine) => medicine.groupName)),
    ];
    const uniqueForms = [
      ...new Set(medicines.map((medicine) => medicine.dosageForm)),
    ];

    return new Response(
      JSON.stringify({
        message: "All medicines retrieved successfully",
        data: {
          medicines,
          uniqueGroups,
          uniqueForms,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error retrieving medicines:", error);
    return new Response(
      JSON.stringify({ error: "Error retrieving medicines" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request) {
  try {
    // Extract `medicine_id_auto` from the query parameters
    const url = new URL(request.url);
    const medicine_id_auto = url.searchParams.get("medicine_id_auto");

    if (!medicine_id_auto) {
      return new Response(
        JSON.stringify({ error: "Medicine ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Delete the medicine record from the database
    const deletedMedicine = await prisma.medicine.delete({
      where: { medicine_id_auto: parseInt(medicine_id_auto, 10) },
    });

    return new Response(
      JSON.stringify({
        message: "Medicine deleted successfully",
        data: deletedMedicine,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting medicine:", error);
    return new Response(JSON.stringify({ error: "Error deleting medicine" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const {
      medicine_id_auto, // Primary key or unique identifier
      name,
      brand,
      groupName,
      dosageForm,
      strength,
      quantity,
      expiryDate,
      price,
      notes,
    } = body;

    if (!medicine_id_auto) {
      return new Response(
        JSON.stringify({ error: "Medicine ID is required for update" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse expiryDate to JavaScript Date format
    const parsedExpiryDate = new Date(expiryDate);

    // Update the record in the database
    const updatedMedicine = await prisma.medicine.update({
      where: { medicine_id_auto: parseInt(medicine_id_auto, 10) },
      data: {
        name,
        brand,
        groupName,
        dosageForm,
        strength,
        quantity: parseInt(quantity, 10),
        expiryDate: parsedExpiryDate,
        price: parseFloat(price),
        notes,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Medicine updated successfully",
        data: updatedMedicine,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating medicine:", error);
    return new Response(JSON.stringify({ error: "Error updating medicine" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
