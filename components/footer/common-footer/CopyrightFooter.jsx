import Social from './Social';

const CopyrightFooter = () => {
	return (
		<div className="footer-bottom">
			<div className="auto-container">
				<div className="outer-box">
					<div className="copyright-text">
						<p>
							© {new Date().getFullYear()} AllTheJobs by{' '}
							<a href="https://www.qwikit.ca/" target="_blank" rel="noopener noreferrer">
								qwikIT
							</a>
							. All Right Reserved.
						</p>
					</div>
					<div className="social-links">
						<Social />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CopyrightFooter;
