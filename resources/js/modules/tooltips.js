import { createPopper } from '@popperjs/core';

const setupToolTip = (id) => {
  const trigger = document.getElementById(`name-${id}`);
  const tooltip = document.getElementById(id);
  const ttCloseButton = tooltip.querySelector('button');

  let popperInstance = null;

  function create() {
    popperInstance = createPopper(trigger, tooltip, {
      strategy: 'fixed',
      modifiers: [
        {
          name: 'preventOverflow',
          options: {
            rootBoundary: 'document',
            altBoundary: true,
          },
        },
      ],
    });
  }

  function destroy() {
    if (popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }
  }

  function show() {
    tooltip.setAttribute('data-show', '');
    create();
  }

  function hide() {
    tooltip.removeAttribute('data-show');
    destroy();
  }

  const showEvents = ['mouseenter', 'focus'];
  const hideEvents = ['mouseleave', 'blur'];

  showEvents.forEach((event) => {
    trigger.addEventListener(event, show);
  });

  hideEvents.forEach((event) => {
    trigger.addEventListener(event, hide);
  });

  ttCloseButton.addEventListener('click', hide);
};

export const setupToolTips = () => {
  const toolTips = document.querySelectorAll('.tooltip');

  Array.from(toolTips).forEach((tip) => setupToolTip(tip.id));
};
