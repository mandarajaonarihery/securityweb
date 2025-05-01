"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import Lottie from "lottie-react";
import loginAnimation from "@/animations/login.json";
import signupAnimation from "@/animations/signup.json";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState(""); // Valeur statique pour l'email
  const [password, setPassword] = useState(""); // Valeur statique pour le mot de passe
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false); // État pour vérifier si c'est côté client
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    setIsClient(true); // On définit l'état lorsque le composant est monté côté client
  }, []);

  const handleSubmit = () => {
    if (!email || !password || (isSignUp && !fullName)) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    // Blocage de la fonctionnalité d'inscription
    if (isSignUp) {
      setError("Inscription désactivée pour le moment.");
      return;
    }

    // Vérification statique des identifiants
    if (email === "mandarajaonarihery@gmail.com" && password === "1234") {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", "med");

      router.push("/med");
    } else {
      setError("Identifiants incorrects.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Animation section */}
      {isClient && (
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: isSignUp ? "100%" : "0%" }}
          transition={{ duration: 0.8 }}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            position: "relative",
            padding: "2rem",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "90%", md: "80%" },
              height: { xs: "100%", sm: "90%", md: "80%" },
              maxWidth: "600px",
              maxHeight: "600px",
            }}
          >
            <Lottie animationData={isSignUp ? signupAnimation : loginAnimation} loop />
          </Box>
          <Typography
            variant="h3"
            sx={{
              zIndex: 1,
              textAlign: "center",
              fontWeight: "bold",
              color: "#fff",
              padding: 2,
              position: "absolute",
              bottom: "20px",
            }}
          >
            {isSignUp ? "Rejoignez-nous dès aujourd'hui !" : "Bon retour !"}
          </Typography>
        </motion.div>
      )}

      {/* Formulaire */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isSignUp ? "-100%" : "0%" }}
        transition={{ duration: 0.8 }}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            width: "400px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            padding: "2rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
          >
            {isSignUp ? "Créer un compte" : "Connexion"}
          </Typography>

          {isSignUp && (
            <TextField
              fullWidth
              label="Nom complet"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          )}
          <TextField
            fullWidth
            label="Adresse email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: 1.5, borderRadius: "5px", fontSize: "1rem" }}
            onClick={handleSubmit}
          >
            {isSignUp ? "S'inscrire" : "Se connecter"}
          </Button>

          {error && (
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {error}
            </Typography>
          )}

          <Typography
            variant="body2"
            sx={{
              mt: 2,
              textAlign: "center",
              color: "#6a6a6a",
            }}
          >
            {isSignUp
              ? "Vous avez déjà un compte ?"
              : "Vous n'avez pas encore de compte ?"}{" "}
            <span
              style={{
                color: "#2575fc",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Connexion" : "Inscription"}
            </span>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
