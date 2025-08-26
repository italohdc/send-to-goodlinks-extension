function saveOptions(e) {
  e.preventDefault();

  const tags = document.getElementById('tags').value;
  const starred = document.getElementById('starred').checked;

  chrome.storage.sync.set({
    tags: tags,
    starred: starred
  }, function() {
    document.getElementById('status').textContent = 'Options saved!';
    setTimeout(() => {
      document.getElementById('status').textContent = '';
    }, 1500);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    tags: '',
    starred: false
  }, function(items) {
    document.getElementById('tags').value = items.tags;
    document.getElementById('starred').checked = items.starred;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('options-form').addEventListener('submit', saveOptions);
