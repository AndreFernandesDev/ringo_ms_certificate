const capitalize = (string) => {
	if (!string) return '';
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// Change size of text depending on the length of the name.
const checkNameSize = (name) => {
	if (!name) return 'size_1';

	if (name.length > 30) {
		return 'size_3';
	} else if (name.length > 45) {
		return 'size_2';
	} else {
		return 'size_1';
	}
};

const formatDate = (date) => {};

module.exports = {
	capitalize,
	checkNameSize,
};
