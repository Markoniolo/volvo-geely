'use strict';

import { series, parallel } from 'gulp';
import clean from './clean';
import html from './html';
import css from './css';
import { vendorScripts, scripts } from './scripts';
import assets from './assets';
import { svgSprite } from './sprites';
import devWatch from './watch';

// Dev
const dev = series(clean, parallel(svgSprite, assets, html, css, vendorScripts, scripts), devWatch);

export default dev;