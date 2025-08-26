const defaultParams = {
  tags: [],
  starred: false,
  read: false,
  title: null,
};

function generateGoodlinksUrl(url, params = {}) {
  const encodedUrl = encodeURIComponent(url);
  const finalParams = { ...defaultParams, ...params };

  let goodlinksUrl = `goodlinks://x-callback-url/save?url=${encodedUrl}`
  goodlinksUrl += `&starred=${finalParams.starred ? 1 : 0}`
  goodlinksUrl += `&read=${finalParams.read ? 1 : 0}`
  goodlinksUrl += `&tags=${finalParams.tags.join('%20')}`;
  goodlinksUrl += `&title=${encodeURIComponent(finalParams.title)}`;

  return goodlinksUrl;
}

function getPageUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('url');
}

function getPageTitle() {
  const params = new URLSearchParams(window.location.search);
  return params.get('title');
}


(async function() {
  chrome.storage.sync.get(['tags', 'starred', 'read', 'autoclose'], function(items) {
    const params = {  
      tags: items.tags.split(',').map(tag => tag.trim()),
      starred: items.starred,
      read: items.read,
      title: getPageTitle(),
    };

    const pageUrl = getPageUrl();
    const goodLinksUrl = generateGoodlinksUrl(pageUrl, params);
    window.location.href = goodLinksUrl;

    if (items.autoclose) {
      setTimeout(() => {
        window.close();
      }, 4000);
    }
  });
})();
