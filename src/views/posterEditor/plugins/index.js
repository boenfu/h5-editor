import {usePlugin} from './helpers';
export {pluginMap, pluginWrap, pluginConstructorMap} from './helpers';

import text from './text';
import image from './image';
import rect from './rect';
import background from './background';

usePlugin('plugin-text', text);
usePlugin('plugin-image', image);
usePlugin('plugin-background', background);
usePlugin('plugin-rect', rect);
