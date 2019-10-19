var WebInteraction = {
  OnInit: function() {
    window.WebInteraction.onInit();
  },
  OnChangeTemplate: function(str) {
    window.WebInteraction.onChangeTemplate(Pointer_stringify(str));
  },
}
mergeInto(LibraryManager.library, WebInteraction);