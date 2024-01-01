import React from "react";

interface LoadingProps {}

const Loading: React.FunctionComponent<LoadingProps> = () => {
  return (
    <div id="loading">
      <div className="sk-three-bounce">
        <div className="sk-child sk-bounce1"></div>
        <div className="sk-child sk-bounce2"></div>
        <div className="sk-child sk-bounce3"></div>
      </div>
    </div>
  );
};

export { Loading };
