import leftSide from './leftSide';
import widget from './widget';
import constructor from './constructor';

export default {
  leftSide: {
    icon: 'icon-background',
    name: '背景',
    component: leftSide,
  },
  widget: {
    component: widget,
    constructor,
  },
};
