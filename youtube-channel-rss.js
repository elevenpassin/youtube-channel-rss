// ==UserScript==
// @name        Get Channel RSS - youtube.com
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/c/*
// @grant       none
// @version     1.0
// @author      -
// @description 28/09/2021, 14:10:10
// ==/UserScript==


const findChannelRSSFeed = () => {
  for (var arrScripts = document.getElementsByTagName('script'), i = 0; i < arrScripts.length; i++) {
      if (arrScripts[i].textContent.indexOf('externalId') != -1) {
          var channelId = arrScripts[i].textContent.match(/\"externalId\"\s*\:\s*\"(.*?)\"/)[1];
          var channelRss = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId;
          var channelTitle = document.title.match(/\(?\d*\)?\s?(.*?)\s\-\sYouTube/)[1];
          console.log('The rss feed of the channel \'' + channelTitle + '\' is:\n' + channelRss);
          return channelRss;
      }
  }
}

const copyChannelRSSToClipboard = () => {
  const rssFeed = findChannelRSSFeed();
  navigator.clipboard.writeText(rssFeed).then(function() {
    /* clipboard successfully set */
    alert("Copied successfully")
  }, function() {
    alert("Something went wrong!")
  });
}

const copyRSSBtn = document.createElement('button');
copyRSSBtn.textContent = 'Copy RSS Feed';
copyRSSBtn.style.position = 'fixed';
copyRSSBtn.style.bottom = 0;
copyRSSBtn.style.right = 0;
copyRSSBtn.onclick = copyChannelRSSToClipboard;
document.body.appendChild(copyRSSBtn);
