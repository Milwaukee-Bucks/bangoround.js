# BangoRound.js

A lightweight, highly configurable carousel for Vue 3. (EVENTUALLY).

> ⚠️ This is a completely new work in progress and by no means production-ready.

## Usage

### Configuration

#### Basic

| Property   | Type     | Default | Description                                                                    |
|------------|----------|---------|--------------------------------------------------------------------------------|
| `slides`   | `Array`  | `[]`    | The items to be displayed in the carousel.                                     |
 | `maxWidth` | `String` | `350px` | The maximum width of any given carousel slide. Takes any CSS-compatible value. |
| `minWidth` | `String` | `100px` | The minimum width of any given carousel slide. Takes any CSS-compatible value. |
| `lazyload` | `Object` | `{}`    | Configuration for lazy loading images (see below).                             |

#### Lazyload
bangoround.js supports lazy loading of slides. This is done by setting the `lazyload` property to an object with the following properties:
      
  ```javascript
  {
  enabled: true,
  threshold: 0,
  rootMargin: '0px'
  }
   ```
These are the same options as the native `IntersectionObserver` API. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for more information.

| Property           | Type      | Default | Description                                                                                                  |
|--------------------|-----------|---------|--------------------------------------------------------------------------------------------------------------|
| `enabled`          | `Boolean` | `false` | Whether or not to enable lazy loading.                                                                       |
| `threshold`        | `Number`  | `0`     | The distance from the viewport at which to start loading the slide.                                          |
| `rootMargin`       | `String`  | `0px`   | The margin around the viewport in which to start loading the slide.                                          |
 | `persistAfterLoad` | `Boolean` | `false` | If set to `true`, bangoround.js will not unload the element once it has been loaded, even if it leaves view. |


### Slots


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```
