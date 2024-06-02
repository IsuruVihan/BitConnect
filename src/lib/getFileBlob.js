const getFileBlob = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(new Blob([reader.result]));
		};
		reader.onerror = reject;
		reader.readAsArrayBuffer(file);
	});
};

export default getFileBlob;