function saveOptions(e) {
  e.preventDefault();

  const tags = document.getElementById('tags').value;
  const starred = document.getElementById('starred').checked;
  const read = document.getElementById('read').checked;

  chrome.storage.sync.set({
    tags: tags,
    starred: starred,
    read: read
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
    starred: false,
    read: false
  }, function(items) {
    document.getElementById('tags').value = items.tags;
    document.getElementById('starred').checked = items.starred;
    document.getElementById('read').checked = items.read;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('options-form').addEventListener('submit', saveOptions);
