import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Provider as PaperProvider,
  TextInput,
  Text,
  Title,
  Button,
  IconButton,
  Dialog,
  Portal,
  Headline,
} from "react-native-paper";
import SmoothPicker from "react-native-smooth-picker";
const DEFAULT_ACTIVITY_TIME = 120 * 1000;
const DEFAULT_REST_TIME = 60 * 1000;
const TIMER_TICK = 1000;
enum TimerState {
  STOP,
  START,
  PAUSE,
}
enum TimerMode {
  ACTIVITY,
  REST,
}
export default function App() {
  const [activityTime, setActivityTime] = useState(DEFAULT_ACTIVITY_TIME);
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME);
  const [timerState, setTimerState] = useState(TimerState.STOP);
  const [timerMode, setTimerMode] = useState(TimerMode.ACTIVITY);
  const [minutePicked, setMinutePicked] = useState<null | number>(null);
  const [secondPicked, setSecondPicked] = useState<null | number>(null);
  const [settingsMode, setSettingsMode] = useState<null | TimerMode>(null);
  const [time, setTime] = useState(DEFAULT_ACTIVITY_TIME);
  const [visible, setVisible] = useState(false);
  const showDialog = (mode: TimerMode) => {
    setSettingsMode(mode);
    setVisible(true);
  };
  const clodeDialog = () => {
    const newTimeValue =
      (minutePicked || 0) * 60 * 1000 + (secondPicked || 0) * 1000;
    if (settingsMode === 0) {
      setActivityTime(newTimeValue);
    }
    if (settingsMode === 1) {
      setRestTime(newTimeValue);
    }
    setSettingsMode(null);
    setMinutePicked(null);
    setSecondPicked(null);
    setVisible(false);
  };
  useEffect(() => {
    if (time <= 0) {
      if (timerMode === 0) {
        setTimerMode(TimerMode.REST);
        setTime(restTime);
        return;
      }
      if (timerMode === 1) {
        setTimerMode(TimerMode.ACTIVITY);
        setTime(activityTime);
        return;
      }
    }
    if (timerState == 1) {
      const interval = setInterval(() => {
        setTime(time - TIMER_TICK);
      }, TIMER_TICK);
      return () => clearInterval(interval);
    }
  }, [timerState, time]);

  const onStateButtonPress = () => {
    switch (timerState) {
      case 0:
      case 2:
        setTimerState(TimerState.START);
        break;
      case 1:
        setTimerState(TimerState.PAUSE);
        break;
      default:
        throw new Error("Illegal TimerState");
    }
  };
  const onResetPress = () => {
    setTimerState(TimerState.STOP);
    setTimerMode(TimerMode.ACTIVITY);
    setTime(activityTime);
  };

  const getPlayPauseIcon = (): string => {
    switch (timerState) {
      case 0:
      case 2:
        return "play";
      default:
        return "pause";
    }
  };
  const getStateIcon = (): string => {
    if (timerState === 0) return "";
    switch (timerMode) {
      case 0:
        return "run-fast";
      case 1:
        return "bed";
      default:
        throw new Error("Illegal TimerMode");
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.intervalls}>
          <View style={styles.intervall}>
            <IconButton
              icon="run-fast"
              onPress={() => showDialog(TimerMode.ACTIVITY)}
              animated={true}
              size={42}
            />

            <Text
            //label="activity intervall"
            //  value={activityTime.toString()}
            //  onChangeText={(text) => setActivityTime(+text)}
            >
              {toReadableTimes(activityTime)}
            </Text>
          </View>
          <View style={styles.intervall}>
            <IconButton
              icon="bed"
              size={42}
              animated={true}
              onPress={() => showDialog(TimerMode.REST)}
            />
            <Text
            //label="activity intervall"
            //  value={activityTime.toString()}
            //  onChangeText={(text) => setActivityTime(+text)}
            >
              {toReadableTimes(restTime)}
            </Text>
          </View>
        </View>

        <View style={styles.timerView}>
          <Title style={styles.labels} adjustsFontSizeToFit>
            {toReadableTimes(time)}
          </Title>
          <IconButton icon={getStateIcon()} size={64} />
        </View>
        <Button
          icon={getPlayPauseIcon()}
          style={styles.actions}
          onPress={onStateButtonPress}
          mode="outlined"
        ></Button>
        <Button
          icon="stop"
          style={styles.actions}
          onPress={onResetPress}
          mode="contained"
        ></Button>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={clodeDialog}>
          <Dialog.Title>ACTIVITY INTERVALL</Dialog.Title>
          <Dialog.Content>
            <View style={styles.dialogInput}>
              <SmoothPicker
                style={styles.picker}
                scrollAnimation
                selectOnPress={true}
                keyExtractor={(_, index) => index.toString()}
                onSelected={({ item }) => setMinutePicked(item)}
                data={[
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
                ]}
                renderItem={({ item, index }) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: 25,
                      width: 50,
                      borderStyle: "solid",
                      borderColor: "grey",
                      borderTopWidth: 1,
                      textAlign: "center",
                      padding: 5,
                    }}
                  >
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
                data={[0, 15, 30, 45]}
                keyExtractor={(_, index) => index.toString()}
                onSelected={({ item }) => setSecondPicked(item)}
                renderItem={({ item, index }) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: 25,
                      width: 50,
                      borderStyle: "solid",
                      borderColor: "grey",
                      borderTopWidth: 1,
                      textAlign: "center",
                      padding: 5,
                    }}
                  >
                    {formatTime(item)}
                  </Text>
                )}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={clodeDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
}

const toReadableTimes = (timestamp: number): string => {
  const minutes = timestamp / 1000 / 60;
  const seconds = (timestamp / 1000) % 60;
  return `${formatTime(minutes)}:${formatTime(seconds)}`;
};

const formatTime = (timestamp: number): string => {
  return (~~timestamp).toString().padStart(2, "0");
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    padding: 4,
  },
  intervalls: {
    flexDirection: "row",
    padding: 4,
    margin: 24,
  },
  intervall: {
    flex: 0.5,
    flexDirection: "row",
    alignContent: "stretch",
    alignItems: "center",
    marginRight: 12,
  },
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
  timerView: {
    flex: 0.6,
    alignItems: "center",
    alignContent: "space-around",
    marginTop: 250,
  },
  labels: {
    fontWeight: "bold",
    fontSize: 30,
    margin: 8,
  },
  actions: {
    flex: 0.2,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
