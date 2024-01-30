// ==UserScript==
// @name            UIT - Auto Login
// @author          Kevin Nitro
// @namespace       https://github.com/KevinNitroG
// @version         1.1
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

function actionWecode(username, password) {
  document.getElementById('username').value = username;
  document.getElementById('password').value = password;
  document.getElementsByClassName('form-check-label')[0].click();
  document.getElementById('sharif_submit').click();
}

function actionCourses(username, password) {
  document.getElementById('username').value = username;
  document.getElementById('password').value = password;
  // document.getElementById('rememberusername').click();
  document.getElementById('loginbtn').click();
}

function actionDRL(username, password) {
  document.getElementById('edit-name').value = username;
  document.getElementById('edit-pass').value = password;
  document.getElementById('edit-submit').click();
}

function actionOtherLinks(username, password, timeout) {
  try {
    document.getElementById('edit-name').value = username;
    document.getElementById('edit-pass').value = password;
  } catch {}
  try {
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;
  } catch {}
  setTimeout(() => {
    document.getElementById('edit-submit').click();
  }, timeout);
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
  while (timeBeforeSubmit < 4000) {
    timeBeforeSubmit =
      Number(
        window.prompt(
          'Nhập thời gian trước khi submit, mục đích để solve captcha cho các trang có captcha, nên > 4(s)',
          -1
        )
      ) * 1000;
  }
  GM_setValue('username', username);
  GM_setValue('password', password);
  GM_setValue('timeBeforeSubmit', timeBeforeSubmit);
  return [username, password, timeBeforeSubmit];
}

function action(username, password, timeout) {
  if (window.location.href.startsWith('https://khmt.uit.edu.vn/wecode')) {
    actionWecode(username, password);
    return;
  }
  if (window.location.href === 'https://courses.uit.edu.vn/login/index.php') {
    actionCourses(username, password);
    return;
  }
  if (window.location.origin === 'https://drl.uit.edu.vn') {
    actionDRL(username, password);
    return;
  }
  const otherLinks = ['https://daa.uit.edu.vn', 'https://student.uit.edu.vn'];
  if (otherLinks.includes(window.location.origin)) {
    actionOtherLinks(username, password, timeout);
  }
}

(function () {
  'use strict';
  let username = GM_getValue('username', '');
  let password = GM_getValue('password', '');
  let timeBeforeSubmit = GM_getValue('timeBeforeSubmit', 0);
  if (!username || !password || timeBeforeSubmit < 4000) {
    [username, password, timeBeforeSubmit] = setVariables();
  }
  action(username, password, timeBeforeSubmit);
})();
