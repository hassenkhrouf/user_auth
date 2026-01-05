document.addEventListener("DOMContentLoaded", () => {
  const loginCard = document.getElementById("loginCard");
  const registerCard = document.getElementById("registerCard");
  const showRegister = document.getElementById("showRegister");
  const showLogin = document.getElementById("showLogin");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginFeedback = document.getElementById("loginFeedback");
  const registerFeedback = document.getElementById("registerFeedback");

  function clearFeedback() {
    [loginFeedback, registerFeedback].forEach((el) => {
      el.textContent = "";
      el.classList.remove("error", "success");
    });
  }

  function show(elToShow, elToHide) {
    elToHide.classList.add("hidden");
    elToHide.setAttribute("aria-hidden", "true");
    elToShow.classList.remove("hidden");
    elToShow.setAttribute("aria-hidden", "false");
    clearFeedback();
    const firstInput = elToShow.querySelector("input");
    if (firstInput) firstInput.focus();
  }

  showRegister.addEventListener("click", () => show(registerCard, loginCard));
  showLogin.addEventListener("click", () => show(loginCard, registerCard));

  // Extract useful message from HTML error pages like "<pre>Cannot POST /login</pre>"
  function extractMessageFromHtml(html) {
    if (!html) return "";
    const preMatch = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
    if (preMatch && preMatch[1]) return preMatch[1].trim();
    // fallback: strip tags
    const stripped = html.replace(/<[^>]+>/g, "").trim();
    return stripped;
  }

  async function postJson(url, body) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        const msg = extractMessageFromHtml(text) || text;
        data = { message: msg };
      }
      if (!res.ok)
        throw new Error(data.message || res.statusText || "Request failed");
      return data;
    } catch (err) {
      throw err;
    }
  }

  function showFeedback(el, msg, isError = true) {
    el.textContent = msg;
    el.classList.remove("success", "error");
    el.classList.add(isError ? "error" : "success");
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginFeedback.textContent = "";
    const payload = {
      email: document.getElementById("loginEmail").value.trim(),
      password: document.getElementById("loginPassword").value,
    };
    try {
      // updated endpoint to match server.js (routes mounted at /api/auth)
      await postJson("/api/auth/login", payload);
      showFeedback(loginFeedback, "Login successful", false);
    } catch (err) {
      showFeedback(loginFeedback, err.message || "Login failed");
    }
  });

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    registerFeedback.textContent = "";
    const payload = {
      email: document.getElementById("registerEmail").value.trim(),
      password: document.getElementById("registerPassword").value,
    };
    try {
      // updated endpoint to match server.js (routes mounted at /api/auth)
      await postJson("/api/auth/register", payload);
      showFeedback(registerFeedback, "Registration successful", false);
    } catch (err) {
      showFeedback(registerFeedback, err.message || "Registration failed");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") show(loginCard, registerCard);
  });
});
