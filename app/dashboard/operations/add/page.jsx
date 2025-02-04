"use client";

import { useState } from "react";
import styles from "@/app/ui/dashboard/operations/add/add.module.css";
import { Check, DraftingCompass, Save } from "lucide-react";

const AddOperationPage = () => {
  const [operationType, setOperationType] = useState("");
  const [formData, setFormData] = useState({
    numero: "",
    operationType: "",
    operator: "",
    sellingPrice: "",
    commission: "",
    anipService: "",
    observations: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOperationChange = (event) => {
    const value = event.target.value;
    setOperationType(value);
    setFormData((prev) => ({ ...prev, operationType: value }));
  };

  
  const handleSubmit = async (status) => {
    if (
      !formData.numero ||
      !formData.operationType ||
      !formData.sellingPrice ||
      !formData.commission
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
  
    try {
      const response = await fetch("/api/operation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(`Opération ${status.toLowerCase()} avec succès`);
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert(errorData.message || "Erreur lors de l'enregistrement de l'opération");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur lors de la communication avec le serveur");
    }
  };
  

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => e.preventDefault()} 
      >
        <input
          type="text"
          name="numero"
          placeholder="Numéro de l'opération (OP-01-2025)"
          required
          value={formData.numero}
          onChange={handleInputChange}
        />
        {/* Type d'opération */}
        <select
          name="operationType"
          onChange={handleOperationChange}
          required
          value={formData.operationType}
        >
          <option value="">Type d'opération</option>
          <option value="Depot">Dépôt</option>
          <option value="Retrait">Retrait</option>
          <option value="Credit">Crédit</option>
          <option value="RechargeCarte">Recharge de carte</option>
          <option value="AchatCarte">Achat d'une carte</option>
          <option value="CanalPlus">Canal +</option>
          <option value="SBEE">SBEE</option>
          <option value="ANIP">ANIP</option>
        </select>
        {/* Opérateurs réseaux */}
        <select
          name="operator"
          id="operator"
          required
          disabled={operationType === "ANIP"}
          value={formData.operator}
          onChange={handleInputChange}
        >
          <option value="">Opérateurs mobiles</option>
          <option value="MTN">MTN</option>
          <option value="MoneyGram">MoneyGram</option>
          <option value="MOOV">MOOV</option>
          <option value="CELTIS">CELTIS</option>
          <option value="Ria">Ria</option>
        </select>
        <input
          type="text"
          name="sellingPrice"
          placeholder="Montant"
          required
          value={formData.sellingPrice}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="commission"
          placeholder="Commission"
          required
          value={formData.commission}
          onChange={handleInputChange}
        />
        {/* Services ANIP */}
        <select
          name="anipService"
          id="anipService"
          required
          disabled={operationType !== "ANIP"}
          value={formData.anipService}
          onChange={handleInputChange}
        >
          <option value="">Type de services ANIP</option>
          <option value="Acte de Naissance sécurisée">
            Acte de Naissance sécurisée
          </option>
          <option value="Carte d'identité personnelle">
            Carte d'identité personnelle
          </option>
          <option value="Numéro IFU">Numéro IFU</option>
        </select>
        <textarea
          name="observations"
          id="observations"
          rows="2"
          placeholder="Observations"
          value={formData.observations}
          onChange={handleInputChange}
        ></textarea>
        <div className={styles.button}>
          <button
            type="button"
            className={styles.draft}
            onClick={() => handleSubmit("DRAFT")}
          >
            <DraftingCompass size={15} />
            Brouillon
          </button>
          <button
            type="button"
            className={styles.save}
            onClick={() => handleSubmit("SAVED")}
          >
            <Save size={15} />
            Enregistrer l'opération
          </button>
          <button
            type="button"
            className={styles.validate}
            onClick={() => handleSubmit("VALIDATED")}
          >
            <Check size={15} />
            Valider l'opération
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOperationPage;
