/* eslint-disable no-console */
import './app.scss'
import $ from 'jquery'
import Swal from 'sweetalert2'

const htmlRecommend = `<div class="inliner"></div>
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
      title: '如果要推荐给朋友，您的推荐度是？',
      html: htmlRecommend,
      width: '80%',
      didOpen: () => {
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
          const record0 = kintone.app.record.get()
          record0.record.fd_recommend.value = indexNum + 1
          kintone.app.record.set(record0)
          return activate(indexNum)
        })

        setTimeout(function st() {
          const thisRecord = kintone.app.record.get()
          return activate(thisRecord.record.fd_recommend.value - 1)
        }, 1000)
      },
    })
  }

  eleKara.appendChild(eleBtn)

  return event
})
