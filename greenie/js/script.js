$(document).ready(function () {
  var count = $('.count_board li .num');

  count.each(function () {
    Counter($(this));
  });

  //이미지 드래그 before & after
  $('.slider_box').each(function () {
    var cur = $(this);
    var width = cur.width() + 'px';
    cur.find('.resize img').css('width', width);
    drags(cur.find('.control'), cur.find('.resize'), cur);
  });
});

$(window).on('load', function () {
  setImgSize();
});

//윈도우 사이즈 바뀔 때
$(window).resize(function () {
  //이미지 드래그 before & after
  $('.slider_box').each(function () {
    var cur = $(this);
    var width = cur.width() + 'px';
    cur.find('.resize img').css('width', width);
  });

  setImgSize();
});

//메인 비주얼 숫자 카운팅
function Counter(obj) {
  // get the number
  var number = obj.text();
  obj.attr('data-number', number);

  // clear the HTML element
  obj.empty();

  // create an array from the text, prepare to identify which characters in the string are numbers
  var numChars = number.split('');
  var numArray = [];
  var setOfNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // for each number, create the animation elements
  for (var i = 0; i < numChars.length; i++) {
    if ($.inArray(parseInt(numChars[i], 10), setOfNumbers) != -1) {
      obj.append(
        '<span class="digit-con"><span class="digit' +
          numArray.length +
          '">0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br></span></span>'
      );
      numArray[numArray.length] = parseInt(numChars[i], 10);
    } else {
      obj.append('<span>' + numChars[i] + '</span>');
    }
  }

  // determine the height of each number for the animation
  var increment = obj.find('.digit-con').outerHeight();
  var speed = 2000;

  // animate each number
  for (var i = 0; i < numArray.length; i++) {
    obj.find('.digit' + i).animate({ top: -(increment * numArray[i]) }, Math.round(speed / (1 + i * 0.333)));
  }
}

function drags(dragElement, resizeElement, container) {
  dragElement
    .on('mousedown touchstart', function (e) {
      dragElement.addClass('draggable');
      resizeElement.addClass('resizable');

      var startX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
      var dragWidth = dragElement.outerWidth(),
        posX = dragElement.offset().left + dragWidth - startX,
        containerOffset = container.offset().left,
        containerWidth = container.outerWidth();
      minLeft = containerOffset + 10;
      maxLeft = containerOffset + containerWidth - dragWidth - 10;

      dragElement
        .parents()
        .on('mousemove touchmove', function (e) {
          var moveX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
          leftValue = moveX + posX - dragWidth;
          if (leftValue < minLeft) {
            leftValue = minLeft;
          } else if (leftValue > maxLeft) {
            leftValue = maxLeft;
          }
          widthValue = ((leftValue + dragWidth / 2 - containerOffset) * 100) / containerWidth + '%';
          $('.draggable')
            .css('left', widthValue)
            .on('mouseup touchend touchcancel', function () {
              $(this).removeClass('draggable');
              resizeElement.removeClass('resizable');
            });

          $('.resizable').css('width', widthValue);
        })
        .on('mouseup touchend touchcancel', function () {
          dragElement.removeClass('draggable');
          resizeElement.removeClass('resizable');
        });

      e.preventDefault();
    })
    .on('mouseup touchend touchcancel', function (e) {
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
}

function setImgSize() {
  $('.product_list .list_img').each(function () {
    var width = $('.product_list li').width();

    $(this).css('width', width);
    $(this).css('height', width);
  });

  $('.product_list .list_img img').each(function () {
    var positionW = $('.product_list .list_img').width();
    var parentsW = $('.product_list li').width();
    var width = $(this).width();
    var height = $(this).height();

    if (width < height) {
      var resizeTop = (positionW - height) / 2;
      $(this).css('width', '100%');
      $(this).css('height', 'auto');
      $(this).css('top', resizeTop);
    } else if (width > height) {
      $(this).css('height', '100%');
      $(this).css('width', 'auto');

      var width = $(this).width();
      var resizeLeft = (width - positionW) / 2;

      $(this).css('left', -resizeLeft);
    } else {
      $(this).css('width', parentsW);
      $(this).css('height', parentsW);
    }
  });
}
