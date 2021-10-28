# nice-waves

Generate beautiful animated waves

<p align="center">&#127754;&nbsp;&nbsp;<b><a href="https://gvguy.github.io/nice-waves/">Live demo</a></b>&nbsp;&nbsp;&#127754;</p>
<p align="center"><a href="#">Codepen</a></p>

## What it does

nice-waves is a Vanilla JS library that makes creating waves a breeze

-  generates an svg with seamlessly looping wave paths based on passed options
-  animates flow with javascript
-  animates sway with svg's `<animate>` element
-  provides a `stop()` / `play()` interface (with possibility to disable animation entierly)
-  allows randomization of most parameters, for unique waves on each render

## Installation

### npm

```shell
npm i nice-waves
```

```javascript
import waves from 'nice-waves'
```

### CDN

```xml
<script src="https://unpkg.com/nice-waves@latest"></script>
```

## Usage

```javascript
waves().mount()
```

## Mount

```javascript
mount(el = '#waves')`
```

Mounts waves at the specified mount point or (if none provided) first element element with id `#waves`

Expects `el` to be a query selector string or node element

Returns instance for chaining or `false` if couldn't mount

```javascript
const mountPoint = document.getElementById('waves')
waves().mount(mountPoint)

// Equivalent to

waves().mount('#waves')

// Also equivalent to

waves().mount()
```

## Animation

All animations are done in plain javascript with `reqestAnimationFrame`

There are two animation types: flow and sway

**Flow** is the x-axis scrolling motion

**Sway** is the up-down motion achieved by path morphing (each wave crest moves independently from the others, resulting in a more naturall and particularly _nice_ effect)

Both can be disabled independently from each other by setting a corresponding `rate` to `0`

All animation can be controlled with `play()` and `stop()` methods

### `stop()`

Stops all animation if not already stopped

Returns instance

Waves will play by default after mount, so if you want them static, you can do this:

```javascript
const myCoolWaves = waves().mount('#mountpoint').stop()
```

### `play()`

Runs the animation if it's not yet running

If `flowRate` and `swayRate` are both set to `0`, this will do nothing

Returns instance

Waves will play by default after mount

```javascript
if (myCoolWaves && !myCoolWaves.animation.isPlaying) {
	myCoolWaves.play()
}
```

## Options

You can customize waves by passing options like this:

```javascript
waves({
	fills: ['rgba(73, 153, 147, 0.82)', 'rgba(57, 54, 109, 0.5)'],
	flowRate: 2,
	swayRate: 0.9,
	wavelength: 10,
	offset: 0.12
	// etc
})
```

> For visual demonstration of what each option does, check out [live demo](https://gvguy.github.io/nice-waves/)

### fills

Quantity and color of waves

If you want multiple waves of the same color, provide the same color multiple times

`Array`

Default value:

<!-- prettier-ignore -->
```javascript
[ 'rgba(0, 0, 0, 0.65)',
  'rgba(0, 0, 0, 0.6)',
  'rgba(0, 0, 0, 0.5)' ]
```

### flowRate

Speed of X-axis motion

`Float`, `0` - `50`

Default value: `6`

### randomFlowRate

How much individual wave's `flowRate` is randomized

`Float`, `0` - `1`

Default value: `0`

### swayRate

Speed of X-axis motion

`Float`, `0` - `5`

Default value: `3.2`

### randomSwayRate

Coefficient of how much individual wave's `swayRate` is randomized

`Float`, `0` - `1`

Default value: `0.4`

### swayVelocity

How far from initial shape the wave is allowed to sway

`Float`, `0` - `1`

Default value: `0.5`

### wavelength

Length of one loop

`Float`, `1` - `20`

Default value: `14`

### randomWavelength

Coefficient of how much individual wave's `wavelength` is randomized

`Float`, `0` - `1`

Default value: `0`

### complexity

How many wave periods there are in one loop

`Float`, `1` - `10`

Default value: `6`

> The more complex the wave is, the more oportunity for randomization
> For the same shape on every loop, set complexity to `1`

### randomHeight

How far from 100% amplitude each crest is allowed to go

`Float`, `0` - `1`

Default value: `0.4`

### curviness

Fine-tune the wave curve

`Float`, `0` - `1`

Default value: `0.8`

### offset

Offset each wave relative to previous one on the X-axis

`Float`, `0` - `1`

Default value: `0`

> 0 = all waves' crests are in sync, 1 = even spread

### randomOffset

How much individual wave's `offset` is randomized

`Float`, `0` - `1`

Default value: `0`

## License

MIT
