const theme = document.getElementById('themeChange');
const isThemeLight = sessionStorage.getItem('theme') === 'light';

function handleThemeChange() {
  const rootStyle = window.getComputedStyle(document.documentElement);
  const currTextColor = rootStyle.getPropertyValue('--color-text');

  if (isThemeLight) {
    document.body.classList.remove('light');
  } else {
    document.body.classList.add('light');
  }

  document.documentElement.style.setProperty(
    '--color-text',
    rootStyle.getPropertyValue('--color-theme'),
  );
  document.documentElement.style.setProperty('--color-theme', currTextColor);

  sessionStorage.setItem('theme', isThemeLight ? 'dark' : 'light');
}

function checkForSetTheme() {
  // const isLight = sessionStorage.getItem('theme') === 'light';

  if (isThemeLight) {
    // setTimeout(() => {
    document.getElementById('themeChange').checked = true;
    handleThemeChange();
    // }, 500);
  }
}

theme.addEventListener('change', handleThemeChange);
checkForSetTheme();
