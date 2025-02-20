import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import Image from "next/image";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdAnalytics,
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    title: "Enregistrements",
    list: [
      {
        title: "Tableau de bord",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Clients",
        path: "/dashboard/customers",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Cartes",
        path: "/dashboard/cartes",
        icon: <MdShoppingBag />,
      },
      {
        title: "Opérations",
        path: "/dashboard/operations",
        icon: <MdAttachMoney />,
      },
    ],
  },

  {
    title: "Données Analytiques",
    list: [
      // {
      //   title: "Bénéfice journalier",
      //   path: "/dashboard/revenue",
      //   icon: <MdWork />,
      // },
      {
        title: "Rapports",
        path: "/dashboard/rapports",
        icon: <MdAnalytics />,
      },
    ],
  },
  {
    title: "Utilisateurs",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="/noavatar.png"
          alt="Logo"
          width="40"
          height="40"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>Jean-Baptiste</span>
          <span className={styles.userTitle}>Administrateur</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
