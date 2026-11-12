
const languageButton = document.getElementById("language");

let currentLanguage = "es";

languageButton.addEventListener("click", () => {
  currentLanguage = currentLanguage === "es" ? "en" : "es";

  document.querySelectorAll("[data-es]").forEach(element => {
    element.textContent = element.dataset[currentLanguage];
  });

  document.documentElement.lang = currentLanguage;
  languageButton.textContent = currentLanguage === "es" ? "EN" : "ES";
});
