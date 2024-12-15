const MapBox = () => {
	return (
		<div className="map-canvas">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805.527545995477!2d-66.0090058242473!3d45.3179685710719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca7b25fd43639ed%3A0x1bbc510b084a49bc!2sSaint%20John%2C%20NB%20E2J%204N2%2C%20Canada!5e0!3m2!1sen!2sbd!4v1733976193796!5m2!1sen!2sbd"
				loading="lazy"
			></iframe>
		</div>
	);
};

export default MapBox;
