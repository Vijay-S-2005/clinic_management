import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      brand,
      group,
      dosageForm,
      strength,
      quantity,
      expiryDate,
      price,
      notes,
    } = body;

    // Parse expiryDate to JavaScript Date format
    const parsedExpiryDate = new Date(expiryDate);

    // Save the data to the database
    const newMedicine = await prisma.medicine.create({
      data: {
        name,
        brand,
        groupName: group,
        dosageForm,
        strength,
        quantity: parseInt(quantity, 10),
        expiryDate: parsedExpiryDate,
        price: parseFloat(price),
        notes,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Medicine added successfully', data: newMedicine }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error saving medicine:", error);
    return new Response(
      JSON.stringify({ error: 'Error saving medicine' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// GET function to retrieve all medicines
export async function GET() {
  try {
    const medicines = await prisma.medicine.findMany(); // Retrieve all records

    return new Response(
      JSON.stringify({ message: 'All medicines retrieved successfully', data: medicines }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error retrieving medicines:", error);
    return new Response(
      JSON.stringify({ error: 'Error retrieving medicines' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
