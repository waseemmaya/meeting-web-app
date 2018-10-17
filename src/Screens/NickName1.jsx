import React, { Component } from "react";
import {
  Heading,
  Button,
  Box,
  FormField,
  TextInput,
  Form,
  Footer
} from "grommet/components/..";
import Next from "grommet/components/icons/base/Next";

class NickName1 extends Component {
  render() {
    return (
      <Box
        justify="start"
        align="center"
        wrap={true}
        pad="medium"
        margin="small"
        colorIndex="light-1"
      >
        <Heading>Profile</Heading>
        <Form>
          <FormField label="Nick Name">
            <TextInput
              id="nickname"
              name="nickname"
              onDOMChange={this.props.handleNickName}
              placeHolder="i.e John"
            />
          </FormField>
          <FormField label="Phone No">
            <TextInput
              id="phone"
              name="phone"
              placeHolder="i.e 03123767311"
              onDOMChange={this.props.handlePhone}
            />
          </FormField>
          <Footer pad={{ vertical: "medium" }}>
            <Button
              icon={<Next />}
              label="Next 1"
              onClick={this.next1}
              primary={true}
              secondary={false}
              accent={false}
              critical={false}
              plain={false}
            />
          </Footer>
        </Form>
      </Box>
    );
  }

  next1 = () => {
    this.props.history.push("/UploadImages2");
  };
}

export default NickName1;
