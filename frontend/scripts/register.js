var MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight = "0px";
function menutoggle() {
    if (MenuItems.style.maxHeight == "0px") {
        MenuItems.style.maxHeight = "200px"
    }
    else {
        MenuItems.style.maxHeight = "0px"
    }
}

  var LoginForm = document.getElementById("LoginForm");
  var RegForm = document.getElementById("RegForm");
  var Indicator = document.getElementById("Indicator");
  function register() {
    RegForm.style.transform = "translatex(0px)";
    LoginForm.style.transform = "translatex(0px)";
    Indicator.style.transform = "translateX(100px)";
  }
  function login() {
    RegForm.style.transform = "translatex(300px)";
    LoginForm.style.transform = "translatex(300px)";
    Indicator.style.transform = "translate(0px)";
  }
  const regbtn = document.getElementById("registerbtn");

regbtn.addEventListener("click", async (e) => {
e.preventDefault();

try {
    const response = await fetch("https://long-teal-fossa-wig.cyclic.app/users/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            username: document.getElementById("r_username").value,
            email: document.getElementById("r_email").value,
            password: document.getElementById("r_password").value,
            role: document.getElementById("role-select").value,
        }),
    });

    if (!response.ok) {
        window.alert("please enter right credintials")
        throw new Error(`Registration failed: ${response.statusText}`);

    }

    const data = await response.json();
    console.log(data);
} catch (err) {
    console.log(err.message);
}
});

const logbtn = document.getElementById("loginbtn");

logbtn.addEventListener("click", async (e) => {
e.preventDefault();

try {
    const response = await fetch("https://long-teal-fossa-wig.cyclic.app/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email: document.getElementById("l_email").value,
            password: document.getElementById("l_password").value,
        }),
    });

    if (!response.ok) {
      window.alert("please enter right credintials")
        throw new Error(`Login failed: ${response.statusText}`);
        
    }

    const data = await response.json();
    console.log(data);

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("name", data.name);
    location.href = "./notesDashboard.html";
} catch (err) {
    console.log(err.message);
}
});