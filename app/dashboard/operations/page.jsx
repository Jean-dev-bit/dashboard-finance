import { PrismaClient } from "@prisma/client";
import styles from "@/app/ui/dashboard/operations/operations.module.css";
import Search from "@/app/ui/dashboard/search/search";
import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

const getOperations = async () => {
  try {
    return await prisma.operation.findMany({
      include: {
        operationType: true,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des opérations", error);
    return [];
  }
};

const Operations = async () => {
  const operations = await getOperations();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Rechercher une opération" />
        <Link href="/dashboard/operations/add">
          <button className={styles.addButton}>
            Enregistrer une opération
          </button>
        </Link>
      </div>
      <div className={styles.date}>
        <div className={styles.dateField}>
          <label htmlFor="start">Date de début</label>
          <input type="date" id="start" />
        </div>
        <div className={styles.dateField}>
          <label htmlFor="end">Date de fin</label>
          <input type="date" id="end" />
        </div>
      </div>

      <table className={styles.Operations}>
        <thead>
          <tr className={styles.bolders}>
            <td>Numéro Opération</td>
            <td>Type de l'opération</td>
            <td>Réseaux</td>
            <td>Montant</td>
            <td>Commission</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {operations.length > 0 ? (
            operations.map((operation) => (
              <tr className={styles.bolders} key={operation.id}>
                <td>{operation.numero}</td>
                <td>{operation.operationType.name}</td>
                <td>MTN</td>
                <td>{operation.sellingPrice}</td>
                <td>{operation.commission}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/operations/${operation.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        Voir
                      </button>
                    </Link>
                    <button className={`${styles.button} ${styles.delete}`}>
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Aucune opération enregistrée</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles.totals}>
        <p className="">Total des opérations : {operations.length}</p>
        <p className="">
          Total des commissions :{" "}
          {operations.reduce((sum, op) => sum + op.commission, 0)}
        </p>
        <span className={styles.download}>
          {" "}
          <ArrowDownToLine size={15} /> Télécharger la version PDF
        </span>
      </div>
    </div>
  );
};

export default Operations;
