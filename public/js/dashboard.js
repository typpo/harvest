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
    $img.addClass(SELECTED_GRID_IMAGE_CLASS);
    if (me.selectedImages_.length >= NUMBER_SELECTABLE) {
      var unselect = me.selectedImages_.splice(0,1);
      unselect.removeClass(SELECTED_GRID_IMAGE_CLASS);
    }
    me.selectedImages_.push($img);
  };
}

$(function() {
  window.dashboard = new Dashboard();
  window.dashboard.init();
});
