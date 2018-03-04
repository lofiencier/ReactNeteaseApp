export function mount(dom) {
  dom.addEventListener("mouseover", overHandler, false);
  dom.addEventListener("mouseleave", leaveHandler, false);
}

function overHandler() {
  document.body.addEventListener(
    "mousewheel",
    wheelHandler,
    { passive: false },
    false
  );
  document.body.addEventListener(
    "wheel",
    wheelHandler,
    { passive: false },
    false
  );
  document.body.addEventListener(
    "DOMMouseScroll",
    wheelHandler,
    { passive: false },
    false
  );
}

const wheelHandler = e => {
  e = e || window.event;
  e.preventDefault();
  return false;
};

function leaveHandler() {
  document.body.removeEventListener("mousewheel", wheelHandler, false);
  document.body.removeEventListener("wheel", wheelHandler, false);
  document.body.removeEventListener("DOMMouseScroll", wheelHandler, false);
}

export function unmount(dom) {
  dom.removeEventListener("mouseover", overHandler, false);
  dom.removeEventListener("mouseleave", leaveHandler, false);
}
