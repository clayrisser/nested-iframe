# nested-iframe

[![GitHub stars](https://img.shields.io/github/stars/codejamninja/nested-iframe.svg?style=social&label=Stars)](https://github.com/codejamninja/nested-iframe)

> Recursively find a nested iframe

![](assets/nested-iframe.png)

Please ★ this repo if you found it useful ★ ★ ★


## Features

* Asynchronously waits for iframe to load
* Optional timeout
* Optionally find nested iframe synchronously


## Installation

```sh
npm install --save nested-iframe
```


## Dependencies

* [NodeJS](https://nodejs.org)


## Usage

### Example 1

Waits for all iframes to load

The deepest iframe is returned

```js
import nestedIframe from 'nested-iframe';

nestedIframe([
  '#parentIframe',
  '#childIframe',
  '#grandchildIframe'
]).then((grandchildIframe) => {
  grandchildIframe.contentDocument.body.innerHTML = 'Hello, world!';
});
```

### Example 2

Optional timeout at 5 seconds

The deepest iframe that is loaded is returned

```js
import nestedIframe from 'nested-iframe';

nestedIframe([
  '#parentIframe',
  '#childIframe',
  '#grandchildIframe'
], { timeout: 5000 }).then((grandchildIframe) => {
  grandchildIframe.contentDocument.body.innerHTML = 'Hello, world!';
});
```

### Example 3

Optional timeout at 5 seconds

Throws an error if timeout

```js
import nestedIframe from 'nested-iframe';

nestedIframe([
  '#parentIframe',
  '#childIframe',
  '#grandchildIframe'
], {
  timeout: 5000,
  error: true
}).then((grandchildIframe) => {
  grandchildIframe.contentDocument.body.innerHTML = 'Hello, world!';
}).catch((err) => {
  console.error(err);
});
```

### Example 4

Does not wait for iframes to load

The deepest iframe that is loaded is returned (probably the parentIframe)

```js
import { nestedIframeSync } from 'nested-iframe';

const grandchildIframe = nestedIframe([
  '#parentIframe',
  '#childIframe',
  '#grandchildIframe'
]);
grandchildIframe.contentDocument.body.innerHTML = 'Hello, world!';
```

### Example 5

Does not wait for iframes to load

Throws an error if deepest iframe not loaded

```js
import { nestedIframeSync } from 'nested-iframe';

try {
  const grandchildIframe = nestedIframe([
    '#parentIframe',
    '#childIframe',
    '#grandchildIframe'
  ], { error: true });
  grandchildIframe.contentDocument.body.innerHTML = 'Hello, world!';
} catch(err) {
  console.error(err);
}
```


## Support

Submit an [issue](https://github.com/codejamninja/nested-iframe/issues/new)


## Contributing

Review the [guidelines for contributing](https://github.com/codejamninja/nested-iframe/blob/master/CONTRIBUTING.md)


## License

[MIT License](https://github.com/codejamninja/nested-iframe/blob/master/LICENSE)

[Jam Risser](https://codejam.ninja) © 2018


## Changelog

Review the [changelog](https://github.com/codejamninja/nested-iframe/blob/master/CHANGELOG.md)


## Credits

* [Jam Risser](https://codejam.ninja) - Author


## Support on Liberapay

A ridiculous amount of coffee ☕ ☕ ☕ was consumed in the process of building this project.

[Add some fuel](https://liberapay.com/codejamninja/donate) if you'd like to keep me going!

[![Liberapay receiving](https://img.shields.io/liberapay/receives/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
[![Liberapay patrons](https://img.shields.io/liberapay/patrons/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
