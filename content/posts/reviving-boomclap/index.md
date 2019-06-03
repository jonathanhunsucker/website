---
title: "Reviving Boomclap: A five year old Javascript project"
publishDate: 2019-06-02T00:00:00Z
---

[Boomclap](https://boomclap.jonathanhunsucker.com) is an in-browser sampler and sequencer written a few years back, and since fallen to the wayside.

### Stats
Size: 933 lines of code [^loc], 4 files [^files]  
Age: 5 years since original build, 2 years since last known working environment  
Dependencies: WebAudio API  

[^loc]: `find . -name *.js -o -name *.html -o -name .css | xargs wc -l`
[^files]: `find . -name *.js -o -name *.html -o -name .css | wc -l`

### Cause of death
It was hosted on a DigitalOcean box, along with a few other projects. Browsers began requiring HTTPS in order to access the WebAudio APIs. At the time, I didn’t know of any free/cheap SSL certificate authorities, so I let the project fall to the wayside.

### Approach to reviving
1. Run it locally
1. Host it elsewhere
1. Fix lingering bugs from years of browser API changes

#### Running it locally
It’s a static site, so I opted for `python -m SimpleHTTPServer`. It needed a HTTPS transport though, which required wrapping the HTTPD socket in an SSL wrapper[^httpd-ssl-python]. 

[^httpd-ssl-python]: https://gist.github.com/dergachev/7028596

#### Host it elsewhere
GitHub Pages now support HTTPS so I gave the project a CNAME, `boomclap.jonathanhunsucker.com`, and awaited the SSL certificate to be issued. For simplicity of branch management, I swapped the Pages branch to `master` from `gh-pages` and deleted `gh-pages`. This trades away one possible facility for a staging/preprod environment (eg. `master` as staging), but this project doesn’t warrant multi-environment testing right now, so that seemed like a fair trade off.

#### Fix lingering bugs
In Chrome, it worked out of the box. On iOS 12.2 Safari, it displayed as an empty page. This was due to the lack of `navigator.getUserMedia()`, which was remidied by [porting over](https://github.com/jonathanhunsucker/boomclap/commit/ad314fcafd6b66e6e33f760e79c3cc02d0a189bc) to `navigator.mediaDevices.getUserMedia()`. 

#### Additional nice-to-have changes
* Constrained viewport to adapt to mobile ([commit](https://github.com/jonathanhunsucker/boomclap/commit/f83430ca19923900ceb6fdf8bb897c4bdcfc1e47))
* Added support for touch-based events ([commit](https://github.com/jonathanhunsucker/boomclap/commit/49a9b037501e5d1bef70f3e8f7d708df7923abc1) and [fix](https://github.com/jonathanhunsucker/boomclap/commit/0e85accc35223e83f2a5a22782874aa0d9ffe4c0))


### What’s improved over the last five years
* Hosting for static sites has vastly simplified
* SSL is standard and free
* Promises are part of the mainstream browser APIs
