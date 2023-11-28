

// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, setCurrentPage, totalPage }) => {
    
    const pages = [...Array(totalPage).keys()];

    // console.log(totalPage, pages, currentPage);

    return (
        <div className='mx-auto text-center my-5'>Page:
            {/* previous page */}
            <button onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0 ? true : false}
                className='btn btn-sm ml-5'>Prev</button>
            {/* all pages */}
            {
                pages?.map(page =>
                    <button key={page}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ?
                            'btn ml-5 btn-primary' :
                            'btn btn-sm ml-5'}>{page + 1}
                    </button>)
            }
            {/* next page */}
            <button onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPage - 1 ? true : false}
                className='btn btn-sm ml-5'>Next</button>
            {/* TODO: page item option */}
        </div>
    );
};

export default Pagination;