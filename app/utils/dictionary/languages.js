export const languages = [
  {
    name: 'English'
  },
  {
    name: 'Chinese'
  },
  {
    name: 'French'
  },
  {
    name: 'German'
  },
  {
    name: 'Indonesian'
  },
  {
    name: 'Korean'
  },
  {
    name: 'Polish'
  },
  {
    name: 'Spanish'
  },
  {
    name: 'Thai'
  },
  {
    name: 'Viatnamese'
  },
  {
    name: 'Hindi'
  },
  {
    name: 'Japanese'
  },
  {
    name: 'Russian'
  }
];
languages.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);
