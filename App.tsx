import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Provider as PaperProvider,
  TextInput,
  Text,
  Title,
  Button,
  IconButton,
} from "react-native-paper";
const DEFAULT_ACTIVITY_TIME = 120 * 1000;
const DEFAULT_REST_TIME = 60 * 1000;
const TIMER_TICK = 1000;
enum TimerState {
  STOP,
  START,
  PAUSE
}
enum TimerMode {
  ACTIVITY,
  REST
}
export default function App() {
  const [activityTime, setActivityTime] = useState(DEFAULT_ACTIVITY_TIME);
  const [restTime, setrestTime] = useState(DEFAULT_REST_TIME);
  const [timerState, setTimerState] = useState(TimerState.STOP);
  const [timerMode, setTimerMode] = useState(TimerMode.ACTIVITY);
  const [time, setTime] = useState(DEFAULT_ACTIVITY_TIME);
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
    setTimerMode(TimerMode.ACTIVITY)
    setTime(activityTime);
  };

  const getPlayPauseIcon = (): string => {
    switch (timerState) {
      case 0:
      case 2:
        return "play"
      default:
        return "pause"  

    }
  }
  const getStateIcon = (): string  => {
    if(timerState === 0) return "";
    switch (timerMode) {
      case 0:
        return "run-fast";
      case 1:
        return "bed";
      default:
        throw new Error("Illegal TimerMode");  
    }
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.intervalls}>
          <View style={styles.intervall}>
            <IconButton
            icon="run-fast"
            size={42}/>

            <Text
            //label="activity intervall"
            //  value={activityTime.toString()}
            //  onChangeText={(text) => setActivityTime(+text)}
            >{toReadableTimes(activityTime)}</Text>
          </View>
          <View style={styles.intervall}>
          <IconButton
            icon="bed"
            size={42}/>
            <Text
            //label="activity intervall"
            //  value={activityTime.toString()}
            //  onChangeText={(text) => setActivityTime(+text)}
            >{toReadableTimes(restTime)}</Text>
          </View>
        </View>

        <View style={styles.timerView}>
          <Title style={styles.labels} adjustsFontSizeToFit>
            {toReadableTimes(time)}
          </Title>
          <IconButton
            icon={getStateIcon()}
            size={50}/>
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
    flex: 0.5,
    flexDirection: "row",
    alignContent: "stretch",
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
