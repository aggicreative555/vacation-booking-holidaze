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
    <div className="flex justify-center mt-8 gap-6 flex-col max-w-fit mb-14">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-l btn-secondary disabled:hidden"
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
              className={`px-1 mx-4 my-2 text-base font-garamond tracking-wide hover:font-semibold cursor-pointer
                        ${currentPage === page ? 'border-b-2 border-crimson text-crimson' : 'text-dark border-b-2 border-white'}`}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-l btn-primary disabled:hidden"
      >
        next page
      </button>
    </div>
  );
};

export default Pagination;
