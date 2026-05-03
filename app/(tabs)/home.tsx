import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWeb = width > 768;

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={[styles.scroll, isWeb && styles.webScroll]}>
        <View style={[styles.content, isWeb && styles.webContent]}>

          {/* Greeting */}
          <View style={styles.greetingBlock}>
            <Text style={styles.greeting}>Good evening 👋</Text>
            <Text style={styles.location}>📍 Tirana, Albania</Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Active Requests</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Nearby Courts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Sports</Text>
            </View>
          </View>

          {/* Active Buddy Requests */}
          <Text style={styles.sectionTitle}>🔥 Active Requests</Text>
          <View style={styles.card}>
            <View style={styles.requestRow}>
              <Text style={styles.requestEmoji}>⚽</Text>
              <View style={styles.requestInfo}>
                <Text style={styles.requestTitle}>Football · Beginner</Text>
                <Text style={styles.requestSub}>Today · Parku Rinia</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2 open</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.requestRow}>
              <Text style={styles.requestEmoji}>🎾</Text>
              <View style={styles.requestInfo}>
                <Text style={styles.requestTitle}>Tennis · Intermediate</Text>
                <Text style={styles.requestSub}>Tomorrow · Liqeni Park</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1 open</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.requestRow}>
              <Text style={styles.requestEmoji}>🏃</Text>
              <View style={styles.requestInfo}>
                <Text style={styles.requestTitle}>Running · Any level</Text>
                <Text style={styles.requestSub}>This Week · Blloku</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>4 open</Text>
              </View>
            </View>
          </View>

          {/* Nearby Courts */}
          <Text style={styles.sectionTitle}>📍 Nearby Courts</Text>
          <View style={styles.card}>
            <Text style={styles.courtName}>Parku Rinia Football Court</Text>
            <Text style={styles.courtDetail}>Free · Grass · Open now</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.courtName}>Liqeni Tennis Club</Text>
            <Text style={styles.courtDetail}>Paid · Hard court · Open now</Text>
          </View>

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
  scroll: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  webScroll: {
    alignItems: 'center',
  },
  content: {
    width: '100%',
  },
  webContent: {
    maxWidth: 640,
  },
  greetingBlock: {
    marginBottom: 28,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C853',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    marginTop: 8,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  requestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  requestEmoji: {
    fontSize: 28,
  },
  requestInfo: {
    flex: 1,
  },
  requestTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  requestSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 2,
  },
  badge: {
    backgroundColor: 'rgba(0,200,83,0.15)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,200,83,0.3)',
  },
  badgeText: {
    color: '#00C853',
    fontSize: 12,
    fontWeight: 'bold',
  },
  courtName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  courtDetail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },
});