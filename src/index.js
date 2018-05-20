import 'idempotent-babel-polyfill';

export function nestedIframeSync(query, options = {}, iframe = null) {
  if (!iframe) query = [...query];
  if (!query) throw new Error("missing parameter 'query'");
  if (!query.length) return iframe;
  // eslint-disable-next-line no-undef
  const contentDocument = iframe ? iframe.contentDocument : document;
  iframe = contentDocument.querySelector(query[0]) || iframe;
  if (options.error && iframe.contentWindow.location.href !== 'about:blank') {
    throw new Error('deepest iframe not loaded');
  }
  query.shift();
  return nestedIframeSync(query, options, iframe);
}

export default async function nestedIframe(query, options = {}, context = {}) {
  return new Promise(async (resolve, reject) => {
    if (!query) return reject(new Error("missing parameter 'query'"));
    let { iframe = null, timeout } = context;
    if (!iframe) {
      if (options.timeout) {
        timeout = setTimeout(() => {
          if (options.error) {
            return reject(
              new Error(
                `timeout expired at ${
                  options.timeout
                } milliseconds before the deepest iframe loaded`
              )
            );
          }
          return resolve(iframe);
        }, options.timeout);
      }
      query = [...query];
    }
    if (!query.length) {
      if (options.timeout) clearTimeout(timeout);
      return resolve(iframe);
    }
    // eslint-disable-next-line no-undef
    const contentDocument = iframe ? iframe.contentDocument : document;
    iframe = contentDocument.querySelector(query[0]) || iframe;
    await new Promise(resolve => {
      if (iframe.contentWindow.location.href !== 'about:blank') {
        return resolve(iframe);
      }
      return iframe.addEventListener('load', () => resolve(iframe));
    });
    query.shift();
    return resolve(nestedIframe(query, options, { iframe, timeout }));
  });
}
