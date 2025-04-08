// app/api/medecins/[numed].js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Modifier un médecin (PUT)
export async function PUT(request, { params }) {
  try {
    const { numed } = params; // Récupérer numed dans les paramètres de l'URL
    const body = await request.json();

    const updatedMedecin = await prisma.medecin.update({
      where: { numed: numed },
      data: body,
    });

    return NextResponse.json(updatedMedecin);
  } catch (error) {
    console.error("Erreur lors de la modification", error);
    return NextResponse.json({ error: "Erreur lors de la modification" }, { status: 500 });
  }
}

// Supprimer un médecin (DELETE)
export async function DELETE(request, { params }) {
  try {
    const { numed } = params; // Récupérer numed dans les paramètres de l'URL

    await prisma.medecin.delete({ where: { numed: numed } });

    return NextResponse.json({ message: "Médecin supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
