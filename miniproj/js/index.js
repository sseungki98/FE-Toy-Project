const SERVER_URL = "http://127.0.0.1:8000";

async function getArticleList() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let datas = await response.json();
    let articleList = document.getElementById("articleList");
    datas.forEach((data, index) => {
        articleList.insertAdjacentHTML(
            "beforeend",
            `
        <button type="button" class="list-group-item" id=${data.id} onclick="showArticleDetailModal(event)">
        <li id=${data.id}>
        <p><strong>${data.title}</strong><p>작성자: ${data.author}</p></p>
        </li>
        </button>
        `
        );
    });
}

async function postArticle(formData) {
    let token = getCookie("access_token");
    let response = await fetch(`${SERVER_URL}/blog/article`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    let res_data = await response.json();
    return res_data;
}

async function submitPostArticle() {
    let form = document.getElementById("form");
    let formData = new FormData(form);
    console.log(formData);
    let response = postArticle(formData);
    console.log(response);
    return response;
}

async function postCategory(data) {
    let token = getCookie("access_token");
    let response = await fetch(`${SERVER_URL}/blog/category`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    let res_data = await response.json();
    return res_data;
}

async function submitPostCategory() {
    let name = {
        name: document.getElementById("category_name").value,
    };
    let response = await postCategory(name);
    return response;
} // id:0, name:'여행'

async function getArticleDetail(id) {
    console.log(id);
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`);
    let data = await response.json();
    console.log(data);
    let articleDetailModal = document.getElementById("detailModal");
    articleDetailModal.innerHTML = `
    <h1 id="detailTitle">${data.title}</h1>
    <p id="detailContent">${data.content}</p>
    <p id="detailCategory">${data.category.name}</p>
    <p id="detailImage">${data.image}</p>
    <p id="detailAuthor">${data.author}</p>
    <button onclick="closeArticleDetailModal()">취소</button>
    <button onclick="deleteArticle(${data.id})">삭제</button>
    <button onclick="editArticle(${data.id})">수정</button>
    `;
    return data;
}

function showArticleDetailModal(id) {
    let target_id = id.currentTarget.id;
    let response = getArticleDetail(target_id);
    let modal = document.getElementById("articleDetailModal");
    modal.style.display = "block";
    modal.style.animation = "fadein 1s";
    return response;
}

function closeArticleDetailModal() {
    let modal = document.getElementById("articleDetailModal");
    modal.style.animation = "fadeout 1s";
    setTimeout(() => (modal.style.display = "none"), 1000);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function showArticlePostModal() {
    let articlePostModal = document.getElementById("postArticleModal");
    articlePostModal.style.animation = "fadein 1s";
    articlePostModal.style.display = "block";
}

function closeArticlePostModal() {
    let articlePostModal = document.getElementById("postArticleModal");
    articlePostModal.style.animation = "fadeout 1s";
    setTimeout(() => (articlePostModal.style.display = "none"), 1000);
}

async function deleteArticle(id) {
    let token = getCookie("access_token");
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        return res.status;
    });
}

async function editArticle(id) {
    let data = await getArticleDetail(id);
    let articleDetailModal = document.getElementById("detailModal");
    articleDetailModal.innerHTML = `
    <form id="editForm">
    <input id="detailTitle" name="title" value=${data.title} />
    <textarea id="detailContent" name="content">${data.content}</textarea>
    <input name="category" id="detailCategory" value=${data.category.id} />
    <input type="file" name="image" id="detailImage" />
    </form>
    <div style="display: flex; flex-direction: column"> 
    <button onclick="submitEditArticle(${data.id})">수정하기</button>
    <button onclick="closeArticleDetailModal()">취소하기</button>
    </div>
    `;
}

async function submitEditArticle(id) {
    let token = getCookie("access_token");
    let form = document.getElementById("editForm");
    let formData = new FormData(form);
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

async function getListByCategory() {
    let id = document.getElementById("category_id").value;
    let articleList = document.getElementById("articleList");
    console.log("id:", id);
    if (id === "") {
        articleList.innerHTML = "";
        return getArticleList();
    }
    let response = await fetch(`${SERVER_URL}/blog/article`);
    await response.json().then((datas) => {
        articleList.innerHTML = "";
        datas.forEach((data, index) => {
            if (data.category.id == id) {
                console.log(data);
                articleList.insertAdjacentHTML(
                    "beforeend",
                    `
                <button type="button" class="list-group-item" id=${data.id} onclick="showArticleDetailModal(event)">
                <li id=${data.id}>
                <p><strong>${data.title}</strong><p>작성자: ${data.author}</p></p>
                </li>
                </button>
                `
                );
            }
        });
    });
}

getArticleList();
