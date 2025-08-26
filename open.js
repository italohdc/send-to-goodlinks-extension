function generateGoodlinksUrl(url, starred = false, read = false, tags = []) {
  const encodedUrl = encodeURIComponent(url);

  let goodlinksUrl = `goodlinks://x-callback-url/save?url=${encodedUrl}`
  goodlinksUrl += `&starred=${starred ? 1 : 0}`
  goodlinksUrl += `&read=${read ? 1 : 0}`
  goodlinksUrl += `&tags=${tags.join('%20')}`;

  return goodlinksUrl;
}

function getPageUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('url');
}


(async function() {
  chrome.storage.sync.get(['tags', 'starred', 'read'], function(items) {
    const tags = items.tags.split(',').map(tag => tag.trim());
    const starred = items.starred;
    const read = items.read;
    
    const pageUrl = getPageUrl();
    const goodLinksUrl = generateGoodlinksUrl(pageUrl, starred, read, tags);
    window.location.href = goodLinksUrl;
  });
})();
