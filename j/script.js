const searchText = document.querySelector("#searchText");
const colorText = document.querySelector("#colorText");
const color = document.querySelector("#colorPicker");
const title = document.querySelector("#title");

const colorBg = () => {
  //選択した色を背景色に設定
  document.body.style.backgroundColor = color.value;

  // テキストの色を変更
  const rgb = hexToRgb(color.value);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  title.style.color = brightness > 128 ? "#000000" : "#ffffff";

  //カラーコードを表示
  if (color.value === "#ffffff") {
    colorText.textContent = `カラーコード：${color.value}(white)`;
  } else if (color.value === "#000000") {
    colorText.textContent = `カラーコード：${color.value}(black)`;
  } else {
    colorText.textContent = `カラーコード：${color.value}`;
  }
};

// HEXカラーコードをRGBに変換する関数
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

//カラーピッカーが変更されたら colorBg を発動させる
color.addEventListener("input", colorBg);
