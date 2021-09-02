import leftSide from './leftSide';
import widget from './widget';
import drawRectWidget from './drawRectWidget';
import assistConstructor from './assistConstructor';
import constructor from './constructor';
import controlPanel from './widgetControl';

export default {
  leftSide: {
    icon: 'icon-rect',
    name: '矩形',
    component: leftSide,
  },
  widget: {
    component: widget,
    constructor,
  },
  controlPanel: {
    component: controlPanel,
  },
  assistWidget: {
    component: drawRectWidget,
    constructor: assistConstructor,
  },
};
