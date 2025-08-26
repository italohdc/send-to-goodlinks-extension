function generateGoodlinksUrl(url, tags = []) {
  var url = encodeURIComponent(url);
  var goodlinksUrl = 'goodlinks://x-callback-url/save?url=' + url + '&starred=1&tags=' + tags.join('%20');
  return goodlinksUrl;
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url) return;
  const goodLinksUrl = generateGoodlinksUrl(tab.url, ['chrome']);
  chrome.tabs.create({ url: goodLinksUrl });
});
