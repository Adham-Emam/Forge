import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { roboto } from "./util/fonts";

export const metadata = {
  title: "Forge - Skill Exchange Platform | Freelance & Earn Embers",
  description:
    "Forge your path to new opportunities by exchanging skills or earning embers. A global platform for freelancers and project managers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextTopLoader
          color="var(--molten-orange)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px var(--ember-yellow),0 0 5px var(--molten-orange)"
          zIndex={2000}
          showSpinner={false}
        />
        {children}
      </body>
    </html>
  );
}
