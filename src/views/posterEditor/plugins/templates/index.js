import leftSide from './leftSide';
import widget from './widget';
import constructor from './constructor';

export default {
  leftSide: {
    icon: 'el-icon-data-board',
    name: '模板列表',
    component: leftSide,
    order: 0,
  },
  widget: {
    component: widget,
    constructor,
  },
};
