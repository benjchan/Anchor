chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log(localStorage.status);
    if (request.type == "status") sendResponse({status: localStorage.status});
});