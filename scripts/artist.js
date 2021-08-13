window.onload = function () {
  let artistTitle = sessionStorage.getItem("artisttitle");
  console.log(artistTitle);
  grabAPI(artistTitle);

  const artistName = document.getElementById("artistName");
  artistName.innerText = capitalize(artistTitle);
};

const grabAPI = (title) => {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + title, {
    method: "GET",
  })
    .then((resp) => {
      return resp.json();
    })
    .then((artist) => {
      console.log(artist.data);
      const songsToDisplay = 5;

      const headerImage = document.getElementById("headerImage");
      const image = artist.data[0].artist.picture_xl;
      console.log(image);
      headerImage.style.backgroundImage = `url("${image}")`;

      for (let i = 0; i < artist.data.length; i++) {
        if (i == songsToDisplay) {
          break;
        }

        const table = document.getElementById("popularTable");
        const row = document.createElement("tr");
        const headerElement = document.createElement("th");
        const tableImg = document.createElement("td");
        const songTitle = document.createElement("td");
        const songListens = document.createElement("td");
        const songLength = document.createElement("td");

        headerElement.innerText = i + 1;
        headerElement.classList.add("px-0");
        headerElement.classList.add("pt-4");

        tableImg.classList.add("picture_frame");
        tableImg.classList.add("px-0");
        let image = artist.data[i].album.cover_small;
        tableImg.innerHTML = `<img src="${image}" alt=""></img>`;

        songTitle.innerText = artist.data[i].title;
        songTitle.classList.add("w-50");
        songTitle.classList.add("px-1");

        randomListens = Math.floor(Math.random() * 30000000) + 1000000;
        listens = randomListens.toLocaleString();

        songListens.innerText = listens;

        let time = artist.data[i].duration;
        let time2 = Math.floor(time % 60);

        if (time2.toString().length < 2) {
          time2 = time2 * 10;
        }

        let length = Math.floor(time / 60) + ":" + time2;
        songLength.innerText = length;

        row.appendChild(headerElement);
        row.appendChild(tableImg);
        row.appendChild(songTitle);
        row.appendChild(songListens);
        row.appendChild(songLength);

        table.appendChild(row);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

function capitalize(t) {
  return t && t[0].toUpperCase() + t.slice(1);
}
