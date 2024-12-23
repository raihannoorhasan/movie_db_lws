import SearchModal from "@/components/compare/SearchModal";

export default function Modal({ searchParams }) {
  // console.log(searchParams);

  return <>{searchParams?.search && <SearchModal />}</>;
}
