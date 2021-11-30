import {usePlugin} from './helpers';
export {pluginMap, pluginWrap, pluginConstructorMap} from './helpers';

import text from './text';
import image from './image';
import rect from './rect';
import background from './background';

import tts from './tts';
import screencast from './screencast';
import templates from './templates';

usePlugin('plugin-text', text);
usePlugin('plugin-image', image);
usePlugin('plugin-background', background);
usePlugin('plugin-rect', rect);
usePlugin('plugin-tts', tts);
usePlugin('plugin-screencast', screencast);
usePlugin('plugin-templates', templates);
