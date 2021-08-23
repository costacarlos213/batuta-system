import { extendTheme } from '@chakra-ui/react'
import { css } from '@emotion/react'

export const scrollBarStyles = css`
  *::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
  *::-webkit-scrollbar {
    width: 5px;
    background: #f4f4f4;
  }
  *::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 15px;
  }
`

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#f2f2f2'
      },
      '*': {
        borderSizing: 'border-box !important'
      },
      td: {
        textAlign: 'center !important',
        border: '1px'
      },
      th: {
        textAlign: 'center !important',
        border: '1px'
      }
    }
  },
  fonts: {
    body: 'Poppins, Roboto, system-ui, sans-serif',
    heading: 'Poppins, Roboto, system-ui, sans-serif',
    mono: 'Menlo, monospace'
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700
  },
  colors: {
    green: {
      400: '#01BA76'
    },
    gray: {
      200: '#5b5b5b',
      500: '#494949',
      900: '#202020'
    }
  }
})

export default theme
