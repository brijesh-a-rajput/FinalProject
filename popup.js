document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
  
    fetch('http://localhost:3000/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadActivityLog();
      } else {
        alert('Login failed');
      }
    });
  });
  
  document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('token');
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
  });
  
  function loadActivityLog() {
    fetch('http://localhost:3000/activities', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      let activityLog = document.getElementById('activity-log');
      activityLog.innerHTML = '';
      data.forEach(activity => {
        let div = document.createElement('div');
        div.textContent = `Visited ${activity.url}${activity.path} for ${activity.time_spent} seconds`;
        activityLog.appendChild(div);
      });
    });
  }
  