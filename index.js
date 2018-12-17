import 'intersection-observer';

let observer = null;

const config = {
  rootMargin: '50px 20px 75px 30px',
  threshold: [0, 0.25, 0.75, 1]
};

const enable = (options) => {
  const INIT_SELECTOR = options.initSelector;
  const ANIMATE_TRIGGER = options.animateTrigger;
  const animateItems = document.querySelectorAll(INIT_SELECTOR);
  console.log('ani.js is loaded');
  console.log(options);
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        // in view
        entry.target.classList.add(ANIMATE_TRIGGER);
        if (!options.repeat) {
          observer.unobserve(entry.target);
        }
      } else {
        // out of view
        entry.target.classList.remove(ANIMATE_TRIGGER);
      }
    });
  }, config);
  animateItems.forEach(animateItem => {
    observer.observe(animateItem);
  });
};

const tos = (options) => {


  if (!window.IntersectionObserver) {

    throw Error(`
      Your browser does not support IntersectionObserver!
      Get a polyfill from here:
      https://github.com/w3c/IntersectionObserver/tree/master/polyfill
    `);
  }

  enable(options);

  return {
    enable,
  };
};

export default tos;