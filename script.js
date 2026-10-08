/* =========================================================
   НАШЕ СВИДАНИЕ ♡
   Вся логика сайта
========================================================= */


/* =========================================================
   1. ДАННЫЕ СВИДАНИЯ
========================================================= */

const answers = {
    date: "",
    time: "",
    place: "",
    wish: "",
    hair: ""
};


/* =========================================================
   2. ОСНОВНЫЕ ЭЛЕМЕНТЫ
========================================================= */

const screens =
    document.querySelectorAll(".screen");

const toastElement =
    document.getElementById("toast");

const dateInput =
    document.getElementById("dateInput");

const timeInput =
    document.getElementById("timeInput");

const placeInput =
    document.getElementById("placeInput");

const wishInput =
    document.getElementById("wishInput");

const noButton =
    document.getElementById("noButton");

const feedingBear =
    document.getElementById("feedingBear");

const bearZone =
    document.getElementById("bearZone");

const feedMessage =
    document.getElementById("feedMessage");


/* =========================================================
   3. МИНИМАЛЬНАЯ ДАТА = СЕГОДНЯ
========================================================= */

function setMinimumDate() {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    dateInput.min =
        `${year}-${month}-${day}`;
}

setMinimumDate();


/* =========================================================
   4. ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
========================================================= */

function showScreen(name) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });


    const nextScreen =
        document.querySelector(
            `[data-screen="${name}"]`
        );


    if (!nextScreen) {
        return;
    }


    nextScreen.classList.add("active");

    nextScreen.scrollTop = 0;
}


/* =========================================================
   5. КНОПКИ НАЗАД
========================================================= */

document
    .querySelectorAll("[data-back]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showScreen(
                    button.dataset.back
                );

            }
        );

    });


/* =========================================================
   6. КНОПКА "ДА"
========================================================= */

document
    .querySelectorAll("[data-next]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showScreen(
                    button.dataset.next
                );

            }
        );

    });


/* =========================================================
   7. ВСПЛЫВАЮЩИЕ ПОДСКАЗКИ
========================================================= */

let toastTimer;

function showToast(text) {

    clearTimeout(toastTimer);

    toastElement.textContent =
        text;

    toastElement.classList.add(
        "show"
    );


    toastTimer =
        setTimeout(
            () => {

                toastElement.classList.remove(
                    "show"
                );

            },
            1900
        );
}


/* =========================================================
   8. ДАТА
========================================================= */

document
    .getElementById("dateNext")
    .addEventListener(
        "click",
        () => {

            const value =
                dateInput.value;


            if (!value) {

                showToast(
                    "выбери дату, видмедик 🥺"
                );

                return;
            }


            answers.date =
                value;


            showScreen("time");

        }
    );


/* =========================================================
   9. ВРЕМЯ
========================================================= */

document
    .getElementById("timeNext")
    .addEventListener(
        "click",
        () => {

            const value =
                timeInput.value;


            if (!value) {

                showToast(
                    "а время? 🕐"
                );

                return;
            }


            answers.time =
                value;


            showScreen("place");

        }
    );


/* =========================================================
   10. МЕСТО ВСТРЕЧИ
========================================================= */

document
    .getElementById("placeNext")
    .addEventListener(
        "click",
        () => {

            const value =
                placeInput.value.trim();


            if (value.length < 2) {

                showToast(
                    "напиши, где встретимся 📍"
                );

                return;
            }


            answers.place =
                value;


            showScreen("wish");

        }
    );


/* =========================================================
   11. ЧЕГО ХОЧЕТСЯ
========================================================= */

document
    .getElementById("wishNext")
    .addEventListener(
        "click",
        () => {

            const value =
                wishInput.value.trim();


            if (value.length < 2) {

                showToast(
                    "ну напиши хоть что-нибудь 🥺"
                );

                return;
            }


            answers.wish =
                value;


            showScreen("hair");

        }
    );


/* =========================================================
   12. ВЫБОР ПРИЧЁСКИ
========================================================= */

const hairCards =
    document.querySelectorAll(
        ".hair-card"
    );


hairCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            hairCards.forEach(
                otherCard => {

                    otherCard.classList.remove(
                        "selected"
                    );

                }
            );


            card.classList.add(
                "selected"
            );


            answers.hair =
                card.dataset.hair;

        }
    );

});


document
    .getElementById("hairNext")
    .addEventListener(
        "click",
        () => {

            if (!answers.hair) {

                showToast(
                    "выбери мне причёску 🎀"
                );

                return;
            }


            showScreen("feed");

        }
    );


