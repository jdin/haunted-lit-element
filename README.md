# Haunted Lit Element

[![Build Status](https://travis-ci.com/jdin/haunted-lit-element.svg?branch=master)](https://travis-ci.com/jdin/haunted-lit-element)

A missing connection between [Haunted](https://github.com/matthewp/haunted) and [LitElement](https://github.com/polymer/lit-element).

This project follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i haunted-lit-element
```

## Usage
```html
<script type="module">
    import {useState} from "haunted/core.js";
    import {css, html} from "lit-element";
    import component from "haunted-lit-element";

    const renderer = ({title}) => {
        const [count, setCount] = useState(0);
        return html`<h1>${title}</h1><p>${count}</p><button @click=${() => setCount(count + 1)}>+</button>`;
    };

    const properties = {title: String};
    const styles = css`h1 {color:red}`;
    window.customElements.define('my-el', component(renderer, {properties, styles}));
</script>

<my-element title="Hi There!"></my-element>
```

## Testing using karma
```bash
npm run test
```

## Linting
```bash
npm run lint
```
