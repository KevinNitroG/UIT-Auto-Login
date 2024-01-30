// ==UserScript==
// @name            UIT - Auto Login
// @author          Kevin Nitro
// @namespace       https://github.com/KevinNitroG
// @version         1.0
// @description     Tự động login tài khoản sinh viên web UIT
// @license         https://github.com/KevinNitroG/UIT-Auto-Login/raw/main/LICENSE
// @match           https://*.uit.edu.vn/*
// @icon            https://github.com/KevinNitroG/UIT-Auto-Login/raw/main/assets/imgs/UIT-logo.png
// @downloadURL     https://github.com/KevinNitroG/UIT-Auto-Login/raw/main/src/UIT-Auto-Login.user.js
// @updateURL       https://github.com/KevinNitroG/UIT-Auto-Login/raw/main/src/UIT-Auto-Login.user.js
// @supportURL      https://github.com/KevinNitroG/UIT-Auto-Login/issues
// @grant           GM_setValue
// @grant           GM_getValue
// ==/UserScript==

function fillInAccount(username, password) {
  document.getElementById('edit-name').value = username;
  document.getElementById('edit-pass').value = password;
}

function submit() {
  document.getElementById('edit-submit').click();
}

function setVariables() {
  let username = '';
  let password = '';
  let timeBeforeSubmit = -1;
  window.alert(
    'Hãy đảm bảo đã cài userscript / extension ấn / giải captcha (v2)'
  );
  while (username === '') {
    username = window.prompt('Nhập MSSV', '');
  }
  while (password === '') {
    password = window.prompt('Nhập mật khẩu', '');
  }
  while (timeBeforeSubmit < 3000) {
    timeBeforeSubmit =
      Number(
        window.prompt(
          'Nhập thời gian trước khi submit, mục đích để solve captcha, nên > 3(s)',
          -1
        )
      ) * 1000;
  }
  GM_setValue('username', username);
  GM_setValue('password', password);
  GM_setValue('timeBeforeSubmit', timeBeforeSubmit);
  return [username, password, timeBeforeSubmit];
}

(function () {
  'use strict';
  let username = GM_getValue('username', '');
  let password = GM_getValue('password', '');
  let timeBeforeSubmit = GM_getValue('timeBeforeSubmit', 0);
  if (!username || !password || timeBeforeSubmit < 3000) {
    [username, password, timeBeforeSubmit] = setVariables();
  }
  fillInAccount(username, password);
  setTimeout(submit, timeBeforeSubmit);
})();
