var WebInteraction = {
  OnInit: function() {
    window.WebInteraction.onInit();
  },
  OnChangeTemplate: function(str) {
    window.WebInteraction.onChangeTemplate(Pointer_stringify(str));
  },
  OnChangeField: function(str) {
    window.WebInteraction.onChangeField(Pointer_stringify(str));
  },
  OnSomethingWentWrong: function(str) {
    window.WebInteraction.onSomethingWentWrong(Pointer_stringify(str));
  },
}
mergeInto(LibraryManager.library, WebInteraction);