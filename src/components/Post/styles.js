export default {
  wrapper: {
    '&:not(:last-child)': {
      borderBottom: [1, 'dotted', '#ccc'],
      paddingBottom: 8,
    },
  },

  link: {
    textDecoration: 'none',
    color: '#333',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
};
