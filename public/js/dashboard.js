function Dashboard() {
  var me = this;
  var NUMBER_SELECTABLE = 2;
  var SELECTED_GRID_IMAGE_CLASS = 'selected_grid_image';

  Dashboard.prototype.init = function() {
    this.selectedImages_ = [];
    this.$compareButton = $('#compare_button');
    $('.grid_image').click(this.handleGridClick);
    this.$compareButton.click(this.compare);


    // make the .cd-handle element draggable and modify .cd-resize-img width
    // according to its position
    $('.cd-image-container').each(function(){
        var actual = $(this);
        drags(actual.find('.cd-handle'), actual.find('.cd-resize-img'), actual);
    });
  };

  Dashboard.prototype.handleGridClick = function(event) {
    var $img = $(event.target);
    var toRemove = -1;
    for (var i in me.selectedImages_) {
      var $otherImg = me.selectedImages_[i];
      if ($img[0] == $otherImg[0]) {
        toRemove = i;
        break;
      }
    }
    if (toRemove != -1) {
      me.selectedImages_.splice(toRemove, 1);
      $img.removeClass(SELECTED_GRID_IMAGE_CLASS);
      me.hideCompare();
      return;
    }
    $img.addClass(SELECTED_GRID_IMAGE_CLASS);
    if (me.selectedImages_.length >= NUMBER_SELECTABLE) {
      var unselect = me.selectedImages_.splice(0,1)[0];
      unselect.removeClass(SELECTED_GRID_IMAGE_CLASS);
    }
    me.selectedImages_.push($img);
    if (me.selectedImages_.length == NUMBER_SELECTABLE) {
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
    if (me.selectedImages_.length != NUMBER_SELECTABLE) {
      return;
    }
    $('.image_container').hide();
    $('.cd-image-container').show();

    $('#og_img').attr('src', me.selectedImages_[0].attr('src'));
    $('#diff_img').attr('src', me.selectedImages_[1].attr('src'));
  };

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
