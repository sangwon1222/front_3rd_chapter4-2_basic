function showTopBar() {
  let country = "France";
  let vat = 20;
  setTimeout(() => {
    const countryBar = document.querySelector("section.country-bar");
    countryBar.innerHTML = `<p>Orders to <b>${country}</b> are subject to <b>${vat}%</b> VAT</p>`;
  }, 1000);
}

showTopBar();
