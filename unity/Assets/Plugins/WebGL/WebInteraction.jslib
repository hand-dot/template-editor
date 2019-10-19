var WebInteraction = {
  OnChangeTemplate: function(str) {
    window.WebInteraction.onChangeTemplate(Pointer_stringify(str));
  },
}
mergeInto(LibraryManager.library, WebInteraction);