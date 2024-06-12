const areObjectsIdentical = (obj1, obj2) => {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	// Check if the number of keys is different
	if (keys1.length !== keys2.length) {
		return false;
	}

	// Check if all keys and their values are identical
	for (let key of keys1) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}

	return true;
}

export default areObjectsIdentical;