'use strict';

import { watch, series } from 'gulp';
import browserSync from 'browser-sync';
import html from './html';
import css from './css';
import { vendorScripts, scripts } from './scripts';
import assets from './assets';
import { svgSprite } from './sprites';
import { $, source, config } from '../config';
import { reload } from './server';

// Watch
const devWatch = () => {
    browserSync(config.browserSync);
    // HTML
    watch([source.twig, source.subTwig], series(html, reload));
    // CSS
    watch(source.css, series(css, reload));
    // JS
    watch(source.vendorJs, series(vendorScripts, reload));
    watch([source.js[0], source.js[1], source.subJs], series(scripts, reload));
    // Sprites
    watch(source.svgSprite, series(svgSprite, reload));
    // Assets
    watch(source.assets, series(assets, reload));
}

export default devWatch;