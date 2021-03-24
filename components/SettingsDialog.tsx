import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Dialog, Headline, Text } from "react-native-paper";
import SmoothPicker from "react-native-smooth-picker";
import { formatTime } from "../utils";

const MINUTES_OPTIONS = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  15,
  20,
  25,
  30,
  40,
  50,
  55,
];
const SECONDS_OPTIONS = [0, 15, 30, 45];

interface SettingsDialogProps {
  visible: boolean;
  closeDialog: () => void;
  setMinutePicked: (item: number) => void;
  setSecondPicked: (item: number) => void;
}

export default function SettingsDialog({
  visible,
  closeDialog,
  setMinutePicked,
  setSecondPicked,
}: SettingsDialogProps) {

  return (
    <Dialog visible={visible} onDismiss={closeDialog}>
      <Dialog.Title>ACTIVITY INTERVALL</Dialog.Title>
      <Dialog.Content>
        <View style={styles.dialogInput}>
          <SmoothPicker
            style={styles.picker}
            scrollAnimation
            selectOnPress={true}
            keyExtractor={(_, index) => index.toString()}
            onSelected={({ item }) => setMinutePicked(item)}
            data={MINUTES_OPTIONS}
            renderItem={({ item, index }) => (
              <Text key={index} style={styles.picketItem}>
                {formatTime(item)}
              </Text>
            )}
          />
          <Headline style={{ textAlign: "center", marginRight: 10 }}>
            :
          </Headline>
          <SmoothPicker
            style={styles.picker}
            scrollAnimation
            selectOnPress={true}
            data={SECONDS_OPTIONS}
            keyExtractor={(_, index) => index.toString()}
            onSelected={({ item }) => setSecondPicked(item)}
            renderItem={({ item, index }) => (
              <Text key={index} style={styles.picketItem}>
                {formatTime(item)}
              </Text>
            )}
          />
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={closeDialog}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialogInput: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    margin: 50,
  },
  picker: {
    height: 100,
    maxWidth: 55,
  },
  picketItem: {
    fontSize: 25,
    width: 50,
    borderStyle: "solid",
    borderColor: "grey",
    borderTopWidth: 1,
    textAlign: "center",
    padding: 5,
  },
});
