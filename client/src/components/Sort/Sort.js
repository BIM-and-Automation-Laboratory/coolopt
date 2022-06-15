import React from "react";

// custom HOC for sorting timeline components. can be reused for other components.
const Sort = ({ children, by }) => {
  if (!by) {
    return children;
  }
  
  return React.Children.toArray(children).sort((a, b) => {
    return new Date(a.props[by]) - new Date(b.props[by]);
  });
};

export default Sort;
