addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let targetUrl = new URL(request.url).pathname.slice(1);
  if (targetUrl === '') {
    return new Response('Hello, world!', {status: 200});
  }
  if (!targetUrl.includes('http://') && !targetUrl.includes('https://')) {
    targetUrl = 'http://' + targetUrl;
  }
  try {
    const response = await fetch(targetUrl, {headers: request.headers});
    const downloadResponse = new Response(response.body, response);
    downloadResponse.headers.set('Content-Disposition', 'attachment');
    return downloadResponse;
  } catch (error) {
    return new Response(`Request to ${targetUrl} failed: ${error}`, {status: 502});
  }
}
