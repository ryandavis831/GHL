/* ==========================================================================
   Carolina Commercial Cleaning Services Inc — scripts.js
   Vanilla JS. No dependencies.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- 1. Header scroll state ------------------------------------ */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 2. Mobile nav drawer + accordions ------------------------- */
  var hamburger = document.querySelector("[data-nav-toggle]");
  var navMobile = document.querySelector("[data-nav-mobile]");
  if (hamburger && navMobile) {
    hamburger.addEventListener("click", function () {
      var open = navMobile.classList.toggle("is-open");
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  document.querySelectorAll("[data-m-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-m-toggle");
      var sub = document.getElementById(id);
      if (!sub) return;
      var open = sub.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      var chev = btn.querySelector(".chevron");
      if (chev) chev.style.transform = open ? "rotate(180deg)" : "";
    });
  });

  /* ---------- 3. Quote modal -------------------------------------------- */
  var modal = document.getElementById("quote-modal");
  var modalForm = modal && modal.querySelector("[data-quote-form]");
  var modalBody = modal && modal.querySelector("[data-quote-body]");
  var modalSuccess = modal && modal.querySelector("[data-quote-success]");

  function openModal(opts) {
    if (!modal) return;
    modal.classList.add("is-open");
    document.body.classList.add("is-locked");
    if (opts && opts.prefillService) {
      modal.querySelectorAll(".chip[data-service]").forEach(function (chip) {
        if (chip.getAttribute("data-service") === opts.prefillService) {
          chip.setAttribute("aria-pressed", "true");
        }
      });
    }
    // Reset success state on every open
    if (modalSuccess) modalSuccess.style.display = "none";
    if (modalForm) modalForm.style.display = "";
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("is-locked");
  }
  document.addEventListener("click", function (e) {
    var open = e.target.closest("[data-open-quote]");
    if (open) {
      e.preventDefault();
      openModal({ prefillService: open.getAttribute("data-prefill-service") });
      // Auto-close mobile drawer if it's open
      if (navMobile && navMobile.classList.contains("is-open")) {
        navMobile.classList.remove("is-open");
        if (hamburger) hamburger.setAttribute("aria-expanded", "false");
      }
      // Auto-close chat panel if it's open
      var chat = document.querySelector(".chat");
      if (chat) chat.classList.remove("is-open");
    }
    var close = e.target.closest("[data-close-quote]");
    if (close) {
      e.preventDefault();
      closeModal();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  /* ---------- 4. Service chip selector (modal + inline form) ----------- */
  document.querySelectorAll(".chips").forEach(function (group) {
    group.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip[data-service]");
      if (!chip) return;
      var pressed = chip.getAttribute("aria-pressed") === "true";
      chip.setAttribute("aria-pressed", pressed ? "false" : "true");
    });
  });

  /* ---------- 5. Quote form submit (demo only) ------------------------- */
  document.querySelectorAll("[data-quote-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var body = form;
      var success = form.parentNode.querySelector("[data-quote-success]");
      if (success) {
        body.style.display = "none";
        success.style.display = "flex";
      }
      // Hook real backend (GoHighLevel, etc.) here.
    });
  });

  /* ---------- 6. Chat widget ------------------------------------------- */
  var chat = document.querySelector(".chat");
  if (chat) {
    var chatToggle = chat.querySelector(".chat-toggle");
    var chatClose = chat.querySelector(".chat-close");
    var chatMessages = chat.querySelector(".chat-messages");
    var chatInput = chat.querySelector(".chat-input input");
    var chatSend = chat.querySelector(".chat-send");

    function chatOpen() {
      chat.classList.add("is-open");
      chat.classList.add("is-seen");
      setTimeout(function () {
        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 100);
    }
    function chatToggleFn() {
      if (chat.classList.contains("is-open")) chat.classList.remove("is-open");
      else chatOpen();
    }
    if (chatToggle) chatToggle.addEventListener("click", chatToggleFn);
    if (chatClose) chatClose.addEventListener("click", function () {
      chat.classList.remove("is-open");
    });

    function appendBubble(from, text) {
      if (!chatMessages) return;
      var wrap = document.createElement("div");
      wrap.className = "chat-msg " + from;
      var bubble = document.createElement("div");
      bubble.className = "chat-bubble";
      bubble.textContent = text;
      wrap.appendChild(bubble);
      chatMessages.appendChild(wrap);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    function sendChat() {
      if (!chatInput) return;
      var v = (chatInput.value || "").trim();
      if (!v) return;
      appendBubble("user", v);
      chatInput.value = "";
      if (chatSend) chatSend.disabled = true;
      setTimeout(function () {
        appendBubble(
          "bot",
          "Thanks! A team member will reach out shortly. For a faster reply you can also tap Get a Quote or Call Now."
        );
      }, 450);
    }
    if (chatInput) {
      chatInput.addEventListener("input", function () {
        if (chatSend) chatSend.disabled = !chatInput.value.trim();
      });
    }
    if (chatSend) chatSend.addEventListener("click", sendChat);
    var chatForm = chat.querySelector(".chat-input");
    if (chatForm) chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      sendChat();
    });
  }

  /* ---------- 7. Clients infinite slider -------------------------------- */
  // Duplicate the track contents once so the CSS keyframes can loop seamlessly.
  document.querySelectorAll(".slider-track").forEach(function (track) {
    var clone = track.cloneNode(true);
    // Move the cloned children into the same track so we have 2x content
    while (clone.firstChild) track.appendChild(clone.firstChild);
  });
})();
