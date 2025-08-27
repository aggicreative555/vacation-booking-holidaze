import { useSearchParams } from 'react-router-dom';

const Pagination = ({ totalItems, itemsPerPage = 3 }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page });
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8 gap-2 flex-col max-w-fit">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="capitalize btn-l disabled:hidden"
      >
        previous page
      </button>
      <div className="flex flex-wrap">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-1 mx-4 my-2 text-black font-button cursor-pointer
                        ${currentPage === page ? 'border-b-2 border-black' : 'border-b-2 border-white'}`}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="capitalize btn-l disabled:hidden"
      >
        next page
      </button>
    </div>
  );
};

export default Pagination;
