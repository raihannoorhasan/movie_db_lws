import SearchModal from "@/components/compare/SearchModal";

export default function Modal({ searchParams }) {
  return <>{searchParams?.search && <SearchModal />}</>;
}
