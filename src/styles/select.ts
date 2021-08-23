import { OptionTypeBase, StylesConfig } from 'react-select'

import theme from './globals'

const customStyles: StylesConfig<OptionTypeBase, false> = {
  control: provided => ({
    ...provided,
    height: 45,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottomColor: theme.colors.gray[200],
    borderRadius: 0,
    width: theme.sizes.full,
    boxShadow: 'none',
    ':hover': {
      borderColor: '#B3B3B3'
    }
  }),

  container: provided => ({
    ...provided,
    ':focus': {
      border: 0
    }
  }),

  placeholder: provided => ({
    ...provided,
    height: '1.2rem',
    color: theme.colors.gray[200],
    fontWeight: 'normal'
  }),

  valueContainer: provided => ({
    ...provided,
    height: 'min-content',
    padding: theme.space[1],
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
    backgroundColor: state.isSelected ? theme.colors.green[300] : 'white',
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
