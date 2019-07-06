const changePassword = document.querySelector('.change-password')
const hidden = document.querySelector('.hidden')

changePassword.addEventListener('click', e => {
  if (changePassword.innerHTML === '編輯') {
    changePassword.innerHTML = '關閉'
    hidden.innerHTML = `
    
      <div class="form-group">
        <label for="originPassword">原密碼</label>
        <input type="password" id="originPassword" name="originPassword" class="form-control"
        placeholder="請填寫當前密碼" />
      </div>
      <div class="form-group">
        <label for="password">密碼</label>
        <input type="password" id="password" name="password" class="form-control"
        placeholder="英文大小寫及數字至少各一，無特殊字符如：@#$%" />
      </div>
      <div class="form-group">
        <label for="password2">確認密碼</label>
        <input type="password" id="password2" name="password2" class="form-control" placeholder="確認密碼" />
      </div>
    
    `
  } else {
    changePassword.innerHTML = '編輯'
    hidden.innerHTML = ''
  }
})
