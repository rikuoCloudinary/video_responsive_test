var cld = cloudinary.Cloudinary.new({ cloud_name: 'miki-cloudinary' });

      // Define playlist sources
      var source1 = { publicId: 'oceans', info: { title: 'Oceans', subtitle: 'A movie about oceans' } };
      var source2 = { publicId: 'book', info: { title: 'Cloud Book Study', subtitle: 'A short video with a nice book animation' } };
      var source3 = { publicId: 'negative', info: { title: 'Negative' } };

      // Initialize player
      var player = cld.videoPlayer('example-player',{
        "controls": true,
        "muted": true,
        "showJumpControls": true
      });
      player.source("example-player", {
          "textTracks": {
              "captions": {
                  "label": "English",
                  "language": "en",
                  "url": "https://res.cloudinary.com/vizible/raw/upload/v1585317841/Vizible.no/Videos/Vizi_Forsidevideo_nb.srt",
                  "default": true
              }
          }
      });
      // Auto advance to next video after 0 seconds, repeat the playlist when final video ends, and present upcoming video 5 seconds before the current video ends.
      player.playlist([source1, source2], { autoAdvance: true, repeat: true, presentUpcoming: 8 });

      function updateSource() {
        var divElem = document.querySelector("div#source-data");

        publicIdElem = divElem.querySelector("#public-id-placeholder");
        sourceUrlElem = divElem.querySelector("#source-url-placeholder");

        publicIdElem.innerText = "Public Id: " + player.currentPublicId();
        sourceUrlElem.innerText = "Source URL: " + player.currentSourceUrl();

        console.log(sourceUrlElem.innerText);
        divElem.style.display = 'block';
      };

      player.on('sourcechanged', updateSource);

      document.querySelector("button#play-prev").addEventListener("click", function() {
        player.playPrevious();
      });

      document.querySelector("button#play-next").addEventListener("click", function() {
        player.playNext();
      });