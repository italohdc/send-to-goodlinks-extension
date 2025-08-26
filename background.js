chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['tags', 'starred', 'read', 'autoclose'], (items) => {
    let defaultValues = {};

    if (typeof items.tags === 'undefined') defaultValues.tags = 'chrome, web';
    if (typeof items.starred === 'undefined') defaultValues.starred = false;
    if (typeof items.read === 'undefined') defaultValues.read = false;
    if (typeof items.autoclose === 'undefined') defaultValues.autoclose = false;

    if (Object.keys(defaultValues).length > 0) chrome.storage.sync.set(defaultValues);
  });
});


chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url) return;

  let openPageUrl = chrome.runtime.getURL('open.html');
  openPageUrl += `?url=${encodeURIComponent(tab.url)}`;
  openPageUrl += `&title=${encodeURIComponent(tab.title)}`;

  chrome.tabs.create({ url: openPageUrl });
});
