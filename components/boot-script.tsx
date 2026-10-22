/**
 * Runs before first paint. It restores the visitor's theme and annotation
 * preferences (so there is no flash of the wrong scheme) and decides whether
 * the load animation should play.
 *
 * The annotation layer is visible by default and styled to be correct
 * without this script - the script only adds the draw-in, once per session,
 * and removes the flag when it has settled.
 */
const boot = `
(function () {
  try {
    var el = document.documentElement;
    var theme = localStorage.getItem("mm-theme");
    if (theme === "light" || theme === "dark") el.setAttribute("data-theme", theme);
    if (localStorage.getItem("mm-anno") === "off") el.setAttribute("data-anno", "off");
    if (localStorage.getItem("mm-grid") === "on") el.setAttribute("data-grid", "on");

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && !sessionStorage.getItem("mm-drawn")) {
      sessionStorage.setItem("mm-drawn", "1");
      el.setAttribute("data-draw", "run");
      window.setTimeout(function () { el.removeAttribute("data-draw"); }, 2000);
    }
  } catch (e) {}
})();
`;

export function BootScript() {
  return <script dangerouslySetInnerHTML={{ __html: boot }} />;
}
