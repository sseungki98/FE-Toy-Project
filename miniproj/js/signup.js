const SERVER_URL = "http://127.0.0.1:8000";
async function register(data) {
    let response = await fetch(`${SERVER_URL}/user/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
        credentials: "include",
    });
    let res_data = await response.json();
    return res_data;
}
// test1@naver.com / testtest / tester1
async function submitRegister() {
    let data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        fullname: document.getElementById("fullname").value,
    };

    let response = await register(data);
    return response;
}
