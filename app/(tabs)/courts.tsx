import { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';

type Court = {
  id: string;
  name: string;
  sport: string;
  address: string;
  latitude: number;
  longitude: number;
  is_free: boolean;
  surface: string;
};

function getSportEmoji(sport: string) {
  if (sport.includes('Football')) return '⚽';
  if (sport.includes('Tennis')) return '🎾';
  if (sport.includes('Running')) return '🏃';
  return '🏅';
}

function WebMap({ courts, selected }: { courts: Court[], selected: Court | null }) {
  const markers = courts.map(c =>
    `L.marker([${c.latitude}, ${c.longitude}])
      .addTo(map)
      .bindPopup("<b>${c.name}</b><br>${c.sport}");`
  ).join('\n');

  const center = selected
    ? `[${selected.latitude}, ${selected.longitude}]`
    : '[41.3275, 19.8187]';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        * { margin: 0; padding: 0; }
        #map { width: 100vw; height: 100vh; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView(${center}, 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap'
        }).addTo(map);
        ${markers}
      </script>
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  return (
    <iframe
      src={url}
      style={{ width: '100%', height: 380, border: 'none', borderRadius: 0 }}
      title="Tirana Courts Map"
    />
  );
}

export default function CourtsScreen() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [selected, setSelected] = useState<Court | null>(null);

  useEffect(() => {
    fetchCourts();
  }, []);

  async function fetchCourts() {
    const { data, error } = await supabase.from('courts').select('*');
    if (!error && data) setCourts(data);
  }

  return (
    <View style={styles.container}>

      {/* Map — web only for now */}
      {Platform.OS === 'web' && (
        <WebMap courts={courts} selected={selected} />
      )}

      {/* Court Cards */}
      <ScrollView
        horizontal
        style={styles.cardsScroll}
        contentContainerStyle={styles.cardsContent}
        showsHorizontalScrollIndicator={false}
      >
        {courts.map(court => (
          <TouchableOpacity
            key={court.id}
            style={[styles.card, selected?.id === court.id && styles.cardActive]}
            onPress={() => setSelected(court)}
          >
            <Text style={styles.cardEmoji}>{getSportEmoji(court.sport)}</Text>
            <Text style={styles.cardName}>{court.name}</Text>
            <Text style={styles.cardDetail}>{court.surface}</Text>
            <View style={[styles.badge, court.is_free ? styles.badgeFree : styles.badgePaid]}>
              <Text style={styles.badgeText}>{court.is_free ? 'Free' : 'Paid'}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Selected Court Info */}
      {selected && (
        <View style={styles.infoCard}>
          <Text style={styles.infoName}>{getSportEmoji(selected.sport)} {selected.name}</Text>
          <Text style={styles.infoDetail}>📍 {selected.address}</Text>
          <Text style={styles.infoDetail}>🏟 {selected.sport} · {selected.surface}</Text>
          <Text style={styles.infoDetail}>{selected.is_free ? '✅ Free' : '💰 Paid'}</Text>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080810',
  },
  cardsScroll: {
    maxHeight: 140,
    marginTop: 12,
  },
  cardsContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 14,
    width: 140,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardActive: {
    borderColor: '#00C853',
    backgroundColor: 'rgba(0,200,83,0.1)',
  },
  cardEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  cardName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 8,
  },
  badge: {
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  badgeFree: {
    backgroundColor: 'rgba(0,200,83,0.2)',
  },
  badgePaid: {
    backgroundColor: 'rgba(255,200,0,0.2)',
  },
  badgeText: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  infoCard: {
    margin: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  infoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  infoDetail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 6,
  },
});