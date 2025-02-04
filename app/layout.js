// import { Inter } from "next/font/google";
import "./ui/globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Finance",
    default: "Finance",
  },
  description: "Application de la gestion financière",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      {/* className={inter.className} */}
      <body>{children}</body>
    </html>
  );
}
