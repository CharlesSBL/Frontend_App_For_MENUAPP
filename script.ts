// =============================================================== Get elem
// body
const body = document.body;
// elem for title buttons
const menu__body = document.querySelector(".menu__body");
const menu__buttons = document.querySelector(".menu__buttons");
// to get dark light buttons
const theme__btn_light = document.querySelector(".theme__btn-light");
const theme__btn_dark = document.querySelector(".theme__btn-dark");
// making arr of save there list of dishes api
let data_num: any;

// options for eventTarget
const options = {
  capture: false, // phase on that func must run
  once: false, // if true, event will remove himself after one running
  passive: false, // if true, it will never call func preventDefault()
};

// =============================================================== Generate new List of dishes

// clear menu body
function clear() {
  if (menu__body) {
    menu__body.innerHTML = ``;
  }
}
// Generate element and add him
function addElements(data: any) {
  for (let i: number = 0; i < data.length; i++) {
    if (i == 20) {
      break;
    }
    // create new div
    const newCard = document.createElement("div");

    // add classes to him
    newCard.classList.add("menu__card");
    newCard.classList.add(`card_${i}`);

    // add elements to new card
    newCard.innerHTML = `   <div class="img_back img_back_${i}">
                                    <div class="card__img c-img_${i}"></div>
                                </div>
                                <div class="card__right-side right-side_${i}">
                                    <div class="card__head c-head_${i}">
                                        <p class="card__title c-title_${i}">${data[i]["name"]}</p>
                                        <p class="card__price c-price_${i}"><span class="card__span c-span_${i}">$${data[i]["price"]}</span></p>
                                    </div>
                                    <div class="card__body c-body_${i}">
                                        <div class="card__line line_${i}"></div>
                                        <p class="card__text c-text_${i}">${data[i]["dsc"]}</p>
                                    </div>
                                </div>`;
    // get class where we will add new background img
    const img = newCard.querySelector<HTMLElement>(`.c-img_${i}`)!;
    // add img url to css
    img.style.backgroundImage = `url("${data[i]["img"]}")`;
    // adding new list to body of menu
    menu__body?.appendChild(newCard);
  }
}
// getting arr of dishes api
function test(typeOfFood: any): void {
  fetch(`https://food-backend-h662.onrender.com/${typeOfFood}`)
    .then((response) => response.json())
    .then((data) => {
      // clear list
      clear();

      // Generate list of dishes
      addElements(data);

      // save arr of dishes
      data_num = data;

      // saving all cards
      const menu__card = document.querySelectorAll(".menu__card");

      // adding to them class animation
      let count: number = 0;
      const t = setInterval(() => {
        if (count == 20) {
          clearInterval(t);
        }
        menu__card[count].classList.add("menu__card_animation");
        count++;
      }, 100);
    });
}

// ================================================ Changing Card Desc
// getting index of clicked card
function getIndex(target: any): number {
  // getting classes of cards
  const cardClasses = target.classList;
  // getting second class with number
  const cardClass = cardClasses[1];

  // in class used (_) to split words and numbers
  const cardSplitted = cardClass.split("_");
  // saving number
  const card = cardSplitted[cardSplitted.length - 1];
  // return index number of class of card
  return card;
}

// clear card desc info
function clearCardDesc() {
  // getting card desc
  const c_desc = document.querySelector<HTMLElement>(".c-desc");
  // clear card
  if (c_desc) {
    c_desc.innerHTML = ``;
  }
}

