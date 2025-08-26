chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['tags', 'starred', 'read'], (items) => {
    let defaultValues = {};

    if (typeof items.tags === 'undefined') defaultValues.tags = 'chrome, web';
    if (typeof items.starred === 'undefined') defaultValues.starred = false;
    if (typeof items.read === 'undefined') defaultValues.read = false;

    if (Object.keys(defaultValues).length > 0) chrome.storage.sync.set(defaultValues);
  });
});


chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url) return;

  function generateGoodlinksUrl(url, starred = false, read = false, tags = []) {
    var url = encodeURIComponent(url);
    var goodlinksUrl = 'goodlinks://x-callback-url/save?url=' + url + '&starred=' + (starred ? 1 : 0) + '&read=' + (read ? 1 : 0) + '&tags=' + tags.join('%20');
    return goodlinksUrl;
  }

  chrome.storage.sync.get(['tags', 'starred', 'read'], function(items) {
    const tags = items.tags.split(',').map(tag => tag.trim());
    const starred = items.starred;
    const read = items.read;

    const goodLinksUrl = generateGoodlinksUrl(tab.url, starred, read, tags);
    chrome.tabs.create({ url: goodLinksUrl });
  });
});
