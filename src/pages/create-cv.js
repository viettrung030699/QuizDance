import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import SimpleSlider from "../components/slider/Slider";
import { CV2 } from "../components/cv/cv2/cv-2";
import { CV1 } from "../components/cv/cv1/cv1";
import { Tool } from "../components/tools/Tool";
import "../components/tab/tab.scss";

const CreateCV = () => {
  const [key, setKey] = useState("choose");
  const chooseTemplate = (id) => {
    setKey("create");
    const cvID = localStorage.setItem("CV", id);
  };

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="choose" title="1| Choose Template">
          <div className="title">
            <font>Top Templates</font>
          </div>
          <SimpleSlider chooseTemplate={chooseTemplate} />
        </Tab>
        <Tab eventKey="create" title="2| Your Design">
          <div className="flex contaier-page container">
            <div className="col-xs-12 col-sm-12 col-md-4">
              <Tool />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-8 panel-content">
              {/* <CV2 />
              <CV1 /> */}
            </div>
          </div>
        </Tab>
        <Tab eventKey="cv" title="3| CV"></Tab>
      </Tabs>
    </>
  );
};

export default CreateCV;
