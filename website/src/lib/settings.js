import omit from 'lodash/omit'
import upperFirst from 'lodash/upperFirst'

export const settingsMapper = (mapping, { exclude = [] } = {}) => (settings, options = {}) => {
    const overrides = {}

    Object.keys(settings).forEach(key => {
        if (mapping[key]) {
            overrides[key] = mapping[key](settings[key], settings, options)
        }
    })

    return {
        ...omit(settings, exclude),
        ...overrides,
    }
}

export const mapAxis = type => (value, settings) =>
    settings[`axis${upperFirst(type)}`].enable ? omit(value, ['enable']) : null

export const mapFormat = ({ format, enabled }) => (enabled === true ? format : undefined)
