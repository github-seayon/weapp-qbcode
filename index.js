import Barcode0 from './src/barcode';
import Qrcode0 from './src/qrcode';

const { windowWidth } = wx.getSystemInfoSync();

function convert_length(length) {
  return Math.round((windowWidth * length) / 750);
}

export function Barcode(options = {}) {
  const o = { ...options, width: convert_length(options.width || 0), height: convert_length(options.height || 0) };
  Barcode0(o);
}

export function Qrcode(options = {}) {
  const { image } = options;
  if (image) {
    image.destWidth = convert_length(image.destWidth || 0);
    image.destHeight = convert_length(image.destHeight || 0);
  }
  const o = {
    ...options, image, width: convert_length(options.width || 0), height: convert_length(options.height || 0),
  };
  new Qrcode0(o);
}

export default {
  Barcode,
  Qrcode,
};
