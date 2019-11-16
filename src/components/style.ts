export const sidebarWidth = 240;

export const sidebarStyle = (option: any) => ({
  ...option,
  position: 'absolute',
  width: sidebarWidth,
  height: window.innerHeight,
  backgroundColor: '#444',
});

export const inputStyle = () => ({
  border: '1px solid rgb(0, 0, 0)',
  marginBottom: 1,
  color: '#000',
});

export const miniInputStyle = () => ({ maxWidth: 50, ...inputStyle() });
