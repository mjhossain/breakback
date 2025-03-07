import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  AppState,
} from 'react-native';

const Timer = () => {
  // Timer states
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('');
  const [customSeconds, setCustomSeconds] = useState('');
  const [clockOutTime, setClockOutTime] = useState('');
  const [backgroundTime, setBackgroundTime] = useState(null);
  const appState = useRef(AppState.currentState);
  
  // Ref to store interval ID
  const intervalRef = useRef(null);

  // Predefined duration options (in minutes)
  const durationOptions = [15, 30, 45, 60];

  // Format seconds to MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Start timer
  const startTimer = () => {
    if (!isActive || isPaused) {
      setIsActive(true);
      setIsPaused(false);
      setBackgroundTime(null);
      
      // Recalculate clock out time when resuming from pause
      setClockOutTime(calculateClockOutTime(seconds));
      
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            setIsActive(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
  };

  // Pause timer
  const handlePauseReset = () => {
    if (isActive && !isPaused) {
      // First click: Pause the timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsPaused(true);
    } else if (isPaused) {
      // Second click when paused: Reset the timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsActive(false);
      setIsPaused(false);
      setSeconds(0);
      setClockOutTime(''); // Clear clock out time when resetting
    }
  };

  // Helper function to calculate clock out time
  const calculateClockOutTime = (durationInSeconds) => {
    const now = new Date();
    const clockOut = new Date(now.getTime() + durationInSeconds * 1000);
    return clockOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Update both setDuration functions to calculate clock out time
  const setDuration = (minutes) => {
    const totalSeconds = minutes * 60;
    setSeconds(totalSeconds);
    setClockOutTime(calculateClockOutTime(totalSeconds));
    setModalVisible(false);
  };
  
  const setCustomDuration = () => {
    const mins = parseInt(customMinutes) || 0;
    const secs = parseInt(customSeconds) || 0;
    const totalSeconds = mins * 60 + secs;
    setSeconds(totalSeconds);
    setClockOutTime(calculateClockOutTime(totalSeconds));
    setCustomMinutes('');
    setCustomSeconds('');
    setModalVisible(false);
    setShowCustomInput(false);
  };

  // Handle timer tap
  const handleTimerPress = () => {
    // Only show modal if timer is stopped
    if (!isActive && !isPaused) {
      setModalVisible(true);
      setShowCustomInput(false);
    }
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Add this useEffect for handling app state changes
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // App coming to foreground
        if (backgroundTime && isActive && !isPaused) {
          const currentTime = new Date();
          const elapsedSeconds = Math.floor((currentTime - backgroundTime) / 1000);
          setSeconds(prev => Math.max(0, prev - elapsedSeconds));
        }
      }
      
      if (nextAppState === 'background') {
        // App going to background
        setBackgroundTime(new Date());
      }
      
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [isActive, isPaused, backgroundTime]);

  return (
    <View style={styles.container}>
      {/* Timer Display */}
      <TouchableOpacity onPress={handleTimerPress} style={styles.timerDisplay}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      </TouchableOpacity>
      <View style={styles.returnToWorkBox}>
          <Text style={styles.returnToWorkText}>
            Clock Out Time: {clockOutTime || '--:--'}
          </Text> 
      </View>
      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            (isActive && !isPaused) && styles.disabledButton
          ]}
          onPress={startTimer}
          disabled={isActive && !isPaused}
        >
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            (!isActive && !isPaused) && styles.disabledButton
          ]}
          onPress={handlePauseReset}
          disabled={!isActive && !isPaused}
        >
          <Text style={styles.buttonText}>
            {isPaused ? "Reset" : "Pause"}
          </Text>
        </TouchableOpacity>

      </View>

      {/* Duration Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={modalStyles.modalContainer}
        >
          <SafeAreaView style={modalStyles.modalContainer}>
            <View style={modalStyles.modalContent}>
              <Text style={modalStyles.modalTitle}>Select Duration</Text>
              
              {!showCustomInput ? (
                <View style={modalStyles.optionsContainer}>
                  {durationOptions.map((minutes, index) => (
                    <TouchableOpacity
                      key={index}
                      style={modalStyles.optionItem}
                      onPress={() => setDuration(minutes)}
                    >
                      <Text style={modalStyles.optionText}>{minutes} min</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={modalStyles.optionItem}
                    onPress={() => setShowCustomInput(true)}
                  >
                    <Text style={modalStyles.optionText}>Custom</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={modalStyles.customInputContainer}>
                  <View style={modalStyles.inputRow}>
                    <View style={modalStyles.inputGroup}>
                      <Text style={modalStyles.inputLabel}>Minutes</Text>
                      <TextInput
                        style={modalStyles.input}
                        keyboardType="number-pad"
                        value={customMinutes}
                        onChangeText={setCustomMinutes}
                        placeholder="0"
                      />
                    </View>
                    
                    <View style={modalStyles.inputGroup}>
                      <Text style={modalStyles.inputLabel}>Seconds</Text>
                      <TextInput
                        style={modalStyles.input}
                        keyboardType="number-pad"
                        maxLength={2}
                        value={customSeconds}
                        onChangeText={(text) => {
                          // Ensure seconds are between 0-59
                          const seconds = parseInt(text);
                          if (!text || (seconds >= 0 && seconds <= 59)) {
                            setCustomSeconds(text);
                          }
                        }}
                        placeholder="0"
                      />
                    </View>
                  </View>
                  
                  <TouchableOpacity
                    style={[modalStyles.setButton, misc.boxWithShadow]}
                    onPress={setCustomDuration}
                  >
                    <Text style={modalStyles.setButtonText}>Set Custom Time</Text>
                  </TouchableOpacity>
                </View>
              )}
              
              <TouchableOpacity
                style={[modalStyles.closeButton, misc.boxWithShadow]}
                onPress={() => {
                  setModalVisible(false);
                  setShowCustomInput(false);
                }}
              >
                <Text style={modalStyles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timerDisplay: {
    marginBottom: 5,
    padding:5,
    height: 150,
    // backgroundColor: '#f0f0f0'
  },
  timerText: {
    fontSize: 130,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: "Jersey 25",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // gap: 10,
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: 150,
    alignItems: 'center',
    backgroundColor: '#FF6652'
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: "Jersey 25",
  },
  returnToWorkBox: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  returnToWorkText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: "Jersey 25",
  },
});

const modalStyles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  optionItem: {
    margin: 8,
    padding: 16,
    width: '40%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
  },
  customInputContainer: {
    width: '100%',
    marginVertical: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputGroup: {
    width: '45%',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  setButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  setButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    padding: 12,
    backgroundColor: '#dddddd',
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

const misc = StyleSheet.create({
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,  
    elevation: 2
  }
});

export default Timer;