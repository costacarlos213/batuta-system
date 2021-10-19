import { OptionTypeBase, StylesConfig } from 'react-select'

import theme from './globals'

const customStyles: StylesConfig<OptionTypeBase, false> = {
  menu: provided => ({
    ...provided,
    zIndex: 9999
  }),

  control: (provided, state) => ({
    ...provided,
    height: 40,
    borderColor: theme.colors.gray[200],
    borderRadius: 6,
    width: theme.sizes.full,
    boxShadow: 'none',
    paddingBottom: 1,
    ':hover': {
      borderColor: '#B3B3B3'
    },
    backgroundColor: state.hasValue ? 'white' : '#d2d2d2'
  }),

  container: provided => ({
    ...provided,
    ':focus': {
      border: 0
    }
  }),

  placeholder: provided => ({
    ...provided,
    color: theme.colors.gray[200],
    fontWeight: 'normal'
  }),

  valueContainer: provided => ({
    ...provided,
    height: 'min-content',
    paddingLeft: theme.space[1],
    display: 'flex',
    alignItems: 'center'
  }),

  dropdownIndicator: provided => ({
    ...provided,
    color: theme.colors.gray[200]
  }),

  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : theme.colors.gray[500],
    backgroundColor:
      state.isSelected || state.isFocused ? theme.colors.green[300] : 'white',
    padding: '10px 20px',
    marginBottom: 4,
    cursor: 'pointer',
    ':active': {
      color: theme.colors.gray[500],
      backgroundColor: 'white'
    },
    ':hover': {
      backgroundColor: state.isSelected ? theme.colors.green[300] : 'whitesmoke'
    }
  })
}

export { customStyles }
