// --- DEMO: LOGIC & TOGGLES ---

const body = document.body;
const modeText = document.getElementById('mode-text');
const vpDisplay = document.getElementById('vp-width');
const layoutState = document.getElementById('layout-state');

// Mobile stats elements
const mobileVp = document.getElementById('mobile-vp');
const mobileLayout = document.getElementById('mobile-layout');
const mobileCols = document.getElementById('mobile-cols');

// 1. Monitor Viewport
function updateMetrics() {
    const w = window.innerWidth;

    // Desktop stats
    if (vpDisplay) vpDisplay.textContent = w + 'px';

    // Mobile stats
    if (mobileVp) mobileVp.textContent = w + 'px';

    let layoutText, colCount;
    if (w < 768) {
        layoutText = "Mobile";
        colCount = "2";
    } else if (w < 1024) {
        layoutText = "Tablet";
        colCount = "2-3";
    } else if (w < 1800) {
        layoutText = "Desktop";
        colCount = "3";
    } else {
        layoutText = "Ultrawide";
        colCount = "4";
    }

    if (layoutState) layoutState.textContent = layoutText + " (" + (w < 1024 ? "Bento" : w < 1800 ? "Sidebar" : "Cockpit") + ")";
    if (mobileLayout) mobileLayout.textContent = layoutText;
    if (mobileCols) mobileCols.textContent = colCount;
}

window.addEventListener('resize', updateMetrics);
updateMetrics();

// 2. Toggle Legacy Mode
let isLegacy = false;

function toggleMode() {
    isLegacy = !isLegacy;

    if (isLegacy) {
        body.setAttribute('data-mode', 'legacy');
        if (modeText) modeText.textContent = "Legacy Mode (Bad)";
    } else {
        body.removeAttribute('data-mode');
        if (modeText) modeText.textContent = "IDP Active (Good)";
    }
}

// Expose to global scope for onclick handler
window.toggleMode = toggleMode;
