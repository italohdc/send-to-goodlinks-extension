function saveOptions(e) {
  e.preventDefault();

  const items = {
    tags: document.getElementById('tags').value,
    starred: document.getElementById('starred').checked,
    read: document.getElementById('read').checked,
    autoclose: document.getElementById('autoclose').checked,
  };

  chrome.storage.sync.set(items, function() {
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
    read: false,
    autoclose: false,
  }, function(items) {
    document.getElementById('tags').value = items.tags;
    document.getElementById('starred').checked = items.starred;
    document.getElementById('read').checked = items.read;
    document.getElementById('autoclose').checked = items.autoclose;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('options-form').addEventListener('submit', saveOptions);
