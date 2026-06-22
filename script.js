// ===============================
// LOADING SCREEN
// ===============================

window.addEventListener("load", () => {

const loader =
    document.getElementById("loader");

setTimeout(() => {

    loader.style.opacity = "0";

    setTimeout(() => {
        loader.style.display = "none";
    }, 500);

}, 1500);


});

// ===============================
// HERO TYPING EFFECT
// ===============================

const typingWords = [
"English",
"Spanish",
"French",
"German",
"Japanese",
"Hindi",
"Chinese"
];

let wordIndex = 0;
let charIndex = 0;

function typeEffect() {


let currentWord =
    typingWords[wordIndex];

let currentText =
    currentWord.slice(0, ++charIndex);

const typing =
    document.getElementById("typing");

if (typing){
    typing.textContent =
        "Learn " +
        currentText +
        "";
}

if (
    currentText.length ===
    currentWord.length
) {

    setTimeout(() => {

        charIndex = 0;

        wordIndex++;

        if (
            wordIndex ===
            typingWords.length
        ) {
            wordIndex = 0;
        }

        typeEffect();

    }, 1500);

} else {

    setTimeout(typeEffect, 120);

}


}

typeEffect();

// ===============================
// DARK LIGHT MODE
// ===============================

const toggleBtn =
document.getElementById(
"theme-toggle"
);

if (toggleBtn) {

toggleBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-mode"
        );

    }
);


}

// ===============================
// LANGUAGE SEARCH
// ===============================

const searchInput =
document.getElementById(
"languageSearch"
);

if (searchInput) {


searchInput.addEventListener(
    "keyup",
    () => {

        let value =
            searchInput.value.toLowerCase();

        let cards =
            document.querySelectorAll(
                ".language-card"
            );

        cards.forEach(card => {

            if (
                card.innerText
                .toLowerCase()
                .includes(value)
            ) {

                card.style.display =
                    "block";

            } else {

                card.style.display =
                    "none";

            }

        });

    }
);


}

// ===============================
// AI TRANSLATOR
// ===============================

function sendMessage() {


let input =
    document.getElementById(
        "user-input"
    );

let chatBox =
    document.getElementById(
        "chat-box"
    );

let target =
    document.getElementById(
        "target-language"
    ).value;

let word =
    input.value
    .toLowerCase()
    .trim();

if (word === "") return;

chatBox.innerHTML += `
<div class="user-message">
    You:${word}
</div>
`;

setTimeout(function () {

    let translation =
        "Translation not found";

    switch(target){

    case "spanish":
        translation =
            spanish[word] ||
            "Translation not found";
        break;

    case "french":
        translation =
            french[word] ||
            "Translation not found";
        break;

    case "german":
        translation =
            german[word] ||
            "Translation not found";
        break;

    case "hindi":
        translation =
            hindi[word] ||
            "Translation not found";
        break;

    case "japanese":
        translation =
            japanese[word] ||
            "Translation not found";
        break;

    case "chinese":
        translation =
            chinese[word] ||
            "Translation not found";
        break;
}

    chatBox.innerHTML += `
<div class="ai-message">
    ${translation}
    <button onclick="speakTranslation('${translation}','${target}')">
        🔊
    </button>
</div>
`;


    chatBox.scrollTop =
        chatBox.scrollHeight;

}, 800);

input.value = "";

}

function speakTranslation(text, language) {

    const speech =
        new SpeechSynthesisUtterance(text);

    switch(language){

        case "spanish":
            speech.lang = "es-ES";
            break;

        case "french":
            speech.lang = "fr-FR";
            break;

        case "german":
            speech.lang = "de-DE";
            break;

        case "hindi":
            speech.lang = "hi-IN";
            break;

        case "japanese":
            speech.lang = "ja-JP";
            break;

        case "chinese":
            speech.lang = "zh-CN";
            break;

        default:
            speech.lang = "en-US";
    }

    speech.rate = 0.9;

    speechSynthesis.speak(speech);
}


// ===============================
// SPEECH SYNTHESIS
// ===============================

function speakWord() {


const text =
    document.getElementById(
        "dailyWord"
    ).innerText;

const speech =
    new SpeechSynthesisUtterance(
        text
    );

speech.lang = "en-US";

speechSynthesis.speak(
    speech
);


}

// ===============================
// ANIMATED COUNTERS
// ===============================

const counters =
document.querySelectorAll(
".counter"
);

function runCounter() {


counters.forEach(counter => {

    const target =
        +counter.dataset.target;

    let count = 0;

    const update = () => {

        count +=
            Math.ceil(
                target / 100
            );

        if (
            count < target
        ) {

            counter.innerText =
                count;

            requestAnimationFrame(
                update
            );

        } else {

            counter.innerText =
                target;

        }

    };

    update();

});


}

window.addEventListener(
"scroll",
runCounter,
{ once:true }
);



function openLesson(type){

const content =
document.getElementById("lessonContent");

content.innerHTML = `

<div class="lesson-header">

<h2>${type.toUpperCase()}</h2>

<select
id="lessonLanguage"
onchange="showLanguage('${type}', this.value)">

<option value="">Select Language</option>

<option value="english">English</option>
<option value="spanish">Spanish</option>
<option value="french">French</option>
<option value="german">German</option>
<option value="japanese">Japanese</option>
<option value="hindi">Hindi</option>
<option value="chinese">Chinese</option>

</select>

</div>

<div id="languageLesson"></div>

`;

}

function showLanguage(type, language){

const container =
document.getElementById("languageLesson");

if(!language) return;

let html = "";

lessons[type][language].forEach(item => {

html += `

<div class="sentence-card">

<div class="sentence-left">

<p class="english-text">
${item.english}
</p>

<h3 class="translated-text">
${item.translated}
</h3>

</div>

<button
class="speak-btn"
onclick="
speakTranslation(
'${item.translated}',
'${language}'
)
">

🔊

</button>

</div>

`;

});

container.innerHTML = html;

}

