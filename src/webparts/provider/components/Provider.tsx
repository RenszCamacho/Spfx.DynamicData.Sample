import * as React from "react";

import styles from "./Provider.module.scss";

import type { IProviderProps } from "./IProviderProps";

import { escape } from "@microsoft/sp-lodash-subset";
import { Stack, Text } from "@fluentui/react";

import welcomeDark from "../assets/welcome-dark.png";
import welcomeLight from "../assets/welcome-light.png";

const Provider = ({
  description,
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName,
}: IProviderProps): JSX.Element => {
  return (
    <Stack
      as={"section"}
      className={`${styles.provider} ${hasTeamsContext ? styles.teams : ""}`}
    >
      <Stack className={styles.welcome}>
        <img
          alt=""
          src={isDarkTheme ? welcomeDark : welcomeLight}
          className={styles.welcomeImage}
        />

        <Text as={"h2"}>Well done, {escape(userDisplayName)}!</Text>

        <Text as={"p"}>{environmentMessage}</Text>

        <Text as={"p"}>
          Web part property value: <strong>{escape(description)}</strong>
        </Text>
      </Stack>
    </Stack>
  );
};

export default Provider;
