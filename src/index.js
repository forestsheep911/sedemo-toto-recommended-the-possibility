/* eslint-disable no-console */
import './smile.css'
import './recommend.css'
import Swal from 'sweetalert2'
import img0 from '../img/0.png'
import img1 from '../img/1.png'
import img2 from '../img/2.png'
import img3 from '../img/3.png'
import img4 from '../img/4.png'

const htmlSmile = `
<div class='outter'>
  <div class="icon-border" value=1>
    <img id="sm0"><br>
    <div>1</div>
  </div>
  <div class="icon-border" value=2>
    <img id="sm1"><br>
    <div>2</div>
  </div>
  <div class="icon-border" value=3>
    <img id="sm2"><br>
    <div>3</div>
  </div>
  <div class="icon-border" value=4>
    <img id="sm3"><br>
    <div>4</div>
  </div>
  <div class="icon-border" value=5>
    <img id="sm4"><br>
    <div>5</div>
  </div>
</div>`
const htmlRecommend = `
<div class='outter'>
  <div class="number-border" value=0>
    <div>0</div>
  </div>
  <div class="number-border" value=1>
    <div>1</div>
  </div>
  <div class="number-border" value=2>
    <div>2</div>
  </div>
  <div class="number-border" value=3>
    <div>3</div>
  </div>
  <div class="number-border" value=4>
    <div>4</div>
  </div>
  <div class="number-border" value=5>
    <div>5</div>
  </div>
  <div class="number-border" value=6>
    <div>6</div>
  </div>
  <div class="number-border" value=7>
    <div>7</div>
  </div>
  <div class="number-border" value=8>
    <div>8</div>
  </div>
  <div class="number-border" value=9>
    <div>9</div>
  </div>
  <div class="number-border" value=10>
    <div>10</div>
  </div>
</div>
`

kintone.events.on(['app.record.detail.show'], (event) => {
  const recordParm = {}
  recordParm.app = kintone.app.getId()
  recordParm.id = kintone.app.record.getId()
  recordParm.record = {
    fd_smile: {},
    fd_recommend: {},
  }
  kintone.app.record.setFieldShown('fd_smile', false)
  kintone.app.record.setFieldShown('fd_recommend', false)
  const eleKara = kintone.app.record.getSpaceElement('kara')
  const eleBtn = document.createElement('button')
  eleBtn.innerText = '开始评价'
  eleBtn.onclick = () => {
    Swal.fire({
      icon: 'question',
      title: '您的满意度是？',
      html: htmlSmile,
      width: '80%',
      confirmButtonText: 'Next',
      didOpen: () => {
        const sm0 = document.querySelector('#sm0')
        sm0.src = img0
        const sm1 = document.querySelector('#sm1')
        sm1.src = img1
        const sm2 = document.querySelector('#sm2')
        sm2.src = img2
        const sm3 = document.querySelector('#sm3')
        sm3.src = img3
        const sm4 = document.querySelector('#sm4')
        sm4.src = img4
        const imgs = document.querySelectorAll('.icon-border')
        imgs.forEach((el) => {
          const elcp = el
          elcp.onclick = function selectSmile() {
            imgs.forEach((el2) => {
              if (el.isEqualNode(el2)) {
                if (this.classList.contains('selected')) {
                  this.classList.remove('selected')
                } else {
                  this.classList.add('selected')
                }
              } else {
                el2.classList.remove('selected')
              }
            })
            const selectedItem = document.querySelector('.selected')
            // const kinRecord = kintone.app.record.get()
            // kinRecord.record.fd_smile.value = selectedItem.getAttribute('value')
            recordParm.record.fd_smile = {
              value: selectedItem.getAttribute('value'),
            }
            // kintone.app.record.set(kinRecord)
          }
        })
      },
      preConfirm: () => {
        console.log('confirming')
        if (document.querySelector('.selected')) {
          return true
        }
        Swal.getTitle().textContent = '错误！请先选择满意度。'
        return false
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'question',
          title: '如果要推荐给朋友，您的推荐度是？',
          html: htmlRecommend,
          width: '80%',
          confirmButtonText: '提交',
          didOpen: () => {
            const recommendNumber = document.querySelectorAll('.number-border')
            recommendNumber.forEach((el) => {
              const elcp = el
              elcp.onclick = function selectSmile() {
                recommendNumber.forEach((el2) => {
                  if (el.isEqualNode(el2)) {
                    if (this.classList.contains('selected')) {
                      this.classList.remove('selected')
                    } else {
                      this.classList.add('selected')
                    }
                  } else {
                    el2.classList.remove('selected')
                  }
                })
                const selectedItem = document.querySelector('.selected')
                recordParm.record.fd_recommend = {
                  value: selectedItem.getAttribute('value'),
                }
              }
            })
          },
          preConfirm: () => {
            console.log('confirming')
            if (document.querySelector('.selected')) {
              return true
            }
            Swal.getTitle().textContent = '错误！请先选择推荐度。'
            return false
          },
        }).then((result0) => {
          if (result0.isConfirmed) {
            // console.log(recordParm)
            kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', recordParm).then(
              function rp() {
                eleBtn.disabled = true
                eleBtn.innerText = '已评价'
              },
              function er() {},
            )
          }
        })
      }
    })
  }
  eleKara.appendChild(eleBtn)
  return event
})

kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {
  const { record } = event
  record.fd_recommend.disabled = true
  record.fd_smile.disabled = true
  return event
})
