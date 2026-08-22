(function () {
  const STORAGE_KEY = "enbw_notice_closed";

  function closeNotice() {
    const overlay = document.getElementById("noticeOverlay");
    if (!overlay) return;

    overlay.classList.add("notice-closing");

    setTimeout(() => {
      overlay.hidden = true;
      document.body.classList.remove("notice-open");
    }, 220);

    localStorage.setItem(STORAGE_KEY, "1");
  }

  function openNotice() {
    const overlay = document.getElementById("noticeOverlay");
    if (!overlay) return;

    overlay.hidden = false;

    requestAnimationFrame(() => {
      overlay.classList.add("notice-visible");
    });

    document.body.classList.add("notice-open");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("noticeOverlay");
    const closeButton = document.getElementById("noticeClose");
    const continueButton = document.getElementById("noticeContinue");

    if (!overlay) return;

    if (localStorage.getItem(STORAGE_KEY) !== "1") {
      openNotice();
    } else {
      overlay.hidden = true;
    }

    closeButton?.addEventListener("click", closeNotice);
    continueButton?.addEventListener("click", closeNotice);

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeNotice();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !overlay.hidden) {
        closeNotice();
      }
    });
  });

  window.resetNoticeCard = function () {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  };
})();
