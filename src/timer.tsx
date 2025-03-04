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
} from 'react-native';

const Timer: React.FC = () => {
  // Timer states
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [customMinutes, setCustomMinutes] = useState<string>('');
  const [customSeconds, setCustomSeconds] = useState<string>('');
  
  // Ref to store interval ID
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Predefined duration options (in minutes)
  const durationOptions: number[] = [15, 30, 45, 60];

  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Start timer
  const startTimer = (): void => {
    if (!isActive || isPaused) {
      setIsActive(true);
      setIsPaused(false);
      
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
  const pauseTimer = (): void => {
    if (isActive && !isPaused && intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsPaused(true);
    }
  };

  // Stop timer
  const stopTimer = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsActive(false);
    setIsPaused(false);
  };

  // Set timer duration from preset options
  const setDuration = (minutes: number): void => {
    setSeconds(minutes * 60);
    setModalVisible(false);
  };
  
  // Set custom timer duration
  const setCustomDuration = (): void => {
    const mins = parseInt(customMinutes) || 0;
    const secs = parseInt(customSeconds) || 0;
    setSeconds(mins * 60 + secs);
    setCustomMinutes('');
    setCustomSeconds('');
    setModalVisible(false);
    setShowCustomInput(false);
  };

  // Handle timer tap
  const handleTimerPress = (): void => {
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

  return (
    <View style={styles.container}>
      {/* Timer Display */}
      <TouchableOpacity onPress={handleTimerPress} style={styles.timerDisplay}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      </TouchableOpacity>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.playButton,
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
            styles.pauseButton,
            (!isActive || isPaused) && styles.disabledButton
          ]}
          onPress={pauseTimer}
          disabled={!isActive || isPaused}
        >
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button, 
            styles.stopButton,
            (!isActive && !isPaused) && styles.disabledButton
          ]}
          onPress={stopTimer}
          disabled={!isActive && !isPaused}
        >
          <Text style={styles.buttonText}>Stop</Text>
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
          style={styles.modalContainer}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Duration</Text>
              
              {!showCustomInput ? (
                <View style={styles.optionsContainer}>
                  {durationOptions.map((minutes, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionItem}
                      onPress={() => setDuration(minutes)}
                    >
                      <Text style={styles.optionText}>{minutes} min</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => setShowCustomInput(true)}
                  >
                    <Text style={styles.optionText}>Custom</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.customInputContainer}>
                  <View style={styles.inputRow}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Minutes</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        value={customMinutes}
                        onChangeText={setCustomMinutes}
                        placeholder="0"
                      />
                    </View>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Seconds</Text>
                      <TextInput
                        style={styles.input}
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
                    style={styles.setButton}
                    onPress={setCustomDuration}
                  >
                    <Text style={styles.setButtonText}>Set Custom Time</Text>
                  </TouchableOpacity>
                </View>
              )}
              
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setShowCustomInput(false);
                }}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
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
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FFC107',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
});

export default Timer;