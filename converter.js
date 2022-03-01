const asciiDoctor = require('@asciidoctor/core')();
const docbookConverter = require('@asciidoctor/docbook-converter');
const pandoc = require('node-pandoc');
const fs = require('fs');

docbookConverter.register();

const SOURCE_DIR = './content/';

function pandocCallback(err, result, file) {
	if (err) {
		console.error(`something went wrong while converting ${file} to '.docx'`, err);
	}
	return result
}

function convert() {
	try { // try reading source directory
		fs.readdirSync(SOURCE_DIR).forEach(file => {
			if (file.endsWith('.adoc')) {
				try {
					// read the file
					const content = fs.readFileSync(SOURCE_DIR + file, 'utf8');
					// convert to docbook
					const docbook = asciiDoctor.convert(content, { backend: 'docbook5' });
					// check if the build directory exists, if not create the directory
					fs.existsSync('build') || fs.mkdirSync('build');
					// convert to docx
					pandoc(docbook, `--from docbook --to docx --output build/${file.replace('.adoc', '.docx')}`, (err, result) => pandocCallback(err, result, file));

				} catch (fileReadErr) {
					throw fileReadErr;
				}
			}
		});
	} catch (dirReadErr) {
		throw dirReadErr;
	}
}

convert();