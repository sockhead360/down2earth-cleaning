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

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    if (!form.reportValidity()) {
      return;
    }

    const status = form.querySelector(".form-status");
    const subject = encodeURIComponent("Cleaning inquiry from website");
    const body = encodeURIComponent(
      Array.from(new FormData(form).entries())
        .filter(([, value]) => String(value).trim() !== "")
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")
    );

    if (status) {
      status.textContent = "Opening your email app with this message ready to send.";
    }

    window.location.href = `mailto:down2earthcleaningco@gmail.com?subject=${subject}&body=${body}`;
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
