import {pluginMap, pluginWrap} from '../plugins';

const pluginComponents = {};
Object.values(pluginMap.widget).forEach(options => {
  const {component, componentName} = options;
  pluginComponents[componentName] = pluginWrap(component);
});
export default {...pluginComponents};
