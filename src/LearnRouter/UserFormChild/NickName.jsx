import React from "react";
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

const NickName = props => {
  return (
    <div>
      <div>
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
                onDOMChange={props.handleNickName}
                placeHolder="i.e John"
              />
            </FormField>
            <FormField label="Phone No">
              <TextInput
                id="phone"
                name="phone"
                placeHolder="i.e 03123767311"
                onDOMChange={props.handlePhone}
              />
            </FormField>
            <Footer pad={{ vertical: "medium" }}>
              <Button
                icon={<Next />}
                label="Next"
                onClick={props.nickNext}
                primary={true}
                secondary={false}
                accent={false}
                critical={false}
                href="#"
                plain={false}
              />
            </Footer>
          </Form>
        </Box>
      </div>
    </div>
  );
};

export default NickName;
