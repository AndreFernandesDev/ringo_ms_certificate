const asyncHandler = require('express-async-handler');
const axios = require('axios');

// Get all order from API.
const getShopifyOrder = asyncHandler(async (res, id) => {
	if (!id) {
		res.status(400);
		throw new Error('Couldnt make request. Id not found.');
	}

	const order = await axios.get(
		`https://orders.establishedtitles.com/getsingleorder-et?o=${id}`
	);

	return order.data;
});

// Get details for template based on type of product
const valuesByProduct = {
	// Ladyship Title Pack - 5 Sq Ft
	5012738408507: {
		title: 'Lady',
		size: 'one foot by five feet',
		template: 'singleMain',
	},
	// Lordship Title Pack - 5 Sq Ft
	5012347879483: {
		title: 'Lord',
		size: 'one foot by five feet',
		template: 'singleMain',
	},
};

const getName = (properties) => {
	if (!properties) return '';
	const name = properties.filter(
		(prop) => prop.name === 'Enter Name of Recipient'
	)[0];

	return name ? (name.value ? name.value : '') : '';
};

// Store required values to process certificate.
const filterProduct = ({ product_id, properties }) => {
	if (!product_id || !properties) return {};

	const companyValues = {
		website: 'Estabilished Titles',
		date: new Date(),
		plot: 'E320648',
		land: 'Ebbleston',
	};

	const clientValues = {
		...valuesByProduct[product_id], // Title, Size
		name: getName(properties),
	};

	const values = { ...companyValues, ...clientValues };

	return values;
};

// Get order items that are going to be processed in the printer.
const filterOrder = (res, order) => {
	if (!order || !order.line_items) {
		res.status(400);
		throw new Error('Order products not found.');
	}

	// 1. Get list of product that need processing.
	const filterByProductId = process.env.PROCESSED_PRODUCT_ID.split(',');

	// 2. Check if order has products that need processing.
	const products = order.line_items.filter((product) =>
		filterByProductId.includes(String(product.product_id))
	);

	// 3. Retrieve info from product to generate certificate.
	const filteredProducts = products.map((product) => filterProduct(product));

	return filteredProducts;
};

module.exports = {
	getShopifyOrder,
	filterOrder,
};
