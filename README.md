# jsconfetti
This is an explorative project to challenge myself in javascript codewriting. The project started when I was designing a poster I wanted to decorate with confetti, but I didn't feel like drawing hundreds of unique confetti flakes to place them randomly around the poster. So, what does one do? You create a generator that does it for you. Did I actually save time? Probably not. Did I enjoy creating the generator? Most certainly. That's a win in my books. And on top of that: I have a fun project to work on on and off. Feel free to look around and suggest improvements.

Play around with the live editor here: [confetti.semhak.dev](https://confetti.semhak.dev)

Enjoy playing around with this or just appreciate what I do? [Buy me a coffee](https://paypal.me/nielshak)!

## To-do
- Adding documentation in JS code
- Implementing presets
- Implementing export to PDF to open and edit in programs like Affinity Designer or Adobe Illustrator
- Implementing export canvas as HTML to use generated confetti-field in your own projects
- Improve particle distribution to match particle count better
- Fixing Safari support (distribution: spread)
- Improve settings-retention/URL-updating on change
- Encrypt URL-settings into a shorter code

## Changelog
*V0.1.5*
- Added particle animations on generate, such wow

*V0.1.4*
- Color picker now escapes container instead of disappearing into container bounds
- Particle shape now also resets when using the reset button

*V0.1.3*
- replaced pushState() with replaceState() as to not clutter browser history on every URL update

*V0.1.2*
- Added "string" and "flake" particle shapes
- Layout made responsive to work on smaller screens
- Added favicon

*V0.1.1*
- Initial publish
