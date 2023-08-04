export function toggleClassName(
  /** @type {EventTarget} */ targetElement,
  /** @type {String} */ targetClass
) {
  /** @type {string[]} */
  const classes = targetElement.className.split(' ');
  const targetIndex = classes.indexOf(targetClass);
  targetIndex === -1 ? classes.push(targetClass) : classes.splice(targetIndex, 1);
  targetElement.className = classes.join(' ');
}

export function setClassName(
  /** @type {EventTarget} */ targetElement,
  /** @type {String} */ targetClass,
  /** @type {boolean} */ bool
) {
  /** @type {string[]} */
  const classes = targetElement.className.split(' ');
  const targetIndex = classes.indexOf(targetClass);
  if (targetIndex === -1) {
    if (bool) classes.push(targetClass);
  } else {
    if (!bool) classes.splice(targetIndex, 1);
  }
  targetElement.className = classes.join(' ');
}
