/* eslint-disable no-console */
import './app.scss'
import $ from 'jquery'

kintone.events.on(['app.record.create.show', 'app.record.edit.show'], (event) => {
  kintone.app.record.setFieldShown('field_code_tjd', false)
  const EleInsertRecommand = kintone.app.record.getSpaceElement('insert_space')
  console.log(EleInsertRecommand)
  EleInsertRecommand.innerHTML = `<div class="inliner"></div>
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
      <ol class="progress-points" data-current="1">
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
    <!-- End component -->
    <!-- Demo only -->
  </div>
  `
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
    console.log(event.record.field_code_tjd)
    const record0 = kintone.app.record.get()
    record0.record.field_code_tjd.value = indexNum + 1
    kintone.app.record.set(record0)
    return activate(indexNum)
  })

  setTimeout(function st() {
    const thisRecord = kintone.app.record.get()
    return activate(thisRecord.record.field_code_tjd.value - 1)
  }, 1000)

  return event
})
