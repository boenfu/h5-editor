import leftSide from './leftSide';
import widget from './widget';
import constructor from './constructor';
import controlPanel from './widgetControl';

export default {
  leftSide: {
    icon: 'icon-text',
    name: '文本',
    component: leftSide,
  },
  widget: {
    component: widget,
    constructor,
  },
  controlPanel: {
    component: controlPanel,
  },
};
