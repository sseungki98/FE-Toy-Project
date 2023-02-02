const SERVER_URL = "http://127.0.0.1:8000";

async function login(data) {
    let response = await fetch(`${SERVER_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    });

    if (response.status === 200) {
        let data = await response.json();
        setCookie("access_token", data.access_token);
        return data;
    } else {
        return new Error("로그인 에러 발생");
    }
}

async function submitLogin() {
    let data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    let response = await login(data);
    return response;
}

function setCookie(name, value) {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/";
    document.cookie = updatedCookie;
}