/* =========================================================
   13. УБЕГАЮЩАЯ КНОПКА "НЕТ"
========================================================= */

const noPhrases = [

    "нет не принимается 😌",

    "не поймал 😭",

    "неееет",

    "куда нажимаешь 👀",

    "попробуй ещё",

    "эта кнопка сломалась 🧸",

    "только «да» 💗"

];


function moveNoButton(event) {

    if (event) {
        event.preventDefault();
    }


    const zone =
        noButton.parentElement;


    const zoneWidth =
        zone.clientWidth;

    const buttonWidth =
        noButton.offsetWidth;


    const maxX =
        Math.max(
            zoneWidth - buttonWidth,
            0
        );


    const newX =
        Math.random() * maxX;


    const newY =
        Math.random() * 7;


    noButton.style.left =
        `${newX}px`;

    noButton.style.top =
        `${newY}px`;

    noButton.style.transform =
        "translateX(0)";


    const phrase =
        noPhrases[
            Math.floor(
                Math.random()
                *
                noPhrases.length
            )
        ];


    showToast(phrase);
}


noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


noButton.addEventListener(
    "pointerdown",
    moveNoButton
);


/* =========================================================
   14. КОРМЛЕНИЕ МИШКИ
========================================================= */

const foodItems =
    document.querySelectorAll(
        ".food-item"
    );


let draggedFoodImage = null;

let currentPointerId = null;

let currentFoodName = "";

let feedingLocked = false;


/* ---------------------------------------------------------
   Начинаем тащить еду
--------------------------------------------------------- */

foodItems.forEach(item => {

    item.addEventListener(
        "pointerdown",
        startFoodDrag
    );

});


function startFoodDrag(event) {

    if (feedingLocked) {
        return;
    }


    event.preventDefault();


    currentPointerId =
        event.pointerId;


    const button =
        event.currentTarget;


    currentFoodName =
        button.dataset.name;


    const imagePath =
        button.dataset.image;


    draggedFoodImage =
        document.createElement("img");


    draggedFoodImage.src =
        imagePath;


    draggedFoodImage.className =
        "drag-food";


    document.body.appendChild(
        draggedFoodImage
    );


    moveDraggedFood(
        event.clientX,
        event.clientY
    );


    feedingBear.src =
        "assets/bears/bear-hungry.png";


    feedMessage.textContent =
        "неси сюда 👀";


    window.addEventListener(
        "pointermove",
        dragFood
    );


    window.addEventListener(
        "pointerup",
        dropFood
    );


    window.addEventListener(
        "pointercancel",
        cancelFoodDrag
    );

}


/* ---------------------------------------------------------
   Еда следует за пальцем / мышкой
--------------------------------------------------------- */

function moveDraggedFood(x, y) {

    if (!draggedFoodImage) {
        return;
    }


    draggedFoodImage.style.left =
        `${x}px`;

    draggedFoodImage.style.top =
        `${y}px`;
}


/* ---------------------------------------------------------
   Перетаскивание
--------------------------------------------------------- */

function dragFood(event) {

    if (
        !draggedFoodImage
        ||
        event.pointerId !== currentPointerId
    ) {

        return;
    }


    event.preventDefault();


    moveDraggedFood(
        event.clientX,
        event.clientY
    );


    const bearRect =
        bearZone.getBoundingClientRect();


    const bearCenterX =
        bearRect.left
        +
        bearRect.width / 2;


    const bearCenterY =
        bearRect.top
        +
        bearRect.height / 2;


    const distance =
        Math.hypot(

            event.clientX
            -
            bearCenterX,

            event.clientY
            -
            bearCenterY

        );


    /*
       Если еда приближается к мишке,
       он замечает её и открывает рот
    */

    if (distance < 125) {

        bearZone.classList.add(
            "near"
        );


        feedingBear.classList.add(
            "ready"
        );


        feedingBear.src =
            "assets/bears/bear-eating.png";


        feedMessage.textContent =
            "давай сюда 😮";

    }

    else {

        bearZone.classList.remove(
            "near"
        );


        feedingBear.classList.remove(
            "ready"
        );


        feedingBear.src =
            "assets/bears/bear-hungry.png";


        feedMessage.textContent =
            "неси сюда 👀";

    }

}


/* ---------------------------------------------------------
   Отпустили еду
--------------------------------------------------------- */

