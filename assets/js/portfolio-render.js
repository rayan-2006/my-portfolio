fetch('assets/database/portfolio-data.json', { method: "GET" })
  .then(response => {
    return response.json();
  }).then(data => {
    const PortfolioBoxs = document.getElementById("portfolio-container");
    data.forEach((Rayan, index) => {

      const PortfolioBoxBTN = document.createElement("button");
      const PortfolioBox = document.createElement("div");
      const iframeBox = document.createElement("div");
      const iframe = document.createElement("iframe");
      const span = document.createElement("span");
      const row = document.createElement("div");
      const h4 = document.createElement("h4");
      const p = document.createElement("p");
      const a = document.createElement("a");
      const i = document.createElement("i");

      row.classList.add("Portfolio-x");
      iframeBox.classList.add("iframe-box");
      PortfolioBoxBTN.classList.add("s-btn");
      PortfolioBox.classList.add("Portfolio-box");
      i.classList.add("fa-solid", "fa-chevron-right");

      a.href = Rayan.src;
      a.target = "_blank";

      iframe.src = Rayan.src;
      iframe.title = Rayan.title;
      iframe.sandbox = "allow-scripts";
      iframe.scrolling = "no";
      iframe.frameborder = "0";

      span.textContent = `Fintech`;
      h4.textContent = Rayan.title;
      p.textContent = Rayan.description;
      PortfolioBoxBTN.textContent = `See the Full Case`;

      PortfolioBoxBTN.appendChild(i);
      a.appendChild(PortfolioBoxBTN);
      iframeBox.appendChild(iframe);
      PortfolioBox.append(span, h4, p, a);
      if (index % 2 === 0) {
        row.append(PortfolioBox, iframeBox);
      } else {
        row.append(iframeBox, PortfolioBox);
      }
      PortfolioBoxs.appendChild(row);

    })
  }).catch(err => {
    console.error("Error =>", err);
  });