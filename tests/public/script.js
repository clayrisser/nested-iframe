import nestedIframe, { nestedIframeSync } from '../../src';

// eslint-disable-next-line no-undef
const browserWindow = window;
const { document } = browserWindow;

const iframe = document.createElement('iframe');
iframe.setAttribute('src', '/iframe1.html');
document.body.appendChild(iframe);

browserWindow.nestedIframeSync = nestedIframeSync(['iframe', 'iframe']);
nestedIframe(['iframe', 'iframe']).then(result => {
  browserWindow.nestedIframe = result;
});
