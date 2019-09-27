# Haunted Lit Element

[![Build Status](https://travis-ci.com/jdin/haunted-lit-element.svg?branch=master)](https://travis-ci.com/jdin/haunted-lit-element) 
[![npm](https://img.shields.io/npm/v/haunted-lit-element)](https://img.shields.io/npm/v/haunted-lit-element)

A missing connection between [Haunted](https://github.com/matthewp/haunted) and [LitElement](https://github.com/polymer/lit-element).

This project follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i haunted-lit-element
```

## Usage

Example of using LitElement's [properties](https://lit-element.polymer-project.org/guide/properties) 
and [styles](https://lit-element.polymer-project.org/guide/styles) helper.

```html
<script type="module">
    import {useState} from "haunted";
    import {css, html} from "lit-element";
    import {component, HauntedLitElement} from "haunted-lit-element";

    class MyExtLitElement extends HauntedLitElement {
        // ... my own stuff
    }

    const renderer = ({title}) => {
        const [count, setCount] = useState(0);
        return html`<h1>${title}</h1><p>${count}</p><button @click=${() => setCount(count + 1)}>+</button>`;
    };

    /** LitElement's Properties */
    const properties = {title: {type: String}};
    /** LitElement's css helper function */
    const styles = css`h1 {color:red}`;
    window.customElements.define('my-el', component(renderer, {properties, styles}, MyExtLitElement));
</script>

<my-el title="Hi There!"></my-el>
```

## Testing using karma
```bash
npm run test
```

## Linting
```bash
npm run lint
```
