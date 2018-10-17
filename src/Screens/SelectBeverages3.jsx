import React, { Component } from "react";
import {
  Button,
  Box,
  Label,
  Heading,
  CheckBox,
  Image
} from "grommet/components/..";
import Next from "grommet/components/icons/base/Next";
import Java from "grommet/components/icons/base/Java";

class SelectBeverages extends Component {
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
          <span>
            <span>
              <img
                style={{ width: 60, height: 60, marginRight:20,marginTop: -8 }}
                alt="Coffee"
                src="https://image.flaticon.com/icons/svg/987/987624.svg"
              />
            </span>
            <CheckBox
              label={<Heading>Coffee</Heading>}
              toggle={false}
              disabled={false}
              reverse={true}
            />
          </span>
        </Box>
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="medium"
          margin="small"
          colorIndex="light-1"
        >
          <span>
            <span>
              <img
                style={{ width: 60, height: 60, marginRight:20,marginTop: -8 }}
                alt="Juice"
                src="https://image.flaticon.com/icons/svg/1208/1208379.svg"
              />
            </span>
            <CheckBox
              label={<Heading>Juice</Heading>}
              toggle={false}
              disabled={false}
              reverse={true}
            />
          </span>
        </Box>
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="medium"
          margin="small"
          colorIndex="light-1"
        >
          <span>
            <span>
              <img
                style={{ width: 60, height: 60, marginRight:20,marginTop: -8 }}
                alt="Cocktail"
                src="https://image.flaticon.com/icons/svg/1181/1181946.svg"
              />
            </span>
            <CheckBox
              label={<Heading>Cocktail</Heading>}
              toggle={false}
              disabled={false}
              reverse={true}
            />
          </span>
        </Box>
        <Button
          icon={<Next />}
          label="Next 3"
          onClick={this.next3}
          primary={true}
        />
      </Box>
    );
  }

  next3 = () => {
    this.props.history.push("/ShowMao");
  };
}

export default SelectBeverages;
