import React, { Component } from "react";
import { Button, Box, Heading, CheckBox } from "grommet/components/..";
import Next from "grommet/components/icons/base/Next";

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
        <Heading tag="h3">* Select Beverages</Heading>
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="small"
          margin="small"
          colorIndex="light-1"
        >
          <span>
            <span>
              <img
                style={{
                  width: 60,
                  height: 60,
                  marginRight: 20,
                  marginTop: -8
                }}
                alt="Coffee"
                src="https://image.flaticon.com/icons/svg/987/987624.svg"
              />
            </span>
            <CheckBox
              label={<Heading tag="h4">Coffee</Heading>}
              toggle={false}
              disabled={false}
              value="Coffee"
              onChange={this.props.checkBox1}
              reverse={true}
            />
          </span>
        </Box>
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="small"
          margin="small"
          colorIndex="light-1"
        >
          <span>
            <span>
              <img
                style={{
                  width: 60,
                  height: 60,
                  marginRight: 20,
                  marginTop: -8
                }}
                alt="Juice"
                src="https://image.flaticon.com/icons/svg/1208/1208379.svg"
              />
            </span>
            <CheckBox
              label={<Heading tag="h4">Juice</Heading>}
              toggle={false}
              disabled={false}
              value="Juice"
              onChange={this.props.checkBox2}
              reverse={true}
            />
          </span>
        </Box>
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="small"
          margin="small"
          colorIndex="light-1"
        >
          <span>
            <span>
              <img
                style={{
                  width: 60,
                  height: 60,
                  marginRight: 20,
                  marginTop: -8
                }}
                alt="Cocktail"
                src="https://image.flaticon.com/icons/svg/1181/1181946.svg"
              />
            </span>
            <CheckBox
              label={<Heading tag="h4">Cocktail</Heading>}
              toggle={false}
              disabled={false}
              value="Cocktail"
              onChange={this.props.checkBox3}
              reverse={true}
            />
          </span>
        </Box>
        <br />
        <Heading tag="h3">* Select Duration</Heading>

        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="small"
          margin="small"
          colorIndex="light-1"
        >
          <CheckBox
            label="20 minutes"
            toggle={false}
            disabled={false}
            value="20 minutes"
            onChange={this.props.duration1}
            reverse={true}
          />
        </Box>
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="small"
          margin="small"
          colorIndex="light-1"
        >
          <CheckBox
            label="60 minutes"
            toggle={false}
            value="60 minutes"
            onChange={this.props.duration2}
            disabled={false}
            reverse={true}
          />
        </Box>
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="small"
          margin="small"
          colorIndex="light-1"
        >
          <CheckBox
            label="120 minutes"
            toggle={false}
            disabled={false}
            value="120 minutes"
            onChange={this.props.duration3}
            reverse={true}
          />
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
    this.props.history.push("/Map4");
  };
}

export default SelectBeverages;