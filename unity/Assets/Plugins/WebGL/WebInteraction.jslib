var WebInteraction = {
  Log: function(str) {
    window.alert(Pointer_stringify(str))
  },
}
mergeInto(LibraryManager.library, WebInteraction);