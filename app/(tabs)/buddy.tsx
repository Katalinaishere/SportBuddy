import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function BuddyScreen() {
  const { width } = useWindowDimensions();
  const isWeb = width > 768;

  const [selectedSport, setSelectedSport] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const sports = ['⚽ Football', '🎾 Tennis', '🏃 Running'];
  const times = ['Today', 'Tomorrow', 'This Week'];
  const levels = ['Beginner', 'Intermediate', 'Pro'];

  return (
    <View style={styles.background}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isWeb && styles.webScrollContent,
        ]}
      >
        {/* Card */}
        <View style={[styles.card, isWeb && styles.webCard]}>

          {/* Header */}
          <Text style={[styles.header, isWeb && styles.webHeader]}>
            Find a Buddy
          </Text>
          <Text style={styles.subheader}>
            Pick your sport, time & level
          </Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Sport Selection */}
          <Text style={styles.label}>🏟  What sport?</Text>
          <View style={styles.row}>
            {sports.map((sport) => (
              <TouchableOpacity
                key={sport}
                style={[styles.chip, selectedSport === sport && styles.chipActive]}
                onPress={() => setSelectedSport(sport)}
              >
                <Text style={[styles.chipText, selectedSport === sport && styles.chipTextActive]}>
                  {sport}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Time Selection */}
          <Text style={styles.label}>🕐  When?</Text>
          <View style={styles.row}>
            {times.map((time) => (
              <TouchableOpacity
                key={time}
                style={[styles.chip, selectedTime === time && styles.chipActive]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.chipText, selectedTime === time && styles.chipTextActive]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Level Selection */}
          <Text style={styles.label}>⚡  Your level?</Text>
          <View style={styles.row}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.chip, selectedLevel === level && styles.chipActive]}
                onPress={() => setSelectedLevel(level)}
              >
                <Text style={[styles.chipText, selectedLevel === level && styles.chipTextActive]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Find Button */}
          <TouchableOpacity
            style={[
              styles.button,
              (!selectedSport || !selectedTime || !selectedLevel) && styles.buttonDisabled,
            ]}
            disabled={!selectedSport || !selectedTime || !selectedLevel}
          >
            <Text style={styles.buttonText}>Find a Buddy 🔍</Text>
          </TouchableOpacity>

          {/* Hint */}
          {(!selectedSport || !selectedTime || !selectedLevel) && (
            <Text style={styles.hint}>Select all options to continue</Text>
          )}

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#080810',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  webScrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  webCard: {
    width: 480,
    shadowColor: '#00C853',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  webHeader: {
    fontSize: 36,
  },
  subheader: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 28,
  },
  chip: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  chipActive: {
    backgroundColor: 'rgba(0, 200, 83, 0.15)',
    borderColor: '#00C853',
  },
  chipText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  chipTextActive: {
    color: '#00C853',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00C853',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(0, 200, 83, 0.2)',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  hint: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.25)',
    fontSize: 12,
    marginTop: 12,
  },
});