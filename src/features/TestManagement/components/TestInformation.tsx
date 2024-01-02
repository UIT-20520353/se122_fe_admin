import { Select } from "antd";
import React, { useState } from "react";

interface TestInformationProps {}

const TestInformation: React.FunctionComponent<TestInformationProps> = () => {
  const [level, setLevel] = useState<string>("EASY");

  return (
    <div className="test-information">
      <h3 className="test-information__title">Test Information</h3>
      <div className="test-information__body">
        <div className="column">
          <label htmlFor="test__name">Test Name</label>
          <input
            type="text"
            id="test__name"
            autoComplete="off"
            className="test-name"
            placeholder="Enter test name"
          />
        </div>
        <div className="column">
          <label htmlFor="select__level">Test Level</label>
          <Select
            id="select__level"
            style={{ width: "100%", height: "36px" }}
            onChange={(value: string) => setLevel(value)}
            value={level}
            options={[
              { value: "EASY", label: "Easy" },
              { value: "MEDIUM", label: "Medium" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export { TestInformation };
