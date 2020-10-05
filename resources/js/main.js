function handleThemeChange() {
  const rootStyle = window.getComputedStyle(document.documentElement);
  const currTextColor = rootStyle.getPropertyValue('--color-text');

  document.body.classList.toggle('light');

  document.documentElement.style.setProperty(
    '--color-text',
    rootStyle.getPropertyValue('--color-theme'),
  );
  document.documentElement.style.setProperty('--color-theme', currTextColor);
}

const theme = document.getElementById('themeChange');
theme.addEventListener('change', handleThemeChange);
