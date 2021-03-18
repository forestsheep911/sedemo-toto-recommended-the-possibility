/* eslint-disable no-console */
import './app.scss'
import $ from 'jquery'

kintone.events.on('app.record.create.show', (event) => {
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
      <ol class="progress-points" data-current="4">
        <li class="progress-point">
          <span class="label"></span>
        </li>
        <li class="progress-point">
          <span class="label">Aliquam tincidunt</span>
        </li>
        <li class="progress-point">
          <span class="label">Vestibulum auctor</span>
        </li>
        <li class="progress-point">
          <span class="label">Lorem ipsum</span>
        </li>
        <li class="progress-point">
          <span class="label">Aliquam tincidunt</span>
        </li>
        <li class="progress-point">
          <span class="label">Aliquam tincidunt</span>
        </li>
        <li class="progress-point">
          <span class="label">Aliquam tincidunt</span>
        </li>
        <li class="progress-point">
          <span class="label">Aliquam tincidunt</span>
        </li>
        <li class="progress-point">
          <span class="label">Aliquam tincidunt</span>
        </li>
        <li class="progress-point">
          <span class="label">Aliquam tincidunt</span>
        </li>
      </ol>
    </div>
    <!-- End component -->
    <!-- Demo only -->
    <div class="controls">
      <button class="trigger">Toggle progress</button>
      <p>Click any point to navigate to it directly</p>
    </div>
  </div>
  `
  let $point_arr
  let $points
  let $progress
  let $trigger
  let active
  let max
  let tracker
  let val

  $trigger = $('.trigger').first()
  $points = $('.progress-points').first()
  $point_arr = $('.progress-point')
  $progress = $('.progress').first()

  val = +$points.data('current') - 1
  max = $point_arr.length - 1
  tracker = active = 0

  function activate(index) {
    if (index !== active) {
      active = index
      const $_active = $point_arr.eq(active)

      $point_arr.removeClass('completed active').slice(0, active).addClass('completed')

      $_active.addClass('active')

      return $progress.css('width', `${(index / max) * 100}%`)
    }
  }

  $points.on('click', 'li', function (eventi) {
    let _index
    _index = $point_arr.index(this)
    tracker = _index === 0 ? 1 : _index === val ? 0 : tracker
    console.log(_index)
    event.record.field_code_tjd.value = _index + 1
    console.log(event.record.field_code_tjd.value)
    return activate(_index)
  })

  $trigger.on('click', function () {
    return activate(tracker++ % 2 === 0 ? 0 : val)
  })

  setTimeout(function () {
    return activate(val)
  }, 1000)

  return event
})

kintone.events.on('app.record.create.submit', (event) => {
  return event
})
