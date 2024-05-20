let startTime;
let url = window.location.href;
let path = window.location.pathname;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'trackTime') {
    startTime = new Date();
    window.addEventListener('beforeunload', () => {
      let endTime = new Date();
      let timeSpent = (endTime - startTime) / 1000;

      fetch('http://localhost:3000/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({url, path, timeSpent})
      });
    });
  }
});
