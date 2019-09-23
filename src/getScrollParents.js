const root = window

function getStyleComputedProperty(element, property) {
  const css = root.getComputedStyle(element)
  return css[property]
}

export default function getScrollParents(element) {
  const parent = element.parentNode

  if (!parent) {
    return element
  }

  if (parent === root.document) {
    if (root.document.body.scrollTop || root.document.body.scrollLeft) {
      return root.document.body
    } else {
      return root.document.documentElement
    }
  }

  // prettier-ignore
  if (
    ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow')) > -1 ||
    ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-x')) > -1 ||
    ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-y')) > -1
  ) {
    return parent
  }
  return getScrollParents(element.parentNode)
}
