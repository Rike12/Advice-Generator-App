const adviceIdSpan = document.querySelector(".advice-id");
const quoteDiv = document.querySelector(".quote");
const diceBtn = document.querySelector(".dice");
const dualRing = document.querySelector(".lds-dual-ring");
const title = document.querySelector(".title");
let isDisabled = false;

document.addEventListener(
    "DOMContentLoaded",
    async () => {
      await fetchAdvice();
    },
    false
  );
  
  diceBtn.addEventListener("click", async () => {
    if (isDisabled) 
      return;
    adviceIdSpan.innerHTML = '';
    quoteDiv.innerHTML = ''; 
    await fetchAdvice();
  });

  // FETCH API  
  const fetchAdvice = async () => {
    title.style.marginBottom = "6rem";
    dualRing.classList.remove("disabled");
    diceBtn.classList.add("disabled");
    isDisabled = true;
    setTimeout(async () => {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      const { id, advice } = data.slip;
      adviceIdSpan.innerHTML = id;
      quoteDiv.innerHTML = `“${advice}”`;
      dualRing.classList.add("disabled");
      title.style.marginBottom = "0";
    }, 500);
    setTimeout(() => {
      diceBtn.classList.remove("disabled");
      isDisabled = false;
    }, 2000);
  };