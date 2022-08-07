<div align="center">
<h1> ansi-img </h1>
<strong>Best and lightest npm to transform image in ansi caracters</strong>
</div>

<div align="center">
<a href="https://www.npmjs.com/package/util-tiempo">
<img src="https://img.shields.io/npm/v/ansi-img?label=Version&logo=npm&style=for-the-badge">
</a>
<a href="https://www.npmjs.com/package/util-tiempo">
<img alt="npm" src="https://img.shields.io/npm/dw/ansi-img?logo=npm&style=for-the-badge">
</a>
</div>

<br>

## Installation

```ts
npm i ansi-img
// other option
yarn add ansi-img
```

<br>

### Example:

<img src="https://imgur.com/OGQPqnQ.jpg" style="border-radius: 4px;" />

<br>

---

## Functions

-   [`imgFileToAnsi()`](#usage)
-   [`imgBufferToAnsi()`](#usage)

## Usage

<div id="usage">

```ts
import { imgFileToAnsi, imgBufferToAnsi } from 'ansi-img';

imgFileToAnsi('./image.jpg').then(console.log); //Logear imagen de un archivo en consola

imgBufferToAnsi(buffer).then(console.log); //Logear imagen desde un buffer en consla
```

</div>

---

## MADE WITH ❤ BY Markox36

---
