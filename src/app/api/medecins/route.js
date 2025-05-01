import { NextResponse } from 'next/server';
import { prisma } from '#/lib/prisma';

export const runtime = 'nodejs'; // Forcer l'utilisation de Node.js


// Récupérer tous les médecins
export async function GET() {
  try {
    const medecins = await prisma.medecin.findMany();
    return NextResponse.json(medecins);
  } catch (error) {
    console.error("Erreur lors de la récupération des médecins", error);
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

// Ajouter un nouveau médecin
export async function POST(request) {
  try {
    const body = await request.json();
    const newMedecin = await prisma.medecin.create({ data: body });
    return NextResponse.json(newMedecin);
  } catch (error) {
    console.error("Erreur lors de l'ajout du médecin", error);
    return NextResponse.json({ error: "Erreur lors de l'ajout" }, { status: 500 });
  }
}

// Modifier un médecin
export async function PUT(request) {
  try {
    const { numed, nom, nombreJours, tauxJournalier } = await request.json();

    const updatedMedecin = await prisma.medecin.update({
      where: { numed },
      data: { nom, nombreJours, tauxJournalier },
    });

    return NextResponse.json(updatedMedecin);
  } catch (error) {
    console.error("Erreur lors de la modification", error);
    return NextResponse.json({ error: "Erreur lors de la modification" }, { status: 500 });
  }
}

// Supprimer un médecin
export async function DELETE(request) {
  try {
    const { numed } = await request.json(); // Utilisation du corps de la requête pour obtenir le numed

    await prisma.medecin.delete({ where: { numed } });

    return NextResponse.json({ message: "Médecin supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
