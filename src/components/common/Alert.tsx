"use client";
import { useContext } from "react";
import { AlertContext } from "@/context/alert-context";
import InfoSvg from "@/utils/icons/info-svg";
import * as Styles from "@/styles/alert-style"

export const Alert = () => {
  const { open, message, percentage  } = useContext(AlertContext);

  return (
    <Styles.AlertContainer open={open}>
      <Styles.InfoSvgContainer>
        <InfoSvg/>
      </Styles.InfoSvgContainer>
      {message}
      <Styles.PercentageContainer>
          <Styles.Percentage percentage={percentage} />
      </Styles.PercentageContainer>
    </Styles.AlertContainer>
  );
};
