(function () {
  const timeEl = document.getElementById("term-time");
  const termMsg = document.getElementById("term-msg");
  const cmdInput = document.getElementById("cmd-input");
  const linkEntries = Array.from(document.querySelectorAll(".link-entry"));
  const bootLines = [
    document.getElementById("boot-1"),
    document.getElementById("boot-2"),
    document.getElementById("boot-3"),
  ].filter(Boolean);

  let cmdBuffer = "";

  function setMsg(text) {
    if (termMsg) termMsg.textContent = text;
  }

  function getLinkByIndex(num) {
    return linkEntries.find((el) => el.dataset.index === String(num));
  }

  function highlightEntry(num) {
    linkEntries.forEach((el) => {
      el.classList.toggle("link-active", el.dataset.index === String(num));
    });
  }

  function openEntry(num) {
    const entry = getLinkByIndex(num);
    if (!entry) {
      setMsg(`ERR: ENTRY [${num}] NOT FOUND. VALID: [1-${linkEntries.length}]`);
      highlightEntry(null);
      return;
    }
    const label = entry.textContent.trim().replace(/^\[\d+\]\s*/, "");
    setMsg(`OPENING ${label}...`);
    highlightEntry(num);
    window.open(entry.href, "_blank", "noopener,noreferrer");
  }

  /* Baise ta mere le javascript qui marche une fois sur deux putain */

  function renderCmd() {
    if (cmdInput) cmdInput.textContent = cmdBuffer;
    const num = parseInt(cmdBuffer, 10);
    if (cmdBuffer && num >= 1 && num <= linkEntries.length) {
      highlightEntry(num);
    } else {
      highlightEntry(null);
    }
  }

  function clearCmd() {
    cmdBuffer = "";
    renderCmd();
    highlightEntry(null);
  }

  function handleCommandKey(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key >= "1" && e.key <= "9") {
      e.preventDefault();
      cmdBuffer = e.key;
      renderCmd();
      setMsg("");
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      cmdBuffer = cmdBuffer.slice(0, -1);
      renderCmd();
      if (!cmdBuffer) setMsg("");
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      clearCmd();
      setMsg("INPUT CLEARED.");
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (!cmdBuffer) {
        setMsg("ERR: NO ENTRY SPECIFIED. TYPE [1-5] THEN ENTER.");
        return;
      }
      const num = parseInt(cmdBuffer, 10);
      openEntry(num);
      cmdBuffer = "";
      renderCmd();
      return;
    }
  }

  function updateClock() {
    if (!timeEl) return;
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    timeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }

  function runBootSequence() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    bootLines.forEach((line) => line.classList.add("boot-hidden"));

    if (reduced) {
      bootLines.forEach((line) => {
        line.classList.remove("boot-hidden");
        line.classList.add("boot-visible");
      });
      return;
    }

    bootLines.forEach((line, i) => {
      setTimeout(
        () => {
          line.classList.remove("boot-hidden");
          line.classList.add("boot-visible");
        },
        400 + i * 550,
      );
    });
  }

  updateClock();
  setInterval(updateClock, 1000);
  runBootSequence();

  window.addEventListener("keydown", handleCommandKey);

  linkEntries.forEach((entry) => {
    entry.addEventListener("mouseenter", () => {
      const idx = entry.dataset.index;
      if (idx) {
        cmdBuffer = idx;
        renderCmd();
      }
    });
    entry.addEventListener("mouseleave", () => {
      if (cmdBuffer === entry.dataset.index) {
        clearCmd();
        setMsg("");
      }
    });
  });
})();


console.log(`
  ⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣠⣤⡤⡤⡔⣶⣦⣤⡀⡀
⠀⠀⠀⠀⠀⣠⣶⡏⠉⠀⠀⠀⠀⠀⠀⠞⠿⠯⠯⠿⠟⠿⠻⠿⣿⣿⡇⠀
⠀⠀⠀⡀⣾⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣞⡷⡇⠀
⠀⠀⣼⡟⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣊⡏⡞⠁⠀
⠀⣾⡯⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡬⣟⡼⠁⠀⠀
⢀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⡽⡑⠁⠀⠀⠀
⢘⡏⡇⠀⠀⢀⣤⣶⣞⣟⣟⣿⣆⠀⠀⠀⠀⠀⠀⠀⣜⣏⢅⠂⠀⠀⠀⠀
⢸⡇⡇⠀⣰⢏⠍⠉⠁⠀⠉⢻⣻⠀⠀⠀⠀⠀⠀⠠⣇⠧⠁⠀⠀⠀⠀⠀
⠸⣫⣯⣞⡧⡋⠀⠀⠀⠀⠀⣸⡏⠀⠀⠀⠀⠀⢠⣉⡯⠁⠀⠀⠀⠀⠀⠀
⠀⠙⡯⣟⣿⡅⠀⠀⢀⣀⣰⡿⠁⠀⠀⠀⠀⢠⣟⡯⠅⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠉⠛⠻⠿⠗⠛⠁⠀⠀⠀⠀⠀⠀⠀⠹⠁⠀⠀⠀⠀⠀⠀⠀⠀
  `)