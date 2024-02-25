'use strict';

import merge from 'merge-stream';
import { src, dest } from 'gulp';
import { $, source, build, config } from '../config';
import 'path';

// SVG sprite
export const svgSprite = () => src(source.svgSprite)
    .pipe($.plumber())
    .pipe($.changed(source.svgSprite))
    .pipe($.svgSprite(config.svgSprite).on('error', (e) => console.log(e)))
    .pipe($.cheerio(config.cheerio))
    .pipe($.replace('&gt;', '>'))
    .pipe(dest(build.svgSprite))
    .pipe(dest(build.dest));