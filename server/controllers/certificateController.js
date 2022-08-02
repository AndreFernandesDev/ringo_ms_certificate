const { getShopifyOrder, filterOrder } = require('../helpers/shopify');
const { generateFile } = require('../helpers/generateCertificate');
const asyncHandler = require('express-async-handler');

// Create PDF for each product inside order.
const createCertificate = asyncHandler(async (req, res) => {
	if (!req.params.id) {
		res.status(400);
		throw new Error('Order not found.');
	}

	const order = await getShopifyOrder(res, req.params.id);
	if (!order.length) {
		res.status(400);
		throw new Error('Order not found.');
	}

	const products = filterOrder(res, order);

	products.forEach(async (certificate) => {
		await generateFile(certificate);
	});

	res.status(200).json(products);
});

module.exports = {
	createCertificate,
};
