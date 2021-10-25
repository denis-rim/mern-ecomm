import { useRouter } from "next/router";

import ReactPaginate from "react-paginate";

export default function Pagination({ totalPages }) {
  const router = useRouter();

  const changePage = ({ selected }) => {
    if (selected === 0) {
      router.push("/");
    } else {
      router.push(`/?page=${selected + 1}`);
    }
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={changePage}
        pageLinkClassName={
          "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        }
        activeLinkClassName={
          "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
        }
        containerClassName={
          "hidden sm:flex-1 sm:flex sm:items-center sm:justify-center"
        }
        previousClassName={
          "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        }
        nextClassName={
          "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        }
      />
    </div>
  );
}
