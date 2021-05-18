/* eslint-disable no-console */
import $ from 'jquery'
import './app.scss'
import './smile.css'
import Swal from 'sweetalert2'
import img0 from '../img/0.png'
import img1 from '../img/1.png'
import img2 from '../img/2.png'
import img3 from '../img/3.png'
import img4 from '../img/4.png'

const htmlSmile = `
<div class='outter'>
  <div class="icon-border" value=1>
    <img id="sm0">
  </div>
  <div class="icon-border" value=2>
    <img id="sm1">
  </div>
  <div class="icon-border" value=3>
    <img id="sm2">
  </div>
  <div class="icon-border" value=4>
    <img id="sm3">
  </div>
  <div class="icon-border" value=5>
    <img id="sm4">
  </div>
</div>`
const htmlRecommend = `
<div class="inliner"></div>
<div class="inlined">
  <!-- Start component -->
  <div class="wk">
    <div class="baoyuan">抱怨</div>
    <div class="zhongli">中立</div>
    <div class="tuijian">推荐</div>
  </div>
  <div class="progress-meter">
    <div class="track">
      <span class="progress"></span>
    </div>
    <ul class="progress-points" data-current="4">
      <li class="progress-point">
        <span class="label"></span>
      </li>
      <li class="progress-point">
        <span class="label"></span>
      </li>
      <li class="progress-point">
        <span class="label"></span>
      </li>
      <li class="progress-point">
        <span class="label"></span>
      </li>
      <li class="progress-point">
        <span class="label"></span>
      </li>
      <li class="progress-point">
        <span class="label"></span>
      </li>
      <li class="progress-point">
        <span class="label"></span>
      </li>
      <li class="progress-point">
        <span class="label"></span>
      </li>
      <li class="progress-point">
        <span class="label"></span>
      </li>
      <li class="progress-point">
        <span class="label"></span>
      </li>
    </ol>
  </div>
</div>
`

kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {
  kintone.app.record.setFieldShown('fd_smile', false)
  kintone.app.record.setFieldShown('fd_recommend', false)
  const eleKara = kintone.app.record.getSpaceElement('kara')
  console.log(eleKara)
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
        console.log('第一个dialog显示了')
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
        imgs.forEach(function (el) {
          el.onclick = function () {
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
            const kinRecord = kintone.app.record.get()
            kinRecord.record.fd_smile.value = selectedItem.getAttribute('value')
            kintone.app.record.set(kinRecord)
          }
        })
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
            console.log('第一个dialog显示了')
            const $pointArr = $('.progress-point')
            const $progress = $('.progress').first()
            const max = $pointArr.length - 1
            const $points = $('.progress-points').first()
            const val = +$points.data('current') - 1
            let active
            let tracker
            tracker = 0
            active = 0
            function activate(index) {
              if (index !== active) {
                active = index
                const $activeEle = $pointArr.eq(active)
                $pointArr.removeClass('completed active').slice(0, active).addClass('completed')
                $activeEle.addClass('active')
                return $progress.css('width', `${(index / max) * 100}%`)
              }
              return $progress
            }

            $points.on('click', 'li', function pf() {
              const indexNum = $pointArr.index(this)
              const zjpd = indexNum === val ? 0 : tracker
              tracker = indexNum === 0 ? 1 : zjpd
              console.log(event.record.fd_recommend)
              const kinRecord = kintone.app.record.get()
              kinRecord.record.fd_recommend.value = indexNum + 1
              kintone.app.record.set(kinRecord)
              return activate(indexNum)
            })

            setTimeout(function st() {
              const thisRecord = kintone.app.record.get()
              return activate(thisRecord.record.fd_recommend.value - 1)
            }, 1000)
          },
        }).then((result0) => {
          if (result0.isConfirmed) {
            eleBtn.innerText = '本次已评价，点击重新评价'
          }
        })
      }
    })
  }

  eleKara.appendChild(eleBtn)

  return event
})
