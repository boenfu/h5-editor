import leftSide from './leftSide';
import widget from './widget';
import constructor from './constructor';
import controlPanel from './widgetControl';

export default {
  leftSide: {
    icon: 'el-icon-picture',
    name: '图片',
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
