import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Provider as PaperProvider,
  TextInput,
  Text,
  Title,
  Button,
} from "react-native-paper";
const DEFAULT_ACTIVITY_TIME = 120 * 1000;
enum TimeState {
  STOP,
  ACTIVITY,
  REST,
}
export default function App() {
  const [activityTime, setActivityTime] = useState(DEFAULT_ACTIVITY_TIME);
  const [restTime, setrestTime] = useState(60 * 1000);
  const [timerState, setTimerState] = useState(TimeState.ACTIVITY);
  const [time, setTime] = useState(DEFAULT_ACTIVITY_TIME);
  useEffect(() => {
    if (time <= 0) {
      setTimerState(TimeState.STOP);
      setTime(activityTime);
    }
    if (timerState > 0) {
      const interval = setInterval(() => {
        setTime(time - 1000);
      }, 1001);
      return () => clearInterval(interval);
    }
  }, [timerState, time]);
  const getTitleLabel = (): string => {
    switch (timerState) {
      case 0:
        return "START";
      default:
        return "STOP";
    }
  };
  const onStateButtonPress = () => {
    switch (timerState) {
      case 0:
        setTimerState(TimeState.ACTIVITY);
        break;
      default:
        setTimerState(TimeState.STOP);
        setTime(activityTime);
    }
  };
  const onResetPress = () => {
    setTime(activityTime);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.intervalls}>
          <View style={styles.intervall}>
            <Text style={styles.labels}>Acivity</Text>
            <TextInput
              value={activityTime.toString()}
              onChangeText={(text) => setActivityTime(+text)}
            ></TextInput>
          </View>
          <View style={styles.intervall}>
            <Text style={styles.labels}>Rest</Text>
            <TextInput
              value={restTime.toString()}
              onChangeText={(text) => setrestTime(+text)}
            ></TextInput>
          </View>
        </View>

        <View style={styles.timerView}>
          <Title style={styles.labels} adjustsFontSizeToFit>
            {toReadableTimes(time)}
          </Title>
        </View>
        <Button
          style={styles.actions}
          onPress={onStateButtonPress}
          mode="contained"
        >
          {getTitleLabel()}
        </Button>
        <Button style={styles.actions} onPress={onResetPress} mode="contained">
          RESET
        </Button>
      </View>
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
    flexDirection: "row",
    alignContent: "space-around",
    alignItems: "center",
    marginRight: 12,
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
