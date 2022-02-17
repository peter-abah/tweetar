function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue('--color-primary'),
        bg: withOpacityValue('--color-bg'),
        red: withOpacityValue('--color-red'),
        blue: withOpacityValue('--color-blue'),
        neutral: withOpacityValue('--color-neutral'),
      }
    },
  },
  plugins: [],
};
