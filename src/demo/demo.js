// --- DEMO: LOGIC & TOGGLES ---

const body = document.body;
const modeText = document.getElementById('mode-text');
const vpDisplay = document.getElementById('vp-width');
const layoutState = document.getElementById('layout-state');

// 1. Monitor Viewport
function updateMetrics() {
    const w = window.innerWidth;
    if (vpDisplay) vpDisplay.textContent = w + 'px';

    if (layoutState) {
        if (w < 1024) layoutState.textContent = "Mobile (Bento)";
        else if (w < 1800) layoutState.textContent = "Desktop (Sidebar)";
        else layoutState.textContent = "Ultrawide (Cockpit)";
    }
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
