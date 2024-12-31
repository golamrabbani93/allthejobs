export function base64ToFile(base64, fileName) {
	const [metadata, base64Data] = base64.split(',');
	const mime = metadata.match(/:(.*?);/)[1]; // Extract MIME type
	const byteString = atob(base64Data); // Decode base64 string
	const arrayBuffer = new Uint8Array(byteString.length);

	for (let i = 0; i < byteString.length; i++) {
		arrayBuffer[i] = byteString.charCodeAt(i);
	}

	return new File([arrayBuffer], fileName, {type: mime});
}
