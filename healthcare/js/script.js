$(function(){
  checkboxClick ();
  selectBoxClick ();
  modalOpen();
  menuOpen();
  datepicker();
  tabButton();
})

//셀렉트박스 동작
function selectBoxClick (){  
  //셀렉트 박스 클릭 했을 때
  $(document).on("click", ".select_box > button", function(e){
    var tg = $(e.target);
    var select_box = tg.parents('.select_box');
    var select_list = tg.siblings('ul');

    if(select_box.hasClass('open')){
      select_box.removeClass('open');
      select_list.slideUp(100);
    }else {
      select_box.addClass('open');
      select_list.addClass('open').slideDown(100);
    }
  })
  
  $(document).on("click", ".select_box ul li button", function(e){
    var select_box = $(e.target).parents('.select_box');
    var select_btn = select_box.children('button');
    var option = $(this).text();
    
    //클릭 시 드롭다운 닫기
    select_box.removeClass('open');
    $(".select_box > ul").slideUp(100);
    
    //select에  text 넣기
    select_btn.text(option);
  })

  //셀렉트 박스 외의 공간 클릭했을 때
  $("body").on("click", function(e){
    var select_box = $(".select_box");
    var select_list = $(".select_box > ul");

    if(select_list.css("display") == "block"){
      if(select_box.has(e.target).length == 0){
        select_box.removeClass('open');
        select_list.slideUp(100);
      }
    }
  })
}

function checkboxClick(){
  $("#check_all").click(function() {
    if($("#check_all").is(":checked")) {
      $("input[name=chk]").prop("checked", true);
    }
    else $("input[name=chk]").prop("checked", false);
  });
}

function modalOpen(){
  var btnClass="";
  var popClass="";

  $('.btn_modal').on('click', function(e){
    e.preventDefault;
    var tg = $(e.target);
    
    $('.modal').removeClass('open');
    btnClass = tg.attr('class');
    popClass = btnClass.split(/\s+/);
    $('.modal.'+popClass[1]).addClass('open');      
  })
  $('.modal .btn_close').on('click', function(){
      $('.modal.'+popClass[1]).removeClass('open');
  })

  // 외부영역 클릭
  $(document).mouseup(function (e){
    if($(".modal").has(e.target).length === 0){
      $('.modal').removeClass('open');
    }
  });
}

function menuOpen(){
  // 전체 메뉴
  $('.menu_btn button').on('click',function(){
    if($('header').hasClass('open')){
      $('header').removeClass('open');
      $('footer').removeClass('open');
      $('.content_area').removeClass('open');
    }else {
      $('header').addClass('open');
      $('footer').addClass('open');
      $('.content_area').addClass('open');
    }
  })

  // depth1
  $('.menu li > a').on('click', function(e){
    e.preventDefault();

    var tg = $(e.target);
    var menu = $('.menu > li');
    var depth2List = $('.depth2 > li');
    var depth2tg = tg.parent('li');

    menu.removeClass('active');
    depth2tg.addClass('active');

    if($('.depth2 > li').hasClass('active')){
      depth2List.removeClass('active'); // depth2 전체 리스트 효과 제거
      depth2tg.addClass('active'); // 클릭한 메뉴 효과 적용
      tg.closest($('.menu > li')).addClass('active'); //depth2 ul 보임
    }
  })
}

function datepicker(){
  $('.datepicker input').daterangepicker({
    "singleDatePicker": true,
    "timePicker": true,
    "timePicker24Hour": true,
    "autoApply": true,
    "opens": "center",
    "start": "year",
    "depth": "month",
    "showDropdowns": true,  
    "locale": {
      "format": "YYYY.MM.DD",
      "separator": " - ",
      "fromLabel": "From",
      "toLabel": "To",
      "daysOfWeek": ['일', '월', '화', '수', '목', '금', '토'],
      "monthNames": ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      "firstDay": 1
    },

  });
  
}

function tabButton(){
  
  $('.tab_area button').on('click', function(e){
    
    var tg = $(e.target);
    var tab_area = tg.parents('.tab_area');
    var tab_btn = tab_area.find('.tab');

    var tab_idx = tg.parents('.tab').index();
    var tab_cont = tab_area.siblings('.tab_cont').children('div');

    tab_btn.removeClass('on');
    tab_cont.removeClass('on');
        
    tab_btn.eq(tab_idx).addClass('on');
    tab_cont.eq(tab_idx).addClass('on');

  })
}