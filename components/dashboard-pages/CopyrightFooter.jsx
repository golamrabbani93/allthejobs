const CopyrightFooter = () => {
	return (
		<div className="copyright-text">
			<p>
				© {new Date().getFullYear()} AllTheJobs by{' '}
				<a href="https://www.qwikit.ca/" target="_blank" rel="noopener noreferrer">
					qwikIT
				</a>
				. All Right Reserved.
			</p>
		</div>
	);
};

export default CopyrightFooter;
