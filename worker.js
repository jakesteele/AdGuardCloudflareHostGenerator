
const baseURL = "https://v.firebog.net/hosts/lists.php?type=tick";
const type = 'application/text;charset=UTF-8';

async function gatherResponse(response) {
  return response.text();
}

async function handleRequest() {
  const init = {
    headers: {
      'content-type': type,
    },
  };
  let bigList = "";
  const baseUrlResponse = await fetch(baseURL, init); // Get the initial list of hosts from FireBog
  const baseUrlResults = await gatherResponse(baseUrlResponse); // Get the response text.
  const separatehosts = baseUrlResults.split(/\r?\n|\r|\n/g); // Get hosts into array.
  separatehosts.pop(); // Last entry is blank (enter at end...);
  let regex = /^\s*$(?:\r\n?|\n)/gm;
  for (var i = 0, l = separatehosts.length; i < l; i++) {
    // this for loop is blocking due to connection limits in the free tier of cloudflare. 
    try {
      const resp = await fetch(separatehosts[i], init); // Fetch each returned host
      const result = await gatherResponse(resp); // Get the list from the response
      bigList += result.trim(); // Trim the front and back white space.
      bigList += "\n"; // Add our own white space.
    } catch(ex) {
      console.error("Error getting list from host."); // TODO: Fix logging. 
    }
  }
  return new Response(bigList, init);
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest());
});