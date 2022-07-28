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

// Get order items that are going to be processed in the printer.
const filterOrder = (res, order) => {
	if (!order || !order.line_items) {
		res.status(400);
		throw new Error('Order products not found.');
	}

	const filterOptions = process.env.PROCESSED_PRODUCT_ID.split(',');

	const products = order.line_items.filter((product) =>
		filterOptions.includes(String(product.product_id))
	);

	return products;
};

// Create PDF for each product inside order.
const createCertificate = asyncHandler(async (req, res) => {
	if (!req.params.id) {
		res.status(400);
		throw new Error('Order not found.');
	}

	const order = await getShopifyOrder(res, req.params.id);
	const products = filterOrder(res, order);

	res.status(200).json(products);
});

module.exports = {
	createCertificate,
};
