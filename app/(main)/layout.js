import Navbar from "@/components/common/Navbar";
import connectMongo from "@/services/connectMongo";

export const metadata = {
  title: "Movie-DB",
  description: "Where you find all movie in a place!",
};

export default async function MainLayout({ children }) {
  await connectMongo();
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
