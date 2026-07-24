document.addEventListener("DOMContentLoaded", function () {
  fetch("/header.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Не вдалося завантажити header.html");
      }
      return response.text();
    })
    .then((html) => {
      // 1. Якщо на сторінці є контейнер <div id="header-placeholder"></div>
      const placeholder = document.getElementById("header-placeholder");

      // 2. Якщо контейнера немає, шукаємо тег <header>
      const existingHeader = document.querySelector("header");

      if (placeholder) {
        placeholder.innerHTML = html;
      } else if (existingHeader) {
        existingHeader.outerHTML = html;
      } else {
        // 3. Якщо немає ні контейнера, ні тегу <header> — вставляємо на початок <body>
        document.body.insertAdjacentHTML("afterbegin", html);
      }
    })
    .catch((error) => console.error("Помилка завантаження хедера:", error));
});