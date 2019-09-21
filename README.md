# Personal website
See [https://jonathanhunsucker.com](https://jonathanhunsucker.com).

# Deploying

## Building production

> `$ ./script/deploy/build`

Builds the site into `public/` using the `production` environment.

## Testing production locally

> `$ ./script/deploy/build-serve`

Spins up a local HTTP server, serving out of the `public/` directory.

## Shipping production build

> `$ ./script/deploy/ship`

Creates an empty `gh-pages` branch locally, commits whatever's in `public/` as the sole commit on that branch, and force-pushes it to `gh-pages` on GitHub.


# Style
#### Avoid mixing modes
Good:

> `a^2 + b^2 = c^2`

Bad:

> `a^2 + b^2` = `c^2`

#### Avoid smart punctuation
`./script/check/quotes` and `./script/check/quotes-fix` are available to check and fix these issues.

#### Grayscale images, no exif data

* `./script/check/exif` to find exif-containing files
* `./script/check/grayscale-fix` to make an image grayscale
