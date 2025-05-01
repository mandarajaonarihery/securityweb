
"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Snackbar, Alert, Button, Card, CardContent, Typography, Box, CardActionArea, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton  } from "@mui/material"; // Importation de Alert pour un meilleur affichage des notifications
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function Med() {
  const [medecins, setMedecins] = useState([]);
  const [nom, setNom] = useState("");
  const [jours, setJours] = useState("");
  const [taux, setTaux] = useState("");
  const [medecinEdit, setMedecinEdit] = useState(null);
  const [snackbar, setSnackbar] = useState({ message: "", type: "success" });
  const [modalOpen, setModalOpen] = useState(false);
  const [medecinToDelete, setMedecinToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null); // Ajout de l'état selectedCard pour gérer l'activation de la carte
  const [openFormModal, setOpenFormModal] = useState(false);

  useEffect(() => {
    fetch("/api/medecins")
      .then((res) => res.json())
      .then((data) => setMedecins(data));
  }, []);

  const ajouterMedecin = async () => {
    const newMedecin = {
      nom,
      nombreJours: Number(jours),
      tauxJournalier: Number(taux),
    };

    const res = await fetch("/api/medecins", {
      method: "POST",
      body: JSON.stringify(newMedecin),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const addedMedecin = await res.json();
      setMedecins([...medecins, addedMedecin]);
      setNom("");
      setJours("");
      setTaux("");
      setSnackbar({ message: "Médecin ajouté !", type: "success" });
    } else {
      setSnackbar({ message: "Erreur lors de l'ajout", type: "error" });
    }
  };

  const modifierMedecin = async (numed) => {
    const updatedMedecin = {
      numed,
      nom,
      nombreJours: Number(jours),
      tauxJournalier: Number(taux),
    };

    const res = await fetch("/api/medecins", {
      method: "PUT",
      body: JSON.stringify(updatedMedecin),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const medecinModifie = await res.json();
      setMedecins(medecins.map((medecin) => (medecin.numed === numed ? medecinModifie : medecin)));
      setMedecinEdit(null);
      setNom("");
      setJours("");
      setTaux("");
      setSnackbar({ message: "Médecin modifié !", type: "success" });
    } else {
      setSnackbar({ message: "Erreur lors de la modification", type: "error" });
    }
  };
  const resetForm = () => {
    setNom("");
    setJours("");
    setTaux("");
    setMedecinEdit(null);
  };

  const supprimerMedecin = async () => {
    const res = await fetch("/api/medecins", {
      method: "DELETE",
      body: JSON.stringify({ numed: medecinToDelete.numed }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setMedecins(medecins.filter((medecin) => medecin.numed !== medecinToDelete.numed));
      setModalOpen(false);
      setSnackbar({ message: "Médecin supprimé !", type: "success" });
    } else {
      setSnackbar({ message: "Erreur lors de la suppression", type: "error" });
    }
  };

  const editMedecin = (medecin) => {
    setMedecinEdit(medecin); // pour indiquer qu'on est en mode édition
    setNom(medecin.nom);
    setJours(medecin.nombreJours);
    setTaux(medecin.tauxJournalier);
    setOpenFormModal(true); // c’est ça qui ouvre la modale
    
  };
  

  const openDeleteModal = (medecin) => {
    setMedecinToDelete(medecin);
    setModalOpen(true);
  };

  const prestationTotale = medecins.reduce((total, medecin) => total + medecin.nombreJours * medecin.tauxJournalier, 0);
  const prestationMin = medecins.length ? Math.min(...medecins.map((m) => m.nombreJours * m.tauxJournalier)) : 0;
  const prestationMax = medecins.length ? Math.max(...medecins.map((m) => m.nombreJours * m.tauxJournalier)) : 0;
  const data = {
    labels: ["Prestation Totale", "Prestation Minimale", "Prestation Maximale"],
    datasets: [
      {
        label: "Prestation Totale",
        data: [prestationTotale, 0, 0],
        backgroundColor: "#36A2EB",
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
      {
        label: "Prestation Minimale",
        data: [0, prestationMin, 0],
        backgroundColor: "#FF6384",
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
      {
        label: "Prestation Maximale",
        data: [0, 0, prestationMax],
        backgroundColor: "#FFCD56",
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
    ],
  };

  const prestations = [
    { title: "Prestation Totale   ", value: prestationTotale },
    { title: "Prestation Minimale", value: prestationMin },
    { title: "Prestation Maximale", value: prestationMax },
  ];

  return (
    <div
      className="p-6"
    >
    {/* ✅ Titre avec logos à gauche et à droite */}
<div className="flex items-center justify-between mb-2">
  {/* Logo gauche */}
  <img src="/steto.png" alt="Logo gauche" className="h-30 w-auto" />

  <>
  <style>
    {`
      @keyframes shine {
        0% {
          transform: translateX(-100%) skewX(-20deg);
        }
        100% {
          transform: translateX(200%) skewX(-20deg);
        }
      }

      .auto-shine {
        position: relative;
        display: inline-block;
        overflow: hidden;
        color: #2563eb; /* bleu-600 */
      }

      .auto-shine::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: rgba(255, 255, 255, 0.4);
        animation: shine 2s ease-in-out infinite;
      }
    `}
  </style>

  <h1 className="text-3xl font-bold text-center auto-shine">
    Gestion des Médecins
  </h1>
</>


  {/* Logo droite */}
  <img src="/log.png" alt="Logo droit" className="h-30 w-auto" />
</div>

  
      <div className="grid grid-cols-2 gap-6">
        {/* Colonne gauche */}
        <div>
          <div >
          <button  onClick={() => setOpenFormModal(true)}  className="bg-green-500 text-black px-4 py-2 rounded mb-4">Ajouter un Médecin</button>
          {/* Modale du formulaire */}
          {openFormModal && (
  <div className="fixed inset-0 bg-opacity-20 backdrop-blur flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {medecinEdit ? "Modifier un Médecin" : "Ajouter un Médecin"}
      </h2>

      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="border-2 border-gray-300 p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <input
        type="number"
        placeholder="Nombre de jours"
        value={jours}
        onChange={(e) => setJours(e.target.value)}
        className="border-2 border-gray-300 p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <input
        type="number"
        placeholder="Taux journalier"
        value={taux}
        onChange={(e) => setTaux(e.target.value)}
        className="border-2 border-gray-300 p-3 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />

      <div className="flex justify-between">
        <button
          onClick={() => {
            resetForm();
            setOpenFormModal(false);
          }}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all"
        >
          Annuler
        </button>
        <button
          onClick={
            medecinEdit
              ? () => {
                  modifierMedecin(medecinEdit.numed);
                  setOpenFormModal(false);
                }
              : () => {
                  ajouterMedecin();
                  setOpenFormModal(false);
                }
          }
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          {medecinEdit ? "Modifier" : "Ajouter"}
        </button>
      </div>
    </div>
  </div>
)}

          </div>
  
<TableContainer>
  <Table className="w-full" aria-label="Liste des Médecins">
    <TableHead>
      <TableRow className="bg-gray-200">
        <TableCell>Nom</TableCell>
        <TableCell>Jours</TableCell>
        <TableCell>Taux Journalier</TableCell>
        <TableCell>Prestation</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {medecins.map((medecin) => (
        <TableRow key={medecin.numed} className="border">
          <TableCell>{medecin.nom}</TableCell>
          <TableCell>{medecin.nombreJours}</TableCell>
          <TableCell>{medecin.tauxJournalier} Ar</TableCell>
          <TableCell>{medecin.nombreJours * medecin.tauxJournalier} Ar</TableCell>
          <TableCell>
            <IconButton
            sx={{
              color: 'blue', // Couleur bleue pour l'icône Modifier
              '&:hover': {
                color: 'darkblue', // Change la couleur au survol
              },
            }}
              onClick={() => editMedecin(medecin)}
              className="text-yellow-500"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{
                color: 'red', // Couleur rouge pour l'icône Supprimer
                '&:hover': {
                  color: 'darkred', // Change la couleur au survol
                },
              }}
              onClick={() => openDeleteModal(medecin)}
              className="text-red-500"
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
  
          <br />
  
       
<Box
  sx={{
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
    gap: 2,
  }}
>
  {prestations.map((prestation, index) => {
    let cardColor;
    let IconComponent;

    if (prestation.title.includes("Totale")) {
      cardColor = "lightblue";
      IconComponent = AttachMoneyIcon;
    } else if (prestation.title.includes("Minimale")) {
      cardColor = "lightcoral";
      IconComponent = TrendingDownIcon;
    } else if (prestation.title.includes("Maximale")) {
      cardColor = "orange";
      IconComponent = TrendingUpIcon;
    }

    return (
      <Card key={index} sx={{ backgroundColor: cardColor }}>
        <CardActionArea
          onClick={() => setSelectedCard(index)}
          data-active={selectedCard === index ? "" : undefined}
          sx={{
            height: "100%",
            "&[data-active]": {
              backgroundColor: "action.selected",
              "&:hover": {
                backgroundColor: "action.selectedHover",
              },
            },
          }}
        >
          <CardContent sx={{ height: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Icône centrée */}
            {IconComponent && <IconComponent sx={{ fontSize: 40, mb: 1, color: "black" }} />}
            
            {/* Titre */}
            <Typography variant="h6" component="div" sx={{ color: "black", fontWeight: 'bold' }}>
              {prestation.title}
            </Typography>

            {/* Valeur */}
            <Typography variant="body1" color="text.secondary" sx={{ color: "black" }}>
              {prestation.value} Ar
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  })}
</Box>

        </div>
  
        {/* Colonne droite */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Répartition des Prestations
          </h2>
          <Bar data={data} />
        </div>
      </div>
  
      {/* Snackbar */}
      <Snackbar
        open={!!snackbar.message}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ message: "", type: "success" })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ message: "", type: "success" })}
          severity={snackbar.type}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
  
      {/* Modal suppression */}
      {modalOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">
              Confirmer la suppression
            </h3>
            <p>Êtes-vous sûr de vouloir supprimer ce médecin ?</p>
            <div className="mt-4">
              <button
                onClick={supprimerMedecin}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Oui
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}
