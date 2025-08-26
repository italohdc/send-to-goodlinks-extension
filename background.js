chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['tags', 'starred'], (items) => {
    let defaultValues = {};

    if (typeof items.tags === 'undefined') defaultValues.tags = 'chrome, web';
    if (typeof items.starred === 'undefined') defaultValues.starred = false;

    if (Object.keys(defaultValues).length > 0) chrome.storage.sync.set(defaultValues);
  });
});


chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url) return;

  function generateGoodlinksUrl(url, starred = false, tags = []) {
    var url = encodeURIComponent(url);
    var goodlinksUrl = 'goodlinks://x-callback-url/save?url=' + url + '&starred=' + (starred ? 1 : 0) + '&tags=' + tags.join('%20');
    return goodlinksUrl;
  }

  chrome.storage.sync.get(['tags', 'starred'], function(items) {
    const tags = items.tags.split(',').map(tag => tag.trim());
    const starred = items.starred;

    const goodLinksUrl = generateGoodlinksUrl(tab.url, starred, tags);
    chrome.tabs.create({ url: goodLinksUrl });
  });
});
