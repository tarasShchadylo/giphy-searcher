import ('../styles/main.scss');


export default function () {
  function createNode(element) {
    return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

  const ul = document.getElementById("items");
  const input = document.querySelector("#search-js");

  const api = "http://api.giphy.com/v1/gifs/random";
  const apiKey = "?api_key=LPL5n8UmdV6tgV2oY5aB14s1OvyTZ3qY";
  const limit = 8;
  let tag = '';

  setup();

  function setup() {
    const buttonFind = document.querySelector("#find-js");
    const buttonRefresh = document.querySelector("#refresh-js");

    const setupData = (isRefresh) => {
      if (ul.lastElementChild) {
        ul.innerHTML = "";
      }
      const nameGif = isRefresh ? tag : '&tag=' + input.value;
      if (!nameGif) {
        return;
      }
      const url = `${api}${apiKey}${nameGif}`;
      const result = [];
      const requestList = [];

      for (let i = 0; i < limit; i++) {
        requestList.push(
          fetch(url)
            .then(response => response.json())
            .then(resp => {
              result.push(resp);
            })
            .catch(function (error) {
              console.log(error);
            })
        );
      }

      Promise.all(requestList).finally(() => {
        outputInputData(result);
        input.value = "";
        tag = nameGif;
      });
    };

    buttonFind.addEventListener("click", () => {
      setupData(false);
    });
    buttonRefresh.addEventListener("click", () => {
      setupData(true);
    });
    input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        setupData(false);
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

      img.src = `${giphy.data.images.downsized_large.url}`;
      h3.textContent = `${giphy.data.title}`;
      spanBtn.textContent = "i";
      url.textContent = "Original";
      url.href = `${giphy.data.url}`;
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
          `${giphy.data.images.downsized_large.width}x${giphy.data.images.downsized_large.height}`
        ) {
          size.textContent = "";
        } else {
          size.textContent = `${giphy.data.images.downsized_large.width}x${giphy.data.images.downsized_large.height}`;
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
