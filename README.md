# Personal website
See [https://jonathanhunsucker.com](https://jonathanhunsucker.com).

# Deploying

## Building production

> `$ ./script/build`

Builds the site into `public/` using the `production` environment.

## Testing production locally

> `$ ./script/build-serve`

Spins up a local HTTP server, serving out of the `public/` directory.

## Shipping production build

> `$ ./script/deploy`

Creates an empty `gh-pages` branch locally, commits whatever's in `public/` as the sole commit on that branch, and force-pushes it to `gh-pages` on GitHub.


# Style
#### Avoid mixing modes
Good:

> `a^2 + b^2 = c^2`

Bad:

> `a^2 + b^2` = `c^2`

#### Avoid smart punctuation
`./script/check/quotes` and `./script/format/md` are available to check and fix these issues.

#### Greyscale, no exif images
`./script/check/exif` and `./script/format/jpeg` are available to find exif-containing files, and fix both issues.
