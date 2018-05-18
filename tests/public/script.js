import nestedIframe from '../../src';

// eslint-disable-next-line no-undef
const browserWindow = window;
const { document } = browserWindow;

const iframe = document.createElement('iframe');
iframe.setAttribute('src', '/iframe1.html');
document.body.appendChild(iframe);

setTimeout(() => {
  browserWindow.nestedIframe = nestedIframe(['iframe', 'iframe']);
}, 1000);
