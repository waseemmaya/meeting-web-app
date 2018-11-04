import React from "react";
import { Label, Button, Box } from "grommet/components/..";

import Next from "grommet/components/icons/base/Next";
import Spinning from "grommet/components/icons/Spinning";

const UploadImages = props => {
  return (
    <div>
      <div>
        <Box
          justify="center"
          align="center"
          wrap={true}
          pad="small"
          margin="none"
          colorIndex="light-1"
        >
          <Box
            justify="start"
            align="center"
            wrap={true}
            pad="medium"
            margin="small"
            colorIndex="light-1"
          >
            <Label>Upload Image 1</Label>
            <input type="file" onChange={props.handleImages} />
          </Box>
          <Box
            justify="start"
            align="center"
            wrap={true}
            pad="medium"
            margin="small"
            colorIndex="light-1"
          >
            <Label>Upload Image 2</Label>
            <input type="file" onChange={props.handleImages} />
          </Box>
          <Box
            justify="start"
            align="center"
            wrap={true}
            pad="medium"
            margin="small"
            colorIndex="light-1"
          >
            <Label>Upload Image 3</Label>
            <input type="file" onChange={props.handleImages} />
          </Box>

          {props.uploading ? (
            <div>
              <Spinning size="xlarge" />
              <h1>Uploading.....</h1>
            </div>
          ) : (
            <Button
              icon={<Next />}
              label="Next"
              onClick={props.uploadImages}
              primary={true}
            />
          )}
        </Box>
      </div>
    </div>
  );
};

export default UploadImages;
