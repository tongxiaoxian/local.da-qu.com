<?php

/*

---------------------------------------
License Setup
---------------------------------------

Please add your license key, which you've received
via email after purchasing Kirby on http://getkirby.com/buy

It is not permitted to run a public website without a
valid license key. Please read the End User License Agreement
for more information: http://getkirby.com/license

*/

c::set('license', 'put your license key here');

/*

---------------------------------------
MathJax Configuration
---------------------------------------

MathJax is a JavaScript display engine for mathematics
that works in all browsers: https://www.mathjax.org/

'kdoc.mathjax' - Enable (true) or disable (false) MathJax.
If the configuration is not present, MathJax will be disabled.
(default: 'false')

'kdoc.mathjax.url' - URL to the MathJax script. If the
configuration is not present or empty, MathJax will be disabled.
(default: 'https://cdn.mathjax.org/mathjax/latest/MathJax.js')

'kdoc.mathjax.config' - The MathJax configuration file as
specified at http://docs.mathjax.org/en/latest/config-files.html.
Typical values are: 'TeX-MML-AM_CHTML', 'TeX-AMS_CHTML', and
'MML_CHTML'. If this configuration is not present, no file is
loaded.
(default: 'TeX-AMS_CHTML')

*/

c::set('kdoc.mathjax', false);
c::set('kdoc.mathjax.url', 'https://cdn.mathjax.org/mathjax/latest/MathJax.js');
c::set('kdoc.mathjax.config', 'TeX-AMS_CHTML');

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/
