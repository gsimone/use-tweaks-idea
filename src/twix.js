import * as THREE from 'three'
import React, { forwardRef, useMemo } from 'react'
import { useTweaks } from 'use-tweaks'

import omit from 'lodash.omit'
import pick from 'lodash.pick'

function normalizedNumber(x) {
  return {
    value: x,
    min: 0,
    max: 1
  }
}

const dictionary = {
  metalness: normalizedNumber,
  roughness: normalizedNumber,
  near: (x) => ({
    value: x,
    min: 0
  }),
  far: (x) => ({
    value: x,
    min: 0
  })
}

function makeTweaks(props = {}) {
  const propKeys = omit(props, ['name', 'args', 'attach', 'envMap', 'children', 'scale'])

  Object.keys(propKeys).forEach((key) => {
    if (key in dictionary) {
      propKeys[key] = dictionary[key](props[key])
    }
  })

  return propKeys
}

export const primitives = ['primitive'].concat(
  Object.keys(THREE)
    .filter(key => /^[A-Z]/.test(key))
    .map(key => key[0].toLowerCase() + key.slice(1))
)


export function withTweaks(Component) {

  const component = forwardRef(function MyComponent(props, ref) {
    const name = props.name || (typeof Component === "string" ? Component : "MyComponent")
    const twix = useTweaks(name, makeTweaks(props))
    return <Component {...props} {...twix} ref={ref} />
  })

  component.displayName = `withTweaks(...)`
  
  return component

}

const t = new Proxy({}, {
  get(_,target) {
    return withTweaks(target)
  }
})

export { t }