// generate new info on card
function getCard(dataArr: any, index: any): void {
  // clear card desc info
  clearCardDesc();

  // get card dest item
  const c_desc = document.querySelector(".c-desc");

  // adding element info to card desc
  if (c_desc) {
    c_desc.innerHTML = `<div class="c-desc__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                    </div>
                    <div class="c-desc__left c-desc__left_1">
                        <div class="c-desc__img c-desc__img_1"></div>
                    </div>
                    <div class="c-desc__right-side c-desc__right-side_1">
                        <div class="c-desc__head c-desc__head_1">
                            <p class="c-desc__title c-desc__title_1">${dataArr[index]["name"]}</p>
                            <p class="c-desc__price c-desc__price_1"><span>$${dataArr[index]["price"]}</span></p>
                        </div>
                        <div class="c-desc__body c-desc__body_1">
                            <div class="c-desc__line c-desc__line_1"></div>
                            <p class="c-desc__text c-desc-text_1">${dataArr[index]["dsc"]}</p>
                        </div>
                    </div>`;
    // changing url background of card desc
    const img = c_desc.querySelector<HTMLElement>(`.c-desc__img`)!;
    // adding url img
    img.style.backgroundImage = `url("${dataArr[index]["img"]}")`;
  }
}

// ========================================================== Events
// event to filter list of dishes
menu__buttons?.addEventListener(
  "click",
  (event) => {
    event.stopPropagation();
    // getting card desc
    const c_desc = document.querySelector(".c-desc");
    // removing class for hide card
    c_desc?.classList.remove("c-desc_active");

    // getting licked elem
    const target = event.target as HTMLButtonElement;
    if (target) {
      switch (target) {
        case target.closest(".btn_1"):
          // generate new list dishes
          test("our-foods");
          break;
        case target.closest(".btn_2"):
          // generate new list dishes
          test("best-foods");
          break;
        case target.closest(".btn_3"):
          // generate new list dishes
          test("drinks");
          break;
        case target.closest(".btn_4"):
          test("pizzas");
          break;
      }
    }
    if (target) {
      switch (target) {
        case target.closest(".btn_paper_1"):
          // generate new list dishes
          test("our-foods");
          break;
        case target.closest(".btn_paper_2"):
          test("best-foods");
          break;
        case target.closest(".btn_paper_3"):
          test("drinks");
          break;
        case target.closest(".btn_paper_4"):
          test("pizzas");
          break;
      }
    }
    if (target) {
      switch (target) {
        case target.closest(".btn_text_1"):
          test("our-foods");
          break;
        case target.closest(".btn_text_2"):
          test("best-foods");
          break;
        case target.closest(".btn_text_3"):
          test("drinks");
          break;
        case target.closest(".btn_text_4"):
          test("pizzas");
          break;
      }
    }
  },
  options
);

// Change theme of website
theme__btn_dark?.addEventListener("click", () => {
  // adding hover class
  if (!body.classList.contains("hover")) {
    body.classList.add("hover");
  }
});

// Change theme of website
theme__btn_light?.addEventListener("click", () => {
  // adding hover class
  if (body.classList.contains("hover")) {
    body.classList.remove("hover");
  }
});

// generate new info on card desc
menu__body?.addEventListener(
  "click",
  (event) => {
    // get event.target
    const target = event.target as HTMLButtonElement;
    // get card dest
    const c_desc = document.querySelector(".c-desc");
    // get index of clicked list card
    const cardIndex = getIndex(target);

    // gen new info on card
    getCard(data_num, cardIndex);
    // get exit button on new gen info card
    const c_desc__icon = document.querySelector(".c-desc__icon");

    // to add to card new func
    if (target.closest(".menu__card")) {
      // open card
      c_desc?.classList.toggle("c-desc_active");

      // hide menu list
      menu__body.classList.toggle("menu__body_active-hidden");
      menu__buttons?.classList.toggle("menu__buttons_active-hidden");

      // add to icon function to exit
      c_desc__icon?.addEventListener("click", (event) => {
        // getting icon
        const c_desc = document.querySelector(".c-desc");
        // toggle hidden
        c_desc?.classList.toggle("c-desc_active");
        menu__buttons?.classList.toggle("menu__buttons_active-hidden");

        // unhide menu list
        menu__body.classList.toggle("menu__body_active-hidden");
      });
    }
  },
  false
);

const up_button = document.querySelector(".up-button");

window.addEventListener("scroll", () => {
  up_button?.classList.toggle("up-button_active", window.scrollY > 500);
});

up_button?.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
