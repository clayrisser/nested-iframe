import 'idempotent-babel-polyfill';

export function nestedIframeSync(query, iframe = null) {
  if (!iframe) query = [...query];
  if (!query) throw new Error("missing parameter 'query'");
  if (!query.length) return iframe;
  // eslint-disable-next-line no-undef
  const contentDocument = iframe ? iframe.contentDocument : document;
  iframe = contentDocument.querySelector(query[0]) || iframe;
  query.shift();
  return nestedIframe(query, iframe);
}

export default async function nestedIframe(query, iframe = null) {
  if (!iframe) query = [...query];
  if (!query) throw new Error("missing parameter 'query'");
  if (!query.length) return iframe;
  // eslint-disable-next-line no-undef
  const contentDocument = iframe ? iframe.contentDocument : document;
  iframe = contentDocument.querySelector(query[0]) || iframe;
  await new Promise((resolve, reject) => {
    iframe.addEventListener('load', err => {
      if (err) return reject(err);
      return resolve(iframe);
    });
  });
  query.shift();
  return nestedIframe(query, iframe);
}
