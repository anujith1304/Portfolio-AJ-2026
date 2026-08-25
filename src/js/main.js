function updateLocalTime() {
  const el = document.getElementById("local-time");
  if (!el) return;
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(new Date());
  el.textContent = `${time} GMT+5:30`;
}

updateLocalTime();
setInterval(updateLocalTime, 30000);

const copyBtn = document.getElementById("copy-email");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("anujithchand2002@gmail.com");
      copyBtn.setAttribute("aria-label", "Email address copied");
    } catch {
      // Clipboard unavailable (insecure context or denied) — the address stays
      // visible next to the button, so there is nothing to fall back to.
    }
  });
}
