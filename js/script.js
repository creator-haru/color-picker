document.addEventListener("DOMContentLoaded", (event) => {
  // 初期背景色を白に設定
  document.body.style.backgroundColor = "#ffffff";

  const searchText = document.querySelector("#searchText");
  const colorText = document.querySelector("#colorText");
  const colorPicker = document.querySelector("#colorPicker");
  const colorInput = document.querySelector("#colorInput");
  const title = document.querySelector("#title");
  const arrow = document.querySelector('.arrow');

  const updateTextColor = (color) => {
    const rgb = hexToRgb(color);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    const textColor = brightness > 128 ? "#000000" : "#ffffff";
    title.style.color = textColor;
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const colorBg = () => {
    //選択した色を背景色に設定
    document.body.style.backgroundColor = colorPicker.value;

    // テキストの色を変更
    const rgb = hexToRgb(colorPicker.value);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    title.style.color = brightness > 128 ? "#000000" : "#ffffff";

    // カラーコードを表示
    if (colorPicker.value === "#ffffff") {
      colorText.textContent = `カラーコード：${colorPicker.value}(white)`;
    } else if (colorPicker.value === "#000000") {
      colorText.textContent = `カラーコード：${colorPicker.value}(black)`;
    } else {
      colorText.textContent = `カラーコード：${colorPicker.value}`;
    }
  };

  const handleColorPickerInput = (event) => {
    const color = event.target.value;
    colorInput.value = color;
    document.body.style.backgroundColor = color; // 背景色を変更
    updateTextColor(color);
  };

  const handleColorInput = (event) => {
    let color = event.target.value;
    if (!color.startsWith('#')) {
      color = '#' + color;
    }
    document.body.style.backgroundColor = color; // 背景色を変更
    event.target.value = color; // #が消えないようにする
    updateTextColor(color);
  };

  const handleHomeClick = () => {
    colorPickerSection.style.display = 'none';
    menuContent.style.display = 'none'; // メニューを閉じる
  };

  const handleColorToCodeClick = () => {
    colorPickerSection.style.display = 'flex';
    colorPicker.style.display = 'block';
    colorInput.style.display = 'none';
    menuContent.style.display = 'none'; // メニューを閉じる
    document.body.style.backgroundColor = colorPicker.value; // 背景色を変更
    updateTextColor(colorPicker.value);
  };

  const handleCodeToColorClick = () => {
    colorPickerSection.style.display = 'flex';
    colorPicker.style.display = 'none';
    colorInput.style.display = 'block';
    colorInput.style.marginTop = '1rem'; // 矢印の下に配置
    menuContent.style.display = 'none'; // メニューを閉じる
    document.body.style.backgroundColor = colorInput.value; // 背景色を変更
    updateTextColor(colorInput.value);
  };

  //カラーピッカーが変更されたら colorBg を発動させる
  colorPicker.addEventListener("input", colorBg);

  // URLパラメータからカラーコードを取得して設定
  const urlParams = new URLSearchParams(window.location.search);
  const colorCode = urlParams.get("color");
  if (colorCode) {
    colorPicker.value = colorCode;
    colorBg();
  }

  const menuButton = document.getElementById('menuButton');
  const menuContent = document.getElementById('menuContent');
  const home = document.getElementById('home');
  const colorToCode = document.getElementById('colorToCode');
  const codeToColor = document.getElementById('codeToColor');
  const colorPickerSection = document.getElementById('colorPickerSection');

  menuButton.addEventListener('click', () => {
    menuContent.style.display = menuContent.style.display === 'flex' ? 'none' : 'flex';
  });

  home.addEventListener('click', handleHomeClick);

  colorToCode.addEventListener('click', handleColorToCodeClick);

  codeToColor.addEventListener('click', handleCodeToColorClick);

  colorPicker.addEventListener('input', handleColorPickerInput);

  colorInput.addEventListener('input', handleColorInput);

  // 初期状態で#を入力された状態にする
  colorInput.value = '#';

  // deleteキーやバックスペースキーで#が消えないようにする
  colorInput.addEventListener('keydown', (event) => {
    if ((event.key === 'Backspace' || event.key === 'Delete') && colorInput.selectionStart <= 1) {
      event.preventDefault();
    }
  });

  // テキストの色を黒に固定
  searchText.style.color = "#000000";
  colorText.style.color = "#000000";
  arrow.style.color = "#000000";
});
