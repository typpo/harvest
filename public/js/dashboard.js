function Dashboard() {
  var me = this;
  var NUMBER_SELECTABLE = 2;
  var SELECTED_GRID_IMAGE_CLASS = 'selected_grid_image';

  var IMAGES = [
    'IMG_1153.JPG',  'IMG_1189.JPG',  'IMG_1197.JPG',  'IMG_1229.JPG',
    'IMG_1157.JPG',  'IMG_1191.JPG',  'IMG_1198.JPG',  'IMG_1243.JPG',
    'IMG_1176.JPG',  'IMG_1194.JPG',  'IMG_1203.JPG',  'IMG_1250.JPG',
    'IMG_1182.JPG',  'IMG_1196.JPG',  'IMG_1217.JPG',  'IMG_1256.JPG'
  ];
  var NORMAL_PATH = '/original/';
  var PROCESSED_PATH = '/ndvi-hsv/';

  Dashboard.prototype.init = function() {
    this.selectedItems_ = [];
    this.$compareButton = $('#compare_button');
    this.$compareButton.click(this.compare);

    var $imageContainer = $('.image_container');
    for (var i in IMAGES) {
      $imageContainer.append(this.createGridItem(IMAGES[i]));
    }
    $('.grid_item').click(this.handleGridClick);

    $('.image_switcher').mouseenter(function() {
      $(this).find('.grid_image_normal').fadeOut(400);
      $(this).find('.grid_image_processed').fadeIn(400);;
    });
    $('.image_switcher').mouseleave(function() {
      if ($(this).find('.grid_image_normal').length > 0) {
        $(this).find('.grid_image_normal').stop();
        $(this).find('.grid_image_normal').fadeIn({
          duration: 200,
          queue: false
        });

        $(this).find('.grid_image_processed').stop();
        $(this).find('.grid_image_processed').fadeOut({
          duration: 200,
          queue: false
        });
      }
    });


    // make the .cd-handle element draggable and modify .cd-resize-img width
    // according to its position
    $('.cd-image-container').each(function(){
        var actual = $(this);
        drags(actual.find('.cd-handle'), actual.find('.cd-resize-img'), actual);
    });

    getWeatherData();
  };


  Dashboard.prototype.createGridItem = function(image) {
    var item = $(
              '<div class="grid_item">' +
                '<div class="image_switcher">' +
                  '<img class="grid_image grid_image_normal" src="' + NORMAL_PATH + image + '">' +
                  '<img class="grid_image grid_image_processed" src="' + PROCESSED_PATH + image + '">' +
                '</div>' +
                '<div class="image_descriptor">' +
                '</div>' +
              '</div>');
    return item;
  };

  Dashboard.prototype.handleGridClick = function(event) {
    // hack to get grid item
    var $gridItem = $(event.target).parent().parent();
    var $img = $gridItem.find('.grid_image_processed');
    var toRemove = -1;
    for (var i in me.selectedItems_) {
      var $otherItem = me.selectedItems_[i];
      if ($gridItem[0] == $otherItem[0]) {
        toRemove = i;
        break;
      }
    }
    if (toRemove != -1) {
      me.selectedItems_.splice(toRemove, 1);
      $gridItem.removeClass(SELECTED_GRID_IMAGE_CLASS);
      me.hideCompare();
      return;
    }
    $gridItem.addClass(SELECTED_GRID_IMAGE_CLASS);
    if (me.selectedItems_.length >= NUMBER_SELECTABLE) {
      var unselect = me.selectedItems_.splice(0,1)[0];
      unselect.removeClass(SELECTED_GRID_IMAGE_CLASS);
    }
    me.selectedItems_.push($gridItem);
    if (me.selectedItems_.length > 0) {
      me.showCompare();
    }
  };


  Dashboard.prototype.showCompare = function() {
    me.$compareButton.show();
  };


  Dashboard.prototype.hideCompare = function() {
    me.$compareButton.hide();
  };


  Dashboard.prototype.compare = function() {
    var $first, $second;
    if (me.selectedItems_.length == NUMBER_SELECTABLE) {
      $first = me.selectedItems_[0].find('.grid_image_processed');
      $second = me.selectedItems_[1].find('.grid_image_processed');
    } else if (me.selectedItems_.length == 1) {
      $first = me.selectedItems_[0].find('.grid_image_normal');
      $second = me.selectedItems_[0].find('.grid_image_processed');
    }
    $('.image_container').hide();
    $('#compare_module').show();

    var $pageWrapper = $('#page-wrapper');
    $('.cd-image-container').addClass('is-visible');
    var $og = $('#og_img');
    var $diff = $('#diff_img');
    $og.height($pageWrapper.height() - 50);
    $og.width($pageWrapper.width() - 50);
    $diff.height($pageWrapper.height() - 50);
    $diff.width($pageWrapper.width() - 50);
    $og.attr('src', $first.attr('src'));
    $diff.attr('src', $second.attr('src'));
  };

  function getWeatherData() {
    var weatherAPI = "http://api.wunderground.com/api/d7d1d3e5894b3fd4/forecast/geolookup/conditions/q/94022.json";
    $.getJSON(weatherAPI)
      .done(function (data) {
        var weatheritems = $('.weather-item');

        var forecasts = data["forecast"]["txt_forecast"]["forecastday"];
        for (var i = 0; i < weatheritems.length; i++) {
          var f = forecasts[i];
          var weatheritem = $(weatheritems[i]);
          weatheritem.find('.weathericon').attr('src', f["icon_url"]);
          weatheritem.find('.weatherday').text(f["title"]);
          weatheritem.find('.weathertext').text(f["fcttext"]);
        }
      });
  }

  //draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
  function drags(dragElement, resizeElement, container) {
    dragElement.on("mousedown vmousedown", function(e) {
        dragElement.addClass('draggable');
        resizeElement.addClass('resizable');

        var dragWidth = dragElement.outerWidth(),
            xPosition = dragElement.offset().left + dragWidth - e.pageX,
            containerOffset = container.offset().left,
            containerWidth = container.outerWidth(),
            minLeft = containerOffset + 10,
            maxLeft = containerOffset + containerWidth - dragWidth - 10;

        dragElement.parents().on("mousemove vmousemove", function(e) {
            leftValue = e.pageX + xPosition - dragWidth;

            //constrain the draggable element to move inside its container
            if(leftValue < minLeft ) {
                leftValue = minLeft;
            } else if ( leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';

            $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
                $(this).removeClass('draggable');
                resizeElement.removeClass('resizable');
            });

            $('.resizable').css('width', widthValue);

            //function to upadate images label visibility here
            // ...

        }).on("mouseup vmouseup", function(e){
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
        e.preventDefault();
    }).on("mouseup vmouseup", function(e) {
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
    });
}
}

$(function() {
  window.dashboard = new Dashboard();
  window.dashboard.init();
});
