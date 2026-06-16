const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".message-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!(form instanceof HTMLFormElement)) return;
    if (!form.reportValidity()) return;

    const status = form.querySelector(".form-status");

    fetch("/contact.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        if (status) status.textContent = "Message sent! We'll be in touch soon.";
        form.reset();
      })
      .catch(() => {
        if (status) status.textContent = "Something went wrong. Please call us at (727) 735-5006.";
      });
  });
});

document.querySelectorAll("img[data-srcs]").forEach((image) => {
  const sources = image.dataset.srcs?.split(",").map((source) => source.trim()) ?? [];
  let nextSource = 0;

  image.addEventListener("error", () => {
    nextSource += 1;

    if (nextSource < sources.length) {
      image.src = sources[nextSource];
      return;
    }

    image.hidden = true;
  });
});
