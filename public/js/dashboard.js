function Dashboard() {
  var me = this;
  var NUMBER_SELECTABLE = 2;
  var SELECTED_GRID_IMAGE_CLASS = 'selected_grid_image';

  Dashboard.prototype.init = function() {
    this.selectedImages_ = [];
    $('.grid_image').click(this.handleGridClick);
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
      return;
    }
    $img.addClass(SELECTED_GRID_IMAGE_CLASS);
    if (me.selectedImages_.length >= NUMBER_SELECTABLE) {
      var unselect = me.selectedImages_.splice(0,1)[0];
      unselect.removeClass(SELECTED_GRID_IMAGE_CLASS);
    }
    me.selectedImages_.push($img);
  };
}

$(function() {
  window.dashboard = new Dashboard();
  window.dashboard.init();
});
