const root = document.documentElement;
const themeCaption = document.querySelector('#themeCaption');
const themeNames = { coral: 'Warm / electric', cyan: 'Cool / kinetic', lime: 'Fresh / grounded' };

document.querySelectorAll('.theme-swatch').forEach((swatch) => {
  swatch.addEventListener('click', () => {
    const theme = swatch.dataset.theme;
    root.dataset.theme = theme === 'coral' ? '' : theme;
    document.querySelectorAll('.theme-swatch').forEach((item) => {
      const selected = item === swatch;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', selected);
    });
    themeCaption.textContent = themeNames[theme];
  });
});

const slider = document.querySelector('#velocitySlider');
const velocityValue = document.querySelector('#velocityValue');
slider.addEventListener('input', () => {
  velocityValue.textContent = `${slider.value} BPM`;
  document.querySelectorAll('.meter span').forEach((bar, index) => {
    const height = Math.max(12, (Number(slider.value) * (index + 3)) % 101);
    bar.style.height = `${height}%`;
  });
});

const toast = document.querySelector('#toast');
const focusToggle = document.querySelector('#focusToggle');
const focusMessage = document.querySelector('#focusMessage');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

focusToggle.addEventListener('change', () => {
  document.body.classList.toggle('quiet-mode', focusToggle.checked);
  focusMessage.textContent = focusToggle.checked
    ? 'Distractions are softened. The signal is yours.'
    : 'The interface is listening for your next move.';
  showToast(focusToggle.checked ? 'Focus mode enabled' : 'Focus mode paused');
});

document.querySelector('#focusButton').addEventListener('click', () => {
  focusToggle.checked = !focusToggle.checked;
  focusToggle.dispatchEvent(new Event('change'));
});

document.querySelector('#launchButton').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const status = document.querySelector('#launchStatus');
  button.disabled = true;
  button.querySelector('span').textContent = '✦';
  status.textContent = 'Thought launched. Keep going.';
  document.querySelector('.launch-shape').animate(
    [{ transform: 'rotate(0) scale(1)' }, { transform: 'rotate(180deg) scale(1.16)' }, { transform: 'rotate(360deg) scale(1)' }],
    { duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)' }
  );
  setTimeout(() => {
    button.disabled = false;
    button.querySelector('span').textContent = '→';
  }, 900);
});
