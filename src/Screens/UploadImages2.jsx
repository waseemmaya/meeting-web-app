import React, { Component } from "react";
import { Button, Box, Label } from "grommet/components/..";
import Next from "grommet/components/icons/base/Next";

class UploadImages2 extends Component {
  render() {
    return (
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
          <input type="file" onChange={this.props.image1} />
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
          <input type="file" onChange={this.props.image2} />
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
          <input type="file" onChange={this.props.image3} />
        </Box>

        <Button
          icon={<Next />}
          label="Next 2"
          onClick={this.next2}
          primary={true}
        />
      </Box>
    );
  }

  next2 = () => {
    this.props.history.push("/SelectBeverages");
  };
}

export default UploadImages2;
