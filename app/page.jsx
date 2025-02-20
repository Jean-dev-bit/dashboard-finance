"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "@/app/pages.module.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    nomUtilisateur: "",
    prenomUtilisateur: "",
    username: "",
    password: "",
    rpassword: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.rpassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post("/api/signup", {
        username: formData.username,
        nomUtilisateur: formData.nomUtilisateur,
        prenomUtilisateur: formData.prenomUtilisateur,
        password: formData.password,
      });

      if (response.data.success) {
        setMessage("Inscription réussie !");
        setTimeout(() => {
          setIsSignup(false);
        }, 2000);
      } else {
        setMessage(response.data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur Axios :", error);
      setMessage("Une erreur est survenue lors de l'inscription.");
    }
  };

  // Connexion
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        username: formData.username,
        hashedPassword: formData.hashedPassword,
      },
      );

      console.log('USERNAME:', formData.username),
        console.log('HASHEDPASSWORD:', hashedPassword);

      if (response.data.success) {
        router.push("/dashboard");
      } else {
        setMessage(response.data.message || "Identifiants incorrects.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Erreur serveur : ", error.response.data);
        setMessage(error.response.data.message);
      } else {
        console.error("Erreur client : ", error.message);
        setMessage("Une erreur est survenue lors de la connexion.");
      }
    }
  };


  return (
    <div className={styles.loginWrapper}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.loginForm}>
        {isSignup ? (
          <>
            <h2>Inscription 😊👇</h2>
            <form onSubmit={handleSignup}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="nomUtilisateur"
                  placeholder="Entrer votre nom"
                  value={formData.nomUtilisateur}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="prenomUtilisateur"
                  placeholder="Entrer votre prénom"
                  value={formData.prenomUtilisateur}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="username"
                  placeholder="Entrer votre nom d'utilisateur"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  id="password"
                  placeholder="Entrer votre mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  id="rpassword"
                  placeholder="Confirmer votre mot de passe"
                  value={formData.rpassword}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                S'inscrire
              </button>
              <span className={styles.footer} onClick={() => setIsSignup(false)} style={{ cursor: "pointer" }}>
                Déjà un compte ? <strong>Connectez-vous ici</strong>
              </span>
            </form>
            {message && <p className={styles.message}>{message}</p>}
          </>
        ) : (
          <>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <input type="text" id="username" placeholder="Entrer votre nom d'utilisateur" />
              </div>
              <div className={styles.formGroup}>
                <input type="password" id="hashedPassword" placeholder="Entrer votre mot de passe" />
              </div>
              <button type="submit" className={styles.submitButton}>
                Se connecter
              </button>
              <span
                className={styles.footer}
                onClick={() => setIsSignup(true)}
                style={{ cursor: "pointer" }}
              >
                Si vous n'avez pas un compte,{" "}
                <strong>Inscrivez-vous par ici</strong>
              </span>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

