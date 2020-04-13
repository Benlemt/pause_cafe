let adr_hackernews = "https://api.hnpwa.com/v0/news/1.json";
let adr_github = "https://github-trending-api.now.sh/";
let list_top_stories = document.getElementsByClassName("list_top_stories");
let list_stories = document.getElementsByClassName("list_stories");


function changeDisplayMode() {
    let head = document.getElementsByTagName("link");
    let checkbox = document.getElementById("mode");
    let modetext = document.getElementsByClassName("switch_text");

    if (checkbox.checked == true) {
        head[0].href = "css/dark.css";
        modetext[0].innerHTML = "Dark mode";
    }
    else {
        head[0].href = "css/light.css";
        modetext[0].innerHTML = "Light mode";
    }
}

function clear() {
    let list_top_stories = document.getElementsByClassName("list_top_stories");
    let number_child_list_top_stories = list_top_stories[0].childElementCount;
    for (let i = 0; i < number_child_list_top_stories; i++) {
        list_top_stories[0].removeChild(list_top_stories[0].lastChild);

    }

    let list_stories = document.getElementsByClassName("list_stories");
    let number_child_list_stories = list_stories[0].childElementCount;
    for (let i = 0; i < number_child_list_stories; i++) {
        list_stories[0].removeChild(list_stories[0].lastChild);
    }
}

function transformURL(url) {
    let size = url.length - 1;

    if (url.includes("https://")) {
        url = url.slice(8, url.length - 1);
    }
    else if (url.includes("http://")) {
        url = url.slice(7, url.length - 1);
    }
    if (url.includes("www.")) {
        url = url.slice(4, url.length - 1);
    }
    let array = url.split("/");
    return array[0];
}

function loadGitHub() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", adr_github);
    xhr.addEventListener("load", function() {
        let data = JSON.parse(xhr.response);

        for (let i = 0; i < data.length; i++) {
            let div_top_story = document.createElement("div");
            let li = document.createElement("li");
            let link = document.createElement("a");
            let title = document.createElement("h3");
            let language = document.createElement("h4");
            let description = document.createElement("p");

            let title_section = document.getElementById("title");
            title_section.innerText = "Explore";
            let data_title = data[i]["name"];
            let data_title_node = document.createTextNode(data_title);
            let data_description = data[i]["description"];
            let data_description_node = document.createTextNode(data_description);
            let data_link = data[i]["url"];

            if (data[i]["language"] != undefined) {
                let data_language = data[i]["language"];
                let data_language_node = document.createTextNode(data_language);
                language.style = "background-color : " + data[i]["languageColor"];
                language.appendChild(data_language_node);
                link.appendChild(language);
                li.style = "border-left: 3px solid " + data[i]["languageColor"];
            }

            link.href = data_link;
            description.appendChild(data_description_node);
            title.appendChild(data_title_node);
            link.appendChild(title);
            link.appendChild(description);

            li.appendChild(link);
            list_stories[0].appendChild(li);
        }

    });
    xhr.send();
}

function loadHackerNews() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", adr_hackernews);
    xhr.addEventListener("load", function () {
        let data = JSON.parse(xhr.response);

        let title_section = document.getElementById("title");
        title_section.innerText = "Top 3 Stories";

        for (let i = 0; i < data.length; i++) {

            let div_top_story = document.createElement("div");
            let li = document.createElement("li");

            let link = document.createElement("a");
            let title = document.createElement("h3");
            let source = document.createElement("p");

            div_top_story.className = "top_story";

            let data_title = data[i]["title"];
            let data_title_node = document.createTextNode(data_title);
            let data_url = data[i]["url"];
            let data_url_node = document.createTextNode(transformURL(data_url));

            link.href = data_url;
            source.appendChild(data_url_node);
            title.appendChild(data_title_node);
            link.appendChild(title);
            link.appendChild(source);

            if (i < 3) {
                div_top_story.appendChild(link);
                list_top_stories[0].appendChild(div_top_story);
            }
            else {
                li.appendChild(link);
                list_stories[0].appendChild(li);
            }

        }


    });
    xhr.send();
}

function switchToGitHub() {
    let github_btn = document.getElementById("github");
    let current_btn = document.getElementsByClassName("current");
    current_btn[0].className = "";
    github_btn.classList.add("current");
    clear();
    loadGitHub();
}

function switchToHackerNews() {
    let hackernews_btn = document.getElementById("hackernews");
    let current_btn = document.getElementsByClassName("current");
    current_btn[0].className = "";
    hackernews_btn.classList.add("current");
    clear();
    loadHackerNews();
}


loadHackerNews();