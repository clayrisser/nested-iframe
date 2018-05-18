export default function nestedIframe(query, iframe = null) {
  if (!iframe) query = [...query];
  if (!query) throw new Error("missing parameter 'query'");
  if (!query.length) return iframe;
  // eslint-disable-next-line no-undef
  const contentDocument = iframe ? iframe.contentDocument : document;
  iframe = contentDocument.querySelector(query[0]) || iframe;
  query.shift();
  return nestedIframe(query, iframe);
}
