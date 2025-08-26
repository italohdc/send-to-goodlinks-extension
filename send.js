const defaultParams = {
  tags: [],
  starred: false,
  read: false,
  title: null,
  autoclose: false,
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

async function getParams() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['tags', 'starred', 'read', 'autoclose'], function(items) {
      const params = {  
        tags: items.tags.split(',').map(tag => tag.trim()),
        starred: items.starred,
        read: items.read,
        autoclose: items.autoclose,
        title: getPageTitle(),
      };

      resolve(params);
    });
  });
}

function getPageUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('url');
}

function getPageTitle() {
  const params = new URLSearchParams(window.location.search);
  return params.get('title');
}


async function getFinalLink() {
  const params = await getParams();
  const pageUrl = getPageUrl();

  return generateGoodlinksUrl(pageUrl, params);
}


async function populateFallbackLink() {
  const goodLinksUrl = await getFinalLink();
  const button = document.getElementById('fallback-link');
  button.href = goodLinksUrl;
}

async function startAutoClose() {
  const params = await getParams();

  if (params.autoclose) {
    document.querySelector('.autoclose-alert').classList.remove('hide');
    document.querySelector('.btn-enable-autoclose').classList.add('hide');

    setTimeout(() => {
      window.close();
    }, 3000);
  }
}

async function enableAutoclose() {
  chrome.storage.sync.set({ autoclose: true });
  await startAutoClose();
}

async function showButtonOrAlert() {
  const params = await getParams();

  if (params.autoclose) {
    document.querySelector('.autoclose-alert').classList.remove('hide');
  } else {
    document.querySelector('.btn-enable-autoclose').classList.remove('hide');
  }
}

async function sendToGoodLinks() {
  const goodLinksUrl = await getFinalLink();
  window.location.href = goodLinksUrl;
  await startAutoClose();
}

sendToGoodLinks();
showButtonOrAlert();
populateFallbackLink();

const button = document.querySelector('.btn-enable-autoclose');
button.addEventListener('click', enableAutoclose);
