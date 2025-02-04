// import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
// import Image from "next/image";

// const SingleUserPage = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.infoContainer}>
//         <div className={styles.imgContainer}>
//           <Image src="/noavatar.png" alt="" fill />
//         </div>
//         Undefined
//       </div>
//       <div className={styles.formContainer}>
//         <form action="" className={styles.form}>
//           <label>Nom</label>
//           <input type="text" name="username" placeholder="Nom" />
//           <label>Prénoms</label>
//           <input name="prenoms" type="text" placeholder="Prénoms" required />
//           <label>Email</label>
//           <input name="email" type="email" placeholder="Email" required />
//           <label>Profession</label>
//           <input
//             name="profession"
//             type="text"
//             placeholder="Profession"
//             required
//           />
//           <label>Téléphone</label>
//           <input
//             type="phone"
//             name="username"
//             placeholder="(+229) 53 56 44 97"
//           />
//           <label>Adresse</label>
//           <textarea
//             name="address"
//             id="address"
//             rows="2"
//             placeholder="Cotonou"
//           ></textarea>
//           <label>Sexe</label>
//           <select name="sexe" required>
//             <option value="" disabled selected>
//               Sexe
//             </option>
//             <option value="Masculin">Masculin</option>
//             <option value="Féminin">Féminin</option>
//             <option value="Autres">Autres</option>
//           </select>
//           <button type="submit">Mettre à jour les informations</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SingleUserPage;

// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
// import Image from "next/image";

// const SingleCustomerPage = () => {
//   const { id } = useParams(); // Récupère l'ID dynamique depuis l'URL
//   console.log(id);
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({
//     nom: "",
//     prenoms: "",
//     email: "",
//     profession: "",
//     telephone: "",
//     sexe: "",
//     adresse: "",
//   });

//   useEffect(() => {
//     if (id) {
//       console.log(id); // Vérifier l'ID avant de faire la requête
//       const fetchUser = async () => {
//         const res = await fetch(`/api/addClient/${id}`);
//         if (res.ok) {
//           const data = await res.json();
//           setUser(data);
//           setFormData({
//             nom: data.nom,
//             prenoms: data.prenoms,
//             email: data.email,
//             profession: data.profession,
//             telephone: data.telephone,
//             sexe: data.sexe,
//             adresse: data.adresse || "",
//           });
//         } else {
//           alert("Erreur lors de la récupération des données du client.");
//         }
//       };
  
//       fetchUser();
//     }
//   }, [id]);
  

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData); // Vérifier les données envoyées
//     const res = await fetch(`/api/addClient/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });
  
//     if (res.ok) {
//       alert("Client mis à jour avec succès !");
//     } else {
//       alert("Erreur lors de la mise à jour du client.");
//     }
//   };
  

//   if (!id) {
//     return <div>Chargement...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.infoContainer}>
//         <div className={styles.imgContainer}>
//           <Image src="/noavatar.png" alt="Avatar" fill />
//         </div>
//         {user && (
//           <div>
//             {user.nom} {user.prenoms}
//           </div>
//         )}
//       </div>
//       <div className={styles.formContainer}>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <label>Nom</label>
//           <input
//             type="text"
//             name="nom"
//             value={formData.nom}
//             onChange={handleInputChange}
//             placeholder="Nom"
//           />
//           <label>Prénoms</label>
//           <input
//             type="text"
//             name="prenoms"
//             value={formData.prenoms}
//             onChange={handleInputChange}
//             placeholder="Prénoms"
//             required
//           />
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Email"
//             required
//           />
//           <label>Profession</label>
//           <input
//             type="text"
//             name="profession"
//             value={formData.profession}
//             onChange={handleInputChange}
//             placeholder="Profession"
//             required
//           />
//           <label>Téléphone</label>
//           <input
//             type="text"
//             name="telephone"
//             value={formData.telephone}
//             onChange={handleInputChange}
//             placeholder="(+229) 53 56 44 97"
//           />
//           <label>Adresse</label>
//           <textarea
//             name="adresse"
//             value={formData.adresse}
//             onChange={handleInputChange}
//             rows="2"
//             placeholder="Cotonou"
//           ></textarea>
//           <label>Sexe</label>
//           <select
//             name="sexe"
//             value={formData.sexe}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="" disabled>
//               Sexe
//             </option>
//             <option value="Masculin">Masculin</option>
//             <option value="Féminin">Féminin</option>
//           </select>
//           <button type="submit">Mettre à jour les informations</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SingleCustomerPage;



"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleCustomerPage = () => {
  const { id } = useParams(); 
  console.log(id);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenoms: "",
    email: "",
    profession: "",
    telephone: "",
    sexe: "",
    adresse: "",
  });

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const res = await fetch(`/api/addClient/${id}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data); 
          setFormData({
            nom: data.nom,
            prenoms: data.prenoms,
            email: data.email,
            profession: data.profession,
            telephone: data.telephone,
            sexe: data.sexe,
            adresse: data.adresse || "",
          }); 
        } else {
          alert("Erreur lors de la récupération des données du client.");
        }
      };

      fetchUser();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/addClient/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Client mis à jour avec succès !");
    } else {
      alert("Erreur lors de la mise à jour du client.");
    }
  };

  if (!id) {
    return <div>Chargement...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="Avatar" fill />
        </div>
        {user && (
          <div>
            {user.nom} {user.prenoms}
          </div>
        )}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            placeholder="Nom"
          />
          <label>Prénoms</label>
          <input
            type="text"
            name="prenoms"
            value={formData.prenoms}
            onChange={handleInputChange}
            placeholder="Prénoms"
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <label>Profession</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            placeholder="Profession"
            required
          />
          <label>Téléphone</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            placeholder="(+229) 53 56 44 97"
          />
          <label>Adresse</label>
          <textarea
            name="adresse"
            value={formData.adresse}
            onChange={handleInputChange}
            rows="2"
            placeholder="Cotonou"
          ></textarea>
          <label>Sexe</label>
          <select
            name="sexe"
            value={formData.sexe}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Sexe
            </option>
            <option value="Masculin">Masculin</option>
            <option value="Féminin">Féminin</option>
          </select>
          <button type="submit">Mettre à jour les informations</button>
        </form>
      </div>
    </div>
  );
};

export default SingleCustomerPage;
