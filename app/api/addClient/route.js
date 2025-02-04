import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { nom, prenoms, email, profession ,  telephone, sexe, adresse } = body;

    if (!nom || !prenoms || !email || !profession || !telephone || !sexe) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    const existingClient = await prisma.client.findUnique({
      where: { telephone },
    });

    if (existingClient) {
      return NextResponse.json(
        { error: "Un client avec ce numéro de téléphone existe déjà." },
        { status: 409 }
      );
    }

    const client = await prisma.client.create({
      data: {
        nom,
        prenoms,
        email,
        profession,
        telephone,
        sexe,
        adresse: adresse || null,
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du client:", error);
    return NextResponse.json(
      { error: "Erreur serveur, veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const clients = await prisma.client.findMany();
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Erreur lors de la récupération des clients :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des clients." },
      { status: 500 }
    );
  }
}



// Méthode PUT pour mettre à jour un client
export async function PUT(request) {
  try {
    const { id } = request.query; // Récupérer l'ID du client à partir de l'URL
    const body = await request.json();
    const { nom, prenoms, email, profession, telephone, sexe, adresse } = body;

    // Vérifier si tous les champs obligatoires sont fournis
    if (!nom || !prenoms || !email || !profession || !telephone || !sexe) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    // Vérifier si le client existe avant de tenter une mise à jour
    const existingClient = await prisma.client.findUnique({
      where: { id: String(id) },
    });

    if (!existingClient) {
      return NextResponse.json(
        { error: "Client non trouvé." },
        { status: 404 }
      );
    }

    // Vérifier si un autre client avec le même numéro de téléphone existe (en ignorant l'ID actuel)
    const duplicatePhoneClient = await prisma.client.findUnique({
      where: { telephone },
      select: { id: true },
    });

    if (duplicatePhoneClient && duplicatePhoneClient.id !== String(id)) {
      return NextResponse.json(
        { error: "Un client avec ce numéro de téléphone existe déjà." },
        { status: 409 }
      );
    }

    // Mise à jour du client
    const updatedClient = await prisma.client.update({
      where: { id: String(id) },
      data: {
        nom,
        prenoms,
        email,
        profession,
        telephone,
        sexe,
        adresse: adresse || null,
      },
    });

    return NextResponse.json(updatedClient, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du client:", error);
    return NextResponse.json(
      { error: "Erreur serveur, veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
