import "./globals.css";

export const metadata = {
  title: "Forge - Skill Exchange Platform | Freelance & Earn Embers",
  description:
    "Forge your path to new opportunities by exchanging skills or earning embers. A global platform for freelancers and project managers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
