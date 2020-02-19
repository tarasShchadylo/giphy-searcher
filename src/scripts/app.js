import ('../styles/main.scss');


export default function() {
  function createNode(element) {
    return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

  const ul = document.getElementById("items");
  const input = document.querySelector("#search-js");

  const api = "http://api.giphy.com/v1/gifs/search?q=";
  const apiKey = "&api_key=LPL5n8UmdV6tgV2oY5aB14s1OvyTZ3qY";
  const limit = `&limit=8`;

  setup();

  function setup() {
    const button = document.querySelector("#find-js");

    const setupData = () => {
      const nameGif = input.value;
      const url = `${api}${nameGif}${apiKey}${limit}`;

      fetch(url)
        .then(response => response.json())
        .then(resp => {
          let dataArray = resp.data;
          outputInputData(dataArray);
        })
        .catch(function(error) {
          console.log(error);
        });

      input.value = "";
    };

    button.addEventListener("click", setupData);
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        setupData();
      }
    });
  }

  const outputInputData = dataArray => {
    return dataArray.forEach(giphy => {
      let li = createNode("li"),
        img = createNode("img"),
        wrapperTitle = createNode("div"),
        h3 = createNode("h3"),
        buttonInf = createNode("button"),
        spanBtn = createNode("span"),
        informationGif = createNode("div"),
        size = createNode("h3"),
        url = createNode("a");

      wrapperTitle.classList.add("wrapper-title");
      buttonInf.classList.add("information");
      size.classList.add("toggle-size-photo");
      url.classList.add("url-link-gif");

      img.src = `${giphy.images.downsized_large.url}`;
      h3.textContent = `${giphy.title}`;
      spanBtn.textContent = "i";
      url.textContent = "Original";
      url.href = `${giphy.url}`;
      url.target = "_blank";
      url.style.display = "none";

      append(li, img);
      append(li, wrapperTitle);
      append(wrapperTitle, h3);
      append(wrapperTitle, buttonInf);
      append(buttonInf, spanBtn);
      append(li, informationGif);
      append(informationGif, size);
      append(informationGif, url);
      append(ul, li);

      buttonInf.addEventListener("click", () => {
        let el = informationGif;
        if (el) {
          el.classList.toggle("toggle-inf");
        } else {
          let classes = el.className.split(" ");
          let i = classes.indexOf("toggle-inf");
          if (i >= 0) classes.splice(i, 1);
          else classes.push("toggle-inf");
          el.className = classes.join(" ");
        }

        if (
          size.textContent ===
          `${giphy.images.downsized_large.width}x${giphy.images.downsized_large.height}`
        ) {
          size.textContent = "";
        } else {
          size.textContent = `${giphy.images.downsized_large.width}x${giphy.images.downsized_large.height}`;
        }

        if (url.style.display === "none") {
          url.style.display = "block";
        } else {
          url.style.display = "none";
        }
      });
    });
  };

  // const url = `http://api.giphy.com/v1/gifs/search?q=dog&api_key=LPL5n8UmdV6tgV2oY5aB14s1OvyTZ3qY&limit=8`;

  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => console.log(data));
}
