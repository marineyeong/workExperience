$(function(){
  lang ();
  co2Calc();
  menuClick ();
})

//헤더 컬러 및 로고 변화 이벤트
$(window).scroll(function(){
  var header = $('header');
  var Currentscroll = $(this).scrollTop();    
  var headerHeight = (header.outerHeight() * 2);

  if(Currentscroll > headerHeight){
    header.addClass('scroll');
  }else{
    header.removeClass('scroll');
  }
  if(header.hasClass('on')){
    header.removeClass('scroll');
  }
})

/** 모바일 햄버거 & close 버튼 클릭 이벤트**/
function menuClick (){
  var btnMenu = $('.btn_nav button')
  var header = $('header');

  if($(window).width() < 1200){
    btnMenu.on("click", function(){
      if(header.hasClass('on')){
        header.removeClass('on');
      }else {
        header.addClass('on');
      }
    });
  }
}

/* 언어 버튼 클릭 효과 */
function lang (){
  var list_btn = $('.language > button');
  var lang_list = $('.language ul');
  var lang_btn = $('.language ul > li > a');

  if($(window).width() > 1024){
    list_btn.click(function(){
      if(lang_list.hasClass('active')){
        lang_list.removeClass('active');
      }else {
        lang_list.addClass('active');
      }
    })
  
    lang_btn.click(function(e){
      var tg= $(e.target);
  
      if(tg.hasClass('active')){
        lang_btn.removeClass('active');
      }else {
        lang_btn.removeClass('active');
        tg.addClass('active');
      }
      return false;
    })
  }
}

/** 이산화탄소 절감량 계산기 **/
function co2Calc(){
  var calcInput = $('.section3 .sub_cont .input_wrap input');
  var calcBtn = $('.section3 .sub_cont .btn_input');
  
  calcBtn.click(function(){
    calc();
  });
  
  calcInput.on("keyup",function(key){
    if(key.keyCode==13) {
      calc();    
    }
  });
}

/** 이산화탄소 절감량 계산식 **/
function calc(){
  var eaInput = $('.section3 .sub_cont .input_wrap input').val();
  var number = $('.section3 .number strong');
  var calcValue = Math.round(eaInput * 0.27 * 1.958);

  calcValue = calcValue.toLocaleString(); 
  number.text(calcValue);    
}