function dropFood(event) {

    if (
        !draggedFoodImage
        ||
        event.pointerId !== currentPointerId
    ) {

        return;
    }


    const bearRect =
        bearZone.getBoundingClientRect();


    /*
       Делаем зону чуть шире,
       чтобы на телефоне было удобно
    */

    const padding =
        25;


    const insideBear =

        event.clientX
            >=
            bearRect.left - padding

        &&

        event.clientX
            <=
            bearRect.right + padding

        &&

        event.clientY
            >=
            bearRect.top - padding

        &&

        event.clientY
            <=
            bearRect.bottom + padding;


    if (insideBear) {

        feedBear();

    }

    else {

        missedBear();

    }


    removeDraggedFood();
}


/* =========================================================
   15. МИШКА СЪЕЛ ЕДУ
========================================================= */

function feedBear() {

    feedingLocked =
        true;


    bearZone.classList.remove(
        "near"
    );


    feedingBear.classList.remove(
        "ready",
        "happy"
    );


    feedingBear.src =
        "assets/bears/bear-eating.png";


    feedingBear.classList.add(
        "eating"
    );


    feedMessage.textContent =
        "ам... 😋";


    /*
       Через небольшую паузу
       мишка становится счастливым
    */

    setTimeout(
        () => {

            feedingBear.classList.remove(
                "eating"
            );


            feedingBear.src =
                "assets/bears/bear-happy.png";


            /*
               Перезапускаем анимацию
            */

            void feedingBear.offsetWidth;


            feedingBear.classList.add(
                "happy"
            );


            createHearts();


            const happyPhrases = [

                "вкуснооо 🥹💗",

                "ням 😋",

                "медведик доволен ♡",

                "ещё хочу 👀",

                "это было очень вкусно",

                "спасибооо 🧸💕"

            ];


            feedMessage.textContent =

                happyPhrases[

                    Math.floor(
                        Math.random()
                        *
                        happyPhrases.length
                    )

                ];

        },
        430
    );


    /*
       Потом снова становится голодным,
       чтобы его можно было кормить
       бесконечно
    */

    setTimeout(
        () => {

            feedingBear.classList.remove(
                "happy"
            );


            feedingBear.src =
                "assets/bears/bear-hungry.png";


            feedMessage.textContent =
                "а ещё есть? 🥺";


            feedingLocked =
                false;

        },
        1750
    );

}


/* =========================================================
   16. ЕСЛИ НЕ ПОПАЛИ В МИШКУ
========================================================= */

function missedBear() {

    bearZone.classList.remove(
        "near"
    );


    feedingBear.classList.remove(
        "ready"
    );


    feedingBear.src =
        "assets/bears/bear-hungry.png";


    feedMessage.textContent =
        "ты мимо положил 😭";


    setTimeout(
        () => {

            if (!feedingLocked) {

                feedMessage.textContent =
                    "попробуй ещё ♡";

            }

        },
        1000
    );

}


/* =========================================================
   17. ОТМЕНА ПЕРЕТАСКИВАНИЯ
========================================================= */

function cancelFoodDrag() {

    bearZone.classList.remove(
        "near"
    );


    feedingBear.classList.remove(
        "ready"
    );


    feedingBear.src =
        "assets/bears/bear-hungry.png";


    removeDraggedFood();
}


/* =========================================================
   18. УДАЛЯЕМ ЛЕТАЮЩУЮ ЕДУ
========================================================= */

function removeDraggedFood() {

    if (draggedFoodImage) {

        draggedFoodImage.remove();

    }


    draggedFoodImage =
        null;


    currentPointerId =
        null;


    currentFoodName =
        "";


    window.removeEventListener(
        "pointermove",
        dragFood
    );


    window.removeEventListener(
        "pointerup",
        dropFood
    );


    window.removeEventListener(
        "pointercancel",
        cancelFoodDrag
    );

}


/* =========================================================
   19. СЕРДЕЧКИ ПОСЛЕ ЕДЫ
========================================================= */

