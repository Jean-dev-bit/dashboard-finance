"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import styles from "@/app/ui/dashboard/reports/reports.module.css";
import { toWords } from "number-to-words"; // Convertit les chiffres en lettres
import LanguageDetector from 'i18next-browser-languagedetector';

const ReportsPage = () => {
  const [cards, setCards] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportType, setReportType] = useState("hebdomadaire");

  const companyInfo = {
    name: "WesternAgency",
    address: "123 Avenue des Finances,Cotonou",
    phone: "+229 019 760 023 8",
    email: "contact@westernagency.com",
  };

  const userInfo = {
    name: "HOUEHA Constant",
    position: "Responsable Financier",
    email: "constant.houeha@gmail.com",
  };

  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch("http://localhost:3000/api/card");
      if (res.ok) {
        const data = await res.json();
        setCards(data);
      } else {
        console.error("Erreur lors de la récupération des cartes");
        alert("Erreur lors de la récupération des cartes.");
      }
    };

    fetchCards();
  }, []);

  const filterDataByDate = () => {
    if (!startDate || !endDate) return [];

    const start = new Date(startDate);
    const end = new Date(endDate);

    return cards.filter((card) => {
      const cardDate = new Date(card.createdAt);
      return cardDate >= start && cardDate <= end;
    });
  };

//   const generatePDF = async () => {
//     const filteredData = filterDataByDate();
//     if (filteredData.length === 0) {
//       alert("Aucune donnée trouvée pour cette période.");
//       return;
//     }

//     const doc = new jsPDF();

//     const logo = "/finance.jpg";
//     doc.addImage(logo, "JPG", 14, 10, 30, 30);

//     doc.setFontSize(10);
//     doc.text(companyInfo.name, 50, 20);
//     doc.setFontSize(8);
//     doc.text(companyInfo.address, 50, 27);
//     doc.text(`${companyInfo.phone}, ${companyInfo.email}`, 50, 34);

//     doc.setLineWidth(0.1); 
//     doc.line(14, 40, 196, 40); 

//     doc.setFontSize(8);
//     doc.text("Rapport des Ventes", 14, 50);
//     doc.setFontSize(8);
//     doc.text(`Période : ${startDate} - ${endDate}`, 14, 58);

//     autoTable(doc, {
//       head: [["Client", "Banque", "Type", "Quantité", "Prix", "Commission"]],
//       body: filteredData.map((card) => [
//         card.client
//           ? `${card.client.nom} ${card.client.prenoms}`
//           : "Client inconnu",
//         card.bankName,
//         card.cardType,
//         card.quantity,
//         `${card.sellingPrice} FCFA`,
//         `${card.commission} FCFA`,
//       ]),
//       startY: 65,
//     });

//     const qrData = `Nom: ${userInfo.name}\nEmail: ${userInfo.email}\nPoste: ${userInfo.position}`;
//     const qrImage = await QRCode.toDataURL(qrData);

//     const pageHeight = doc.internal.pageSize.height;
//     doc.setFontSize(8);
//     doc.text(
//       `Généré par : ${userInfo.name} - ${userInfo.position}`,
//       14,
//       pageHeight - 30
//     );
//     doc.text(`${userInfo.email}`, 14, pageHeight - 22);
//     doc.addImage(qrImage, "PNG", 170, pageHeight - 40, 25, 25);

//     doc.save(`rapport_${reportType}.pdf`);
//   };





const generatePDF = async () => {
  const filteredData = filterDataByDate();
  if (filteredData.length === 0) {
    alert("Aucune donnée trouvée pour cette période.");
    return;
  }

  const doc = new jsPDF();

  const logo = "/finance.jpg";
  doc.addImage(logo, "JPG", 14, 10, 30, 30);

  doc.setFontSize(10);
  doc.text(companyInfo.name, 50, 20);
  doc.setFontSize(8);
  doc.text(companyInfo.address, 50, 27);
  doc.text(`${companyInfo.phone}, ${companyInfo.email}`, 50, 34);

  doc.setLineWidth(0.1);
  doc.line(14, 40, 196, 40);

  doc.setFontSize(8);
  doc.text("Rapport des Ventes", 14, 50);
  doc.setFontSize(8);
  doc.text(`Période : ${startDate} - ${endDate}`, 14, 58);

  // 1️⃣ **Calcul des Totaux**
  const totalHT = filteredData.reduce((sum, card) => sum + (card.sellingPrice * card.quantity), 0); // Total HT correct
  const TVA = totalHT * 0.18; // TVA 18%
  const totalTTC = totalHT + TVA;
  
  // Utiliser number-to-words pour obtenir le total en lettres en français
  const totalEnLettres = toWords(totalTTC, { LanguageDetector}).toUpperCase() + " FRANCS CFA";

  // 2️⃣ **Tableau avec les données**
  const startY = 65; // Définir un point de départ pour le tableau

  autoTable(doc, {
    head: [["Client", "Banque", "Type", "Quantité", "Prix", "Commission"]],
    body: [
      ...filteredData.map((card) => [
        card.client
          ? `${card.client.nom} ${card.client.prenoms}`
          : "Client inconnu",
        card.bankName,
        card.cardType,
        card.quantity,
        `${card.sellingPrice} FCFA`,
        `${card.commission} FCFA`,
      ]),
      // 3️⃣ **Ajout du Total HT, TVA et Total TTC**
      ["", "", "", "TOTAL HT", `${totalHT} FCFA`, ""],
      ["", "", "", "TVA (18%)", `${TVA.toFixed(2)} FCFA`, ""],
      ["", "", "", "TOTAL TTC", `${totalTTC.toFixed(2)} FCFA`, ""],
    ],
    startY: startY,
  });

//   // 4️⃣ **Affichage du total en lettres**
//   doc.setFontSize(10);
//   doc.text(`${totalEnLettres}`, 14, startY + 60);  // Positionnement manuel, ajuster si nécessaire

  // QR Code pour l'utilisateur
  const qrData = `Nom: ${userInfo.name}\nEmail: ${userInfo.email}\nPoste: ${userInfo.position}`;
  const qrImage = await QRCode.toDataURL(qrData);

  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.text(
    `Généré par : ${userInfo.name} - ${userInfo.position}`,
    14,
    pageHeight - 30
  );
  doc.text(`${userInfo.email}`, 14, pageHeight - 22);
  doc.addImage(qrImage, "PNG", 170, pageHeight - 40, 25, 25);

  doc.save(`rapport_${reportType}.pdf`);
};




  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Générer un Rapport</h2>

      <div className={styles.date}>
        <div className={styles.dateField}>
          <label>Date de début</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className={styles.dateField}>
          <label>Date de fin</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.type}>
        <label>Type de rapport</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="hebdomadaire">Hebdomadaire</option>
          <option value="mensuel">Mensuel</option>
          <option value="personnalise">Personnalisé</option>
        </select>
      </div>
      <button className={styles.generateButton} onClick={generatePDF}>
        Télécharger le rapport
      </button>
    </div>
  );
};

export default ReportsPage;
