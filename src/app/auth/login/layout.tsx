import React from "react";

const layout = (props: LayoutProps<"/auth/login">) => {
  return <div className="max-w-2xl mx-auto">{props.children}</div>;
};

export default layout;
