const allowedKeys = {
  ArrowLeft: "left",
  ArrowUp: "up",
  ArrowRight: "right",
  ArrowDown: "down",
  a: "a",
  b: "b",
};

const konamiCode = [
  "up",
  "up",
  "down",
  "down",
  "left",
  "right",
  "left",
  "right",
  "b",
  "a",
];

let konamiCodePosition = 0;

document.addEventListener("keydown", (e) => {
  const key = allowedKeys[e.key];
  const requiredKey = konamiCode[konamiCodePosition];

  if (key === requiredKey) {
    konamiCodePosition++;

    if (konamiCodePosition === konamiCode.length) {
      activateKonami();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

function activateKonami() {
   window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
}
