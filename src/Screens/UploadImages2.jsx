import React, { Component } from "react";
import {
  App,
  Heading,
  Button,
  Box,
  FormField,
  TextInput,
  Form,
  Footer
} from "grommet/components/..";
import ImageUploader from "react-images-upload";
import FileUploader from "react-firebase-file-uploader";
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
          <ImageUploader
            onChange={this.props.image1}
            singleImage={true}
            withIcon={true}
            withPreview={true}
            buttonText="Upload Image 1"
            // onChange={this.onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
        </Box>
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="medium"
          margin="small"
          colorIndex="light-1"
        >
          <ImageUploader
            onChange={this.props.image2}
            singleImage={true}
            withIcon={true}
            withPreview={true}
            buttonText="Upload Image 2"
            // onChange={this.onDrop}
            imgExtension={[".jpg", ".gif", ".png"]}
            maxFileSize={5242880}
          />
        </Box>
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="medium"
          margin="small"
          colorIndex="light-1"
        >
          <ImageUploader
            onChange={this.props.image3}
            singleImage={true}
            withIcon={true}
            withPreview={true}
            buttonText="Upload Image 3"
            // onChange={this.onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
        </Box>

        <Button
          icon={<Next />}
          label="Next"
          onClick={this.props.next2}
          primary={true}
        />
      </Box>
    );
  }
}

export default UploadImages2;
