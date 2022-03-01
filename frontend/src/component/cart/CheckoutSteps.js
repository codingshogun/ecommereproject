import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import React from "react";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./checkoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>shipping</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>confirmation</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
    backgroundColor: "inherit",
    color: "white",
    fontSize: "2px !important",
  };
  return (
    <>
      <Stepper alternaativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => {
          return (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                style={{
                  color: activeStep >= index ? "teal" : "rgba(0,0,0,0.650)",
                }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
