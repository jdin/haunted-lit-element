# Haunted Lit Element

[![Build Status](https://travis-ci.com/jdin/haunted-lit-element.svg?branch=master)](https://travis-ci.com/jdin/haunted-lit-element) 
[![npm](https://img.shields.io/npm/v/haunted-lit-element)](https://www.npmjs.com/package/haunted-lit-element)
[![size](https://img.shields.io/bundlephobia/minzip/haunted-lit-element)](https://bundlephobia.com/result?p=haunted-lit-element)
[![downloads](https://img.shields.io/npm/dt/haunted-lit-element)](https://www.npmjs.com/package/haunted-lit-element)

A missing connection between [Haunted](https://github.com/matthewp/haunted) and [LitElement](https://github.com/polymer/lit-element).

It makes it possible to use LitElement's features like 
[properties](https://lit-element.polymer-project.org/guide/properties) 
and [styles](https://lit-element.polymer-project.org/guide/styles) in Haunted.

> This project follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i haunted-lit-element
```

## Usage

This library provides `component` function that is made in the way as it is in `Haunted`.

### `component(MyEl)`

Similar to `haunted` but the base class is `LitElement`:

```javascript
import {html} from 'lit-html';
import {component} from 'haunted-lit-element';
window.customElements.define('my-el', component(() => html`hello world`));
```

### `component(MyEl, optsOrBaseCls)`

The second parameter in `component` function can be `options` or a `base class` 
which should be derived from `HauntedLitElement`.

The `options` in most cases are [properties](https://lit-element.polymer-project.org/guide/properties) 
and [styles](https://lit-element.polymer-project.org/guide/styles) from `LitElement`. 
But it can actually be anything as at the end it is just a static field in the base class.
It is done in that way because there are `LitElement` extensions that use similar approach with their own configuration.

Example of defining `options` as second argument:
```javascript
import {css} from 'lit-element';
import {component} from 'haunted-lit-element';

const MyEl = () => { /*...*/ };

const properties = {myParam: {type: String}, /*...*/};
const styles = css`/* my css styles */`;

window.customElements.define('my-el', component(MyEl, {properties, styles}));
```

Example of defining `base class` as second argument:
```javascript
import {component, HauntedLitElement} from 'haunted-lit-element';

class MyExtHauntedLitElement extends HauntedLitElement {
    // ... my own stuff
}

const MyEl = () => { /*...*/ };

window.customElements.define('my-el', component(MyEl, MyExtHauntedLitElement));
```

### `component(myEl, baseCls, opts)`

If you want to use options and a base class than the base class is the second argument and options are the third.

Example of using LitElement's [properties](https://lit-element.polymer-project.org/guide/properties) 
and [styles](https://lit-element.polymer-project.org/guide/styles) helper with a custom base class.

```html
<my-el
  mystring="hello world"
  mynumber="5"
  mybool
  myobj='{"stuff":"hi"}'
  myarray='[1,2,3,4]'
></my-el>


<script type="module">
    import {useState} from "haunted";
    import {css, html} from "lit-element";
    import {component, HauntedLitElement} from "haunted-lit-element";

    class MyExtLitElement extends HauntedLitElement {
        // ... my own stuff
    }

    const renderer = ({mystring, mynumber, mybool, myobj, myarray}) => {
        const [count, setCount] = useState(0);
        return html`
            <p>${count}</p>
            <button @click=${() => setCount(count + 1)}>+</button>
            <pre>
                typeof mystring = ${typeof mystring}
                typeof mynumber = ${typeof mynumber}
                typeof mybool = ${typeof mybool}
                typeof myobj = ${typeof myobj}
                Array.isArray(myarray) = ${Array.isArray(myarray)}
            </pre>`;
    };

    /** LitElement's Properties */
    const properties = {
        mystring: {type: String},
        mynumber: {type: Number},
        mybool: {type: Boolean},
        myobj: {type: Object},
        myarray: {type: Array}
    };
    /** LitElement's css helper function */
    const styles = css`p {color:red}`;
    window.customElements.define('my-el', component(renderer, {properties, styles}, MyExtLitElement));
</script>
```

The output for properties is going to be:

```text
typeof mystring = string
typeof mynumber = number
typeof mybool = boolean
typeof myobj = object
Array.isArray(myarray) = true
```

## Testing using karma
```bash
npm run test
```

## Linting
```bash
npm run lint
```
