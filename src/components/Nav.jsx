export const Nav = ({ children, ismt }) => {
  return <nav style={{ marginTop: ismt ? "15px" : "auto" }}>{children}</nav>;
};
