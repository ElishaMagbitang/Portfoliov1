// Simple tabbed navigation (accessible)
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const tabButtons = document.querySelectorAll('.tab[role="tab"]');
const panels = document.querySelectorAll('.panel[role="tabpanel"]');

function activateTab(targetId){
  panels.forEach(p => p.classList.remove('is-active'));
  tabButtons.forEach(b => {
    const active = b.dataset.target === targetId;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  const panel = document.getElementById('tab-' + targetId);
  if (panel){
    panel.classList.add('is-active');
    panel.focus?.();
  }
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => activateTab(btn.dataset.target));
  btn.addEventListener('keydown', (e) => {
    // Arrow navigation
    const keys = ['ArrowLeft','ArrowRight','Home','End'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const list = Array.from(tabButtons);
    const i = list.indexOf(btn);
    let nextIndex = i;
    if (e.key === 'ArrowRight') nextIndex = (i + 1) % list.length;
    if (e.key === 'ArrowLeft') nextIndex = (i - 1 + list.length) % list.length;
    if (e.key === 'Home') nextIndex = 0;
    if (e.key === 'End') nextIndex = list.length - 1;
    list[nextIndex].focus();
    list[nextIndex].click();
  });
});
const tabs = document.querySelectorAll('.top-nav .tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    tabs.forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });

    // Hide all contents
    contents.forEach(c => c.style.display = 'none');

    // Activate clicked tab
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');

    // Show content associated with tab
    const target = document.getElementById(tab.dataset.target);
    target.style.display = 'block';
  });
});


document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
