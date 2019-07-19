const qr = require('qr-image');

module.exports = function(text) {
    let qr_svg = qr.image(text, { type: 'svg' });
    qr_svg.pipe(require('fs').createWriteStream('./public/images/qr/' + text + '.svg '));
    let svg_string = qr.imageSync(text, { type: 'svg' });
    return svg_string;
};