import { redirect } from "next/navigation";

export default function SearchInput() {
  const serverAction = async (formData) => {
    "use server";
    const value = formData.get("searchValue");
    if (!value.trim()) return; // Avoid redirecting if input is empty
    redirect(`/search?query=${encodeURIComponent(value)}`);
  };

  return (
    <form action={serverAction}>
      <input
        type="text"
        id="searchInput"
        placeholder="Search movies..."
        className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
        name="searchValue"
      />
      <button type="submit" className="hidden">
        Submit
      </button>
    </form>
  );
}
