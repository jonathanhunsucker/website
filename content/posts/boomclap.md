---
title: "Boomclap: A Sampler/Sequencer using Web Audio API"
publishDate: 2017-11-25
---

[Boomclap](/boomclap/) is a sampler and sequencer built using the Web Audio API. It's very crude. The next beat is scheduled with `setTimeout`, and the Web Audio API Node graph is built on every beat. It's a fun toy to play around with. 

### Sampling interface
![Sampling interface](/images/boomclap-sampler.gif)
The window shows the last few seconds of microphone audio. Freeze the window, crop the sample, and save it to the sequencer.

### Sequencing interface
![Sequencing interface](/images/boomclap-sequencer.gif)
The sequencing grid has a row for each sample, and a column for each 16th beat in one bar. Clicking a cell plays the corresponding sample on that beat.

### Sample editing
![Sample editing interface](/images/boomclap-sample-editor.gif)
Clicking a sample, opens the editor interface. Slide to configure pitch, gain, and filter cut off. Each change re-plays the sample. Optionally, delete, play, or duplicate the sample. 
