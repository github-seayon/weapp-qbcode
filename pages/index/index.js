// index.js
import regeneratorRuntime from '../../miniprogram_npm/regenerator-runtime/index';

import { Qrcode, Barcode } from '../../dist/index';

Page({
  data: {
    canvasBarId: 'barcanvas',
    canvasQrId: 'qrcanvas',
    canvasHidden: true,
    imagePath: '',
    placeholder: 'https://github.com/github-seayon', // 默认二维码生成文本
    text: 'https://github.com/github-seayon',
    types: [{ name: '条形码', value: 'barcode' }, { name: '二维码', value: 'qrcode' }],
  },
  async onLoad() {
    // this.handlerBarcode();
    // this.handlerQrcode();
  },
  handlerInput(e) {
    const { name } = e.currentTarget.dataset;
    const { value } = e.detail;
    const data = {};
    data[name] = value;
    this.setData(data);
  },
  // url转TempFilePath(
  async urlToTempFilePath(url) {
    const { tempFilePath } = await new Promise(((resolve, reject) => {
      wx.downloadFile({ url, success: resolve, fail: reject });
    }));
    return tempFilePath;
  },
  async handlerBarcode() {
    const { canvasBarId, text } = this.data;
    this.setData({ canvasHidden: false });
    const resTempFilePath = await new Promise((reslove) => {
      Barcode({
        canvasId: canvasBarId, width: 375, height: 160, text, callback: reslove,
      });
    });
    this.setData({ canvasHidden: true, imagePath: resTempFilePath.tempFilePath });
  },

  async handlerQrcode() {
    const { canvasQrId, text } = this.data;
    this.setData({ canvasHidden: false });
    const resTempFilePath = await new Promise((reslove) => {
      Qrcode({
        text,
        canvasId: canvasQrId,
        image: { imageResource: '../../assets/images/timg.jpeg', destWidth: 100, destHeight: 100 },
        width: 340,
        height: 340,
        callback: reslove,
      });
    });

    this.setData({ canvasHidden: true, imagePath: resTempFilePath.tempFilePath });
  },
});