function createHearts() {

    const rect =
        bearZone.getBoundingClientRect();


    const hearts = [
        "💗",
        "♡",
        "💕",
        "♥"
    ];


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        setTimeout(
            () => {

                const heart =
                    document.createElement(
                        "span"
                    );


                heart.className =
                    "food-heart";


                heart.textContent =

                    hearts[
                        Math.floor(
                            Math.random()
                            *
                            hearts.length
                        )
                    ];


                const randomX =
                    Math.random() * 110
                    -
                    55;


                heart.style.left =

                    rect.left
                    +
                    rect.width / 2
                    +
                    randomX
                    +
                    "px";


                heart.style.top =

                    rect.top
                    +
                    rect.height / 2
                    +
                    "px";


                document.body.appendChild(
                    heart
                );


                setTimeout(
                    () => {

                        heart.remove();

                    },
                    1200
                );

            },
            i * 80
        );

    }

}


/* =========================================================
   20. ПЕРЕХОД ПОСЛЕ КОРМЛЕНИЯ
========================================================= */

document
    .getElementById("feedNext")
    .addEventListener(
        "click",
        () => {

            updateSummary();

            showScreen(
                "summary"
            );

        }
    );


/* =========================================================
   21. КРАСИВАЯ ДАТА
========================================================= */

function formatDate(value) {

    if (!value) {
        return "—";
    }


    const parts =
        value
            .split("-")
            .map(Number);


    const year =
        parts[0];

    const month =
        parts[1];

    const day =
        parts[2];


    const date =
        new Date(
            year,
            month - 1,
            day
        );


    return date.toLocaleDateString(
        "ru-RU",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================================================
   22. ЗАПОЛНЯЕМ ИТОГОВЫЙ БИЛЕТ
========================================================= */

function updateSummary() {

    document
        .getElementById(
            "summaryDate"
        )
        .textContent =
        formatDate(
            answers.date
        );


    document
        .getElementById(
            "summaryTime"
        )
        .textContent =
        answers.time || "—";


    document
        .getElementById(
            "summaryPlace"
        )
        .textContent =
        answers.place || "—";


    document
        .getElementById(
            "summaryWish"
        )
        .textContent =
        answers.wish || "—";


    document
        .getElementById(
            "summaryHair"
        )
        .textContent =
        answers.hair || "—";

}


/* =========================================================
   23. ПОДТВЕРЖДЕНИЕ СВИДАНИЯ
========================================================= */

document
    .getElementById(
        "confirmButton"
    )
    .addEventListener(
        "click",
        () => {

            /*
               Telegram подключим позже.

               В Telegram потом будут
               отправляться только:

               дата
               время
               место
               желание
               причёска

               Еда НЕ отправляется.
            */


            console.log(
                "Ответы:",
                answers
            );


            showScreen(
                "final"
            );


            finalCelebration();

        }
    );


/* =========================================================
   24. ФИНАЛЬНЫЕ СЕРДЕЧКИ
========================================================= */

function finalCelebration() {

    const hearts = [
        "💗",
        "💕",
        "♡",
        "♥",
        "💖"
    ];


    for (
        let i = 0;
        i < 16;
        i++
    ) {

        setTimeout(
            () => {

                const heart =
                    document.createElement(
                        "span"
                    );


                heart.className =
                    "food-heart";


                heart.textContent =

                    hearts[
                        Math.floor(
                            Math.random()
                            *
                            hearts.length
                        )
                    ];


                heart.style.left =

                    (
                        15
                        +
                        Math.random()
                        *
                        70
                    )
                    +
                    "vw";


                heart.style.top =

                    (
                        65
                        +
                        Math.random()
                        *
                        20
                    )
                    +
                    "vh";


                heart.style.fontSize =

                    (
                        16
                        +
                        Math.random()
                        *
                        15
                    )
                    +
                    "px";


                document.body.appendChild(
                    heart
                );


                setTimeout(
                    () => {

                        heart.remove();

                    },
                    1200
                );

            },
            i * 80
        );

    }

}


/* =========================================================
   25. СОХРАНЯЕМ ВВЕДЁННЫЕ ДАННЫЕ,
   ЕСЛИ ПОЛЬЗОВАТЕЛЬ ВЕРНУЛСЯ НАЗАД
========================================================= */

dateInput.addEventListener(
    "change",
    () => {

        answers.date =
            dateInput.value;

    }
);


timeInput.addEventListener(
    "change",
    () => {

        answers.time =
            timeInput.value;

    }
);


placeInput.addEventListener(
    "input",
    () => {

        answers.place =
            placeInput.value.trim();

    }
);


wishInput.addEventListener(
    "input",
    () => {

        answers.wish =
            wishInput.value.trim();

    }
);


/* =========================================================
   26. ГОТОВО ♡
========================================================= */

console.log(
    "Сайт свидания загружен 🧸💕"
);