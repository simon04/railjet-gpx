const child_process = require('child_process');

setInterval(fetchRailjetStatus, 1000);

function fetchRailjetStatus() {
  const Speed = curl('http://railnet.oebb.at/api/speed');
  const {Latitude, Longitude} = curl('http://railnet.oebb.at/api/gps');
  console.log(`
    <trkpt lat="${Latitude}" lon="${Longitude}">
      <speed>${(Speed / 3.6).toFixed(2)}</speed> <!-- ${Speed} km/h -->
      <time>${new Date().toISOString()}</time>
    </trkpt>`);
}

function curl(url) {
  const json = child_process.execFileSync('curl', ['--silent', url]);
  return JSON.parse(json);
}
