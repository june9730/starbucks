//돋보기 클릭하면 input 확대
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});


//scroll하면 badge 사라지기
const badgeEl = document.querySelector('header .badges')
const toTopEl = document.querySelector('#to-top');
//scroll할때 함수 조절(_.throttle(함수,시간)) -> lodash 라이브러리
window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    //배지 숨기기(gsap.to(요소, 지속시간, 옵션)) -> gsap 라이브러리
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // go-to-top button 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
    } else {
    //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // go-to-top button 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 500));

toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {
    scrollTo: 0 //화면의 위치, gsap scrollTo plugin이 있어야함
  });
});


//순차적으로 fade in(gsap.to(요소, 지속시간, 옵션))
const fadeEls = document.querySelectorAll('.visual .fade-in')
fadeEls.forEach(function(fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //0.7 -> 1.4 -> 2.1 -> 2.7
    opacity: 1
  })
});


//공지사항 swiper(new Swiper(선택자, 옵션))
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', //방향
  autoplay: true, //자동 재생
  loop: true //반복 재생
});
//프로모션 swiper
new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백(px)
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  //autoplay: {
    //delay: 5000 //delay 시간 (기본값:3000(3초))
  //}
  pagination: {
    el: '.promotion .swiper-pagination', //페이지네이션 선택자
    clickable: true, //페이지네이션을 클릭하면 사용자가 원하는 곳으로 넘어갈 수 있는지
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
//Awards swiper
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


//promotion toggle
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion //!가 앞에 있으면 반대값
  if(isHidePromotion) {
    //숨김 처리
    promotionEl.classList.add('hide');
  } else {
    //보임 처리
    promotionEl.classList.remove('hide');
  }
});


//youtube floating image
/**범위 랜덤 함수(소수점 2자리까지)**/
function random(min, max) {
  // `.toFixed()`를 통해 반환된 '문자 데이터'를,
  // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject (selector, delay, size) {
  //gsap.to()
  gsap.to(
    selector,
    random(1.5, 2.5), // 애니메이션 동작 시간
    {
      delay: random(0, delay), // 애니메이션 지연 시간을 설정
      y: size, // `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정
      repeat: -1, // 몇 번 반복하는지를 설정, `-1`은 무한 반복
      yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생
      ease: Power1.easeInOut // Easing 함수 적용
    }
  )
}
floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 20)


//scrollMagic
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: .8, //
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //올해 연도