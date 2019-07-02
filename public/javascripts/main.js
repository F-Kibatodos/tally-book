const categoryEls = document.querySelectorAll('.category')
const sum = document.querySelector('.sum')
const costs = document.querySelectorAll('#cost')
let total = 0 // 總金額

for (let el of categoryEls) {
  switch (el.innerHTML) {
    case '家居物業':
      el.innerHTML = `<i class="fas fa-home"></i>`
      break
    case '交通出行':
      el.innerHTML = `<i class="fas fa-shuttle-van"></i>`
      break
    case '休閒娛樂':
      el.innerHTML = `<i class="fas fa-grin-beam"></i>`
      break
    case '餐飲食品':
      el.innerHTML = `<i class="fas fa-utensils"></i>`
      break
    case '其他':
      el.innerHTML = `<i class="fas fa-pen"></i>`
      break
  }
}

for (let cost of costs) {
  total += parseInt(cost.innerHTML)
}
sum.innerHTML = total
