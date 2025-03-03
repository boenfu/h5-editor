import {isFunction} from './fns';

let matchesSelectorFunc;

export function matchesSelectorToParentElements(el, selector, baseNode) {
  let node = el;
  baseNode = baseNode || document.documentElement;

  matchesSelectorFunc =
    matchesSelectorFunc ||
    [
      'matches',
      'webkitMatchesSelector',
      'mozMatchesSelector',
      'msMatchesSelector',
      'oMatchesSelector',
    ].find(func => isFunction(node[func]));

  if (!isFunction(node[matchesSelectorFunc])) return false;

  do {
    if (node[matchesSelectorFunc](selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
}
