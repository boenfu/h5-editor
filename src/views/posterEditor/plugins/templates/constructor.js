import {Widget} from 'poster/widgetConstructor';
import _merge from 'lodash/merge';

export default class TemplatesWidget extends Widget {
  constructor(config) {
    config = _merge(
      {
        type: 'templates',
        typeLabel: '模板列表',
        componentName: 'plugin-templates',
        icon: 'el-icon-data-board',
        lock: true,
        visible: true,
        couldAddToActive: false,
        replicable: false,
        isCopied: false,
        wState: {},
      },
      config,
    );
    super(config);
  }
}
