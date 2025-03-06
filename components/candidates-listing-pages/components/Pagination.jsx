const Pagination = ({totalPages, currentPage, handlePageChange, content}) => {
	return (
		content?.length > 0 && (
			<nav className="ls-pagination">
				<ul>
					{currentPage > 1 ? (
						<li className="prev">
							<a
								href="#"
								onClick={() => {
									handlePageChange(currentPage - 1);
								}}
							>
								<i className="fa fa-arrow-left"></i>
							</a>
						</li>
					) : (
						<li className="prev">
							{/* <a href="#">
								<i className="fa fa-arrow-left cursor-not-allowed hove:none"></i>
							</a> */}
							<button disabled>
								<i className="fa fa-arrow-left "></i>
							</button>
						</li>
					)}

					{[...Array(totalPages)?.keys()]?.map((x) => (
						<li key={x + 1}>
							<a
								className={currentPage == x + 1 ? 'current-page' : ''}
								href="#"
								onClick={() => {
									handlePageChange(x + 1);
								}}
							>
								{x + 1}
							</a>
						</li>
					))}
					{currentPage < totalPages ? (
						<li className="next">
							<a
								href="#"
								onClick={() => {
									handlePageChange(currentPage + 1);
								}}
							>
								<i className="fa fa-arrow-right"></i>
							</a>
						</li>
					) : (
						<li className="next">
							<button disabled>
								<i className="fa fa-arrow-right "></i>
							</button>
						</li>
					)}
				</ul>
			</nav>
		)
	);
};

export default Pagination;
