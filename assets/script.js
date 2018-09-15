function getQuery() {
  var query = $('#query').val();
  getData(query);
}

function getData(query) {
  var url = 'https://en.wikipedia.org/w/api.php?'+'action=query&list=search&format=json&srprop=snippet'+'&srsearch='+query+'&callback=?';

  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(json) {
      listEntries(json);
    },
    error: function(e) {
      console.log(e.message);
    }
  });
}

function listEntries(data) {
  var entries = '';
  for(var i = 0; i < data.query.search.length; i++) {
    entries += createEntry(data.query.search[i]);
  }
  $('#page').html(entries);
}

function createEntry(entry) {
  var wikiBase = 'http://wikipedia.org/wiki/';
  var titleLink = '<a href="'+wikiBase+entry.title+'">'+entry.title+'</a>';
  var html = '<div class="entry"><div><span class="title">'+titleLink+'</span><br><br><span'+entry.snippet+'</span></div></div>';
  return html;
}