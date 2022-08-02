const pdf = require('pdf-creator-node');
const { capitalize, checkNameSize } = require('./utilities');
const fs = require('fs');

// DEFAULT
const options = {
	format: 'A4',
	orientation: 'landscape',
	border: '0mm',
	childProcessOptions: {
		env: {
			OPENSSL_CONF: '/dev/null',
		},
	},
};

// FONTS
// * HEADINGS
const bitmapHeadingFont = fs.readFileSync('assets/fonts/Deutsch-ex.ttf');
const headingFont = bitmapHeadingFont.toString('base64');
// * PARAGRAPHS
const bitmapParagraphFont = fs.readFileSync('assets/fonts/oldEnglish.ttf');
const paragraphFont = bitmapParagraphFont.toString('base64');

const generateFile = async ({
	title,
	name,
	size,
	plot,
	land,
	date,
	website,
	template,
}) => {
	if (
		!title ||
		!name ||
		!size ||
		!plot ||
		!land ||
		!date ||
		!website ||
		!template
	) {
		return null;
	}

	// CERTIFICATE LAYOUT
	const layout = fs.readFileSync(
		`assets/templates/${template}/template.html`,
		'utf8'
	);

	// CERTIFICATE BACKGROUND
	const bitmapBackground = fs.readFileSync(
		`assets/templates/${template}/background.jpg`
	);
	const background = bitmapBackground.toString('base64');

	var document = {
		html: layout,
		data: {
			title: capitalize(title),
			titleSize: checkNameSize(name),
			name: name,
			website: website,
			date: date,
			size: size,
			plot: plot,
			land: land,
			background: background,
			headingFont: headingFont,
			paragraphFont: paragraphFont,
		},
		path: `./certificates/${name}.pdf`,
		type: '',
	};

	await pdf.create(document, options);
};

module.exports = {
	generateFile,
};
