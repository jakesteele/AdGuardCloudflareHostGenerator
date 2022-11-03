
const baseURL = "https://v.firebog.net/hosts/lists.php?type=tick";
const type = 'application/text;charset=UTF-8';

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
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
  const baseUrlResponse = await fetch(baseURL, init);
  const baseUrlResults = await gatherResponse(baseUrlResponse);
  const separatehosts = baseUrlResults.split(/\r?\n|\r|\n/g); // Get hosts into array.
  separatehosts.pop(); // Last entry is blank (enter at end...);
  //let regex = /^\s*$(?:\r\n?|\n)/gm;
  //let commentClean = /(^)!.*|#.*|\s.$/gm;
  let whiteSpaceClean = /^\s*\n/gm;
  for (var i = 0, l = separatehosts.length; i < l; i++) {
    // this for loop is blocking due to connection limits in the free tier of cloudflare. 
    try {
      const resp = await fetch(separatehosts[i], init);
      const { headers } = resp;
      const contentType = headers.get('content-type') || '';
       if (contentType.includes('application/json')) {
          console.log("skipping json");
        } 
        else if (contentType.includes('application/octet-stream')) {
          console.log("skipping octet stream ugh.");
        }
        else if (contentType.includes('text/plain')) {
          const result = await gatherResponse(resp);
          //bigList += result.replaceAll(commentClean, '').trim();
          bigList += result.trim();
          bigList += "\n";
        }
        else if (contentType.includes('application/text')) {
          const result = await gatherResponse(resp);
          //bigList += result.replaceAll(commentClean, '').trim();
           bigList += result.trim();
          bigList += "\n";
        } else if (contentType.includes('text/html')) {
          const result = await gatherResponse(resp);
          //bigList += result.replaceAll(commentClean, '').trim();
           bigList += result.trim();
          bigList += "\n";
        } else {
          console.log("unhandled type..." + contentType);
        }
      
    } catch(ex) {
      console.error("Error getting list from host.", ex);
    }
  }
  bigList = bigList.replaceAll(whiteSpaceClean, '');
  return new Response(bigList, init);
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest());
});