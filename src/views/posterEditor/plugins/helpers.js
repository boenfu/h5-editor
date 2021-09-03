import {HoC} from 'poster/utils';
import store from '@/store';
import portalVue from 'portal-vue';

export const pluginMap = {
  leftSide: {},
  widget: {},
  controlPanel: {},
  bottomBar: {},
  extendSideBar: {},
  assistWidget: {},
};

export const pluginConstructorMap = {};

export function usePlugin(name, options) {
  if (options._registered) {
    return;
  }
  options._registered = true;
  const {
    leftSide,
    bottomBar,
    controlPanel,
    extendSideBar,
    assistWidget,
    widget,
  } = options;

  if (leftSide) {
    pluginMap.leftSide[name] = leftSide;
  }
  if (bottomBar) {
    pluginMap.bottomBar[name] = bottomBar;
  }
  if (controlPanel) {
    pluginMap.controlPanel[name] = controlPanel;
  }
  if (extendSideBar) {
    pluginMap.extendSideBar[name] = extendSideBar;
  }

  if (assistWidget) {
    const {componentName} = new assistWidget.constructor();

    pluginMap.assistWidget[name] = {componentName, ...assistWidget};
  }

  if (widget) {
    const {componentName, type} = new widget.constructor();

    if (componentName.indexOf('plugin-') !== 0) {
      return;
    }

    pluginMap.widget[name] = {...widget, componentName};
    pluginConstructorMap[type] = widget.constructor;
  }
}

const pluginHelpers = {
  addWidget(widget) {
    store.dispatch('poster/addItem', widget);
  },
  removeWidget(widget) {
    store.dispatch('poster/removeItem', widget);
  },
  updateWidgetState(args) {
    // { keyPath, value, widgetId, pushHistory = true }
    store.dispatch('poster/updateWidgetState', args);
  },
  updateDragInfo(args) {
    store.dispatch('poster/updateDragInfo', args);
  },
  getCanvasSize() {
    return store.getters['poster/canvasSize'];
  },
  setCanvasSize(args) {
    // {width, height}
    store.dispatch('poster/setCanvasSize', args);
  },
  recoverEditorData(args /** initialBackupData */) {
    store.dispatch('poster/backup/recover', args);
  },
};

export function pluginWrap(component) {
  return HoC(component, {
    props: {
      pluginHelpers,
    },
  });
}

export const controlPortal = pluginWrap(portalVue);

export {commonMixin as controlMixin} from '../control/widgets/common/mixins';
