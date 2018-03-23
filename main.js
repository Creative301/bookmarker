// Fetch bookmark automatic when browser load
// document.querySelector('body').addEventListener('load', fetchBookmarks);

// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
  e.preventDefault();
  // console.log('Test');

  // Get site name and site url value from the form
  var siteName = document.getElementById('siteName').value;
  // console.log(siteName); 
  var siteUrl = document.getElementById('siteUrl').value;
  // console.log(siteUrl); 

  if(!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };
  // console.log(bookmark);

  // Local Storage Test
  // Set Local Storage
  // localStorage.setItem('test', 'Hello World');
  // console.log(localStorage.getItem('test'));

  // Remove Local Storage
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));

  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null) {
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to local storage
    // JSON.stringify: convert JSON array into string
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from local storage
    // JSON.parse: convert string into JSON
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }

    // Clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Delete bookmark
function deleteBookmark(url) {
  // console.log(url);
  // Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarks
  for(var i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url) {
      // Remove from array
      bookmarks.splice(i, 1);
    } 
  }
  // Re-set back to local storage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}


// Fetch bookmarks (ambil value bookmarks waktu browser load)
function fetchBookmarks() {
  // Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // console.log(bookmarks);

  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i=0; i<bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">' +
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' + 
                                  '<a onclick = "deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}


  // Validate form
  function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl) {
      alert('Please fill in the form');
      return false;
    }
  
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    if(!siteUrl.match(regex)) {
      alert('Please use a valid URL');
      return false;
    }
    return true;
  }
