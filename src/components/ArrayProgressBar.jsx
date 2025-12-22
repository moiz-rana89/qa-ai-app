import React from "react";
import { Progress } from "antd";

const ArrayProgressBar = ({ total, currentIndex }) => {
  if (!total) {
    return <Progress percent={0} showInfo={false} />;
  }

  const percent = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <Progress
      percent={percent}
      strokeColor="#86FE96"
      trailColor="#F1F5F5"
      strokeWidth={8}
      showInfo={false}
    />
  );
};

export default ArrayProgressBar;
