import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(req, res) {
  try {
    const { numero, operationType, sellingPrice, commission, status, operatorId, anipServiceId } = await req.json();

    if (!numero || !operationType || !sellingPrice || !commission || !status) {
      return new Response(
        JSON.stringify({ message: "Valeurs manquantes" }),
        { status: 400 }
      );
    }


    let operationTypeRecord = await prisma.operationType.findUnique({
      where: {
        name: operationType, 
      },
    });

  
    if (!operationTypeRecord) {
      operationTypeRecord = await prisma.operationType.create({
        data: {
          name: operationType, 
        },
      });
    }

    const newOperation = await prisma.operation.create({
      data: {
        numero,
        operationType: {
          connect: { id: operationTypeRecord.id },
        },
        sellingPrice: parseFloat(sellingPrice),
        commission: parseFloat(commission),
        status,
        operatorId: operatorId ? operatorId : undefined, 
        anipServiceId: anipServiceId ? anipServiceId : undefined, 
      },
    });

    return new Response(
      JSON.stringify({ message: "Opération créée avec succès", operation: newOperation }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}



export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); 

    if (id) {
      const operation = await prisma.operation.findUnique({
        where: { id },
        include: {
          operationType: true,
          operator: true,
          anipService: true,
        },
      });

      if (!operation) {
        return NextResponse.json(
          { error: "Operation not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(operation);
    }


    const operations = await prisma.operation.findMany({
      include: {
        operationType: true,
        operator: true,
        anipService: true,
      },
    });

    return NextResponse.json(operations);
  } catch (error) {
    console.error("Error fetching operations:", error);
    return NextResponse.json(
      { error: "Failed to fetch operations" },
      { status: 500 }
    );
  }
}

// API pour mettre à jour une opération existante
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing operation ID" },
        { status: 400 }
      );
    }

    const updatedOperation = await prisma.operation.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedOperation);
  } catch (error) {
    console.error("Error updating operation:", error);
    return NextResponse.json(
      { error: "Failed to update operation" },
      { status: 500 }
    );
  }
}
