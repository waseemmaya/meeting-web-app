import React from "react";
import { Button, Box, Heading, CheckBox } from "grommet/components/..";
import Next from "grommet/components/icons/base/Next";

const Beverages = props => {
  return (
    <Box
      justify="center"
      align="center"
      wrap={true}
      pad="small"
      margin="none"
      colorIndex="light-1"
    >
      <div>
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
              onChange={props.handleBeverages}
              value="Coffee"
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
              onChange={props.handleBeverages}
              disabled={false}
              value="Juice"
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
              onChange={props.handleBeverages}
              disabled={false}
              value="Cocktail"
              reverse={true}
            />
          </span>
        </Box>
      </div>
      <br />
      <div>
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
            onChange={props.handleDuration}
            disabled={false}
            value="20 minutes"
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
            onChange={props.handleDuration}
            toggle={false}
            value="60 minutes"
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
            onChange={props.handleDuration}
            disabled={false}
            value="120 minutes"
            reverse={true}
          />
        </Box>
      </div>
      <Button
        icon={<Next />}
        label="Next"
        href="#"
        onClick={props.beveragesNext}
        primary={true}
      />
    </Box>
  );
};

export default Beverages;
