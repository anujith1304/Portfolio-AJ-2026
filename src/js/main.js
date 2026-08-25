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
