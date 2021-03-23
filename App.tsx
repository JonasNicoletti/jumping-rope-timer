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
const DEFAULT_REST_TIME = 60 * 1000;
const TIMER_TICK = 100;
enum TimerState {
  STOP,
  ACTIVITY,
  REST,
  PAUSE
}
export default function App() {
  const [activityTime, setActivityTime] = useState(DEFAULT_ACTIVITY_TIME);
  const [restTime, setrestTime] = useState(DEFAULT_REST_TIME);
  const [timerState, setTimerState] = useState(TimerState.STOP);
  const [time, setTime] = useState(DEFAULT_ACTIVITY_TIME);
  useEffect(() => {
    if (time <= 0) {
      setTimerState(TimerState.STOP);
      setTime(activityTime);
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
        setTimerState(TimerState.ACTIVITY);
        break;
      case 1:
        setTimerState(TimerState.PAUSE);
        break;  
      case 3:
        setTimerState(TimerState.ACTIVITY);
        break;  
      default:
        setTimerState(TimerState.STOP);
        setTime(activityTime);
    }
  };
  const onResetPress = () => {
    setTimerState(TimerState.STOP);
    setTime(activityTime);
  };

  const getPlayPauseIcon = (): string => {
    switch (timerState) {
      case 1:
        return "pause"
      default:
        return "play"  

    }
  }

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
        icon={getPlayPauseIcon()}
          style={styles.actions}
          onPress={onStateButtonPress}
          mode="outlined"
          >
        </Button>
        <Button icon="stop" style={styles.actions} onPress={onResetPress} mode="contained">
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
