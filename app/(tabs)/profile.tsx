import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { supabase } from '../../lib/supabase';

type Profile = {
  username: string;
  favourite_sports: string;
  level: string;
};

const sports = ['⚽ Football', '🎾 Tennis', '🏃 Running'];
const levels = ['Beginner', 'Intermediate', 'Pro'];

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const isWeb = width > 768;
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Current user:', user);

    if (!user) {
      console.log('No user found!');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    console.log('Profile data:', data);
    console.log('Profile error:', error);

    if (data) {
      setProfile(data);
      setSelectedLevel(data.level || '');
      setSelectedSports(data.favourite_sports ? data.favourite_sports.split(',') : []);
    }

    setLoading(false);
  }

  function toggleSport(sport: string) {
    setSelectedSports(prev =>
      prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]
    );
  }

  async function saveProfile() {
    setSaving(true);
    setSuccess(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        favourite_sports: selectedSports.join(','),
        level: selectedLevel,
      })
      .eq('user_id', user.id);

    if (!error) setSuccess(true);
    setSaving(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/');
  }

  if (loading) {
    return (
      <View style={styles.background}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.background}>
        <Text style={styles.loadingText}>No profile found. Please log in again.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/login' as any)}>
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={[styles.scroll, isWeb && styles.webScroll]}>
        <View style={[styles.content, isWeb && styles.webContent]}>

          {/* Avatar & Username */}
          <View style={styles.avatarBlock}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile?.username?.[0]?.toUpperCase() || '?'}
              </Text>
            </View>
            <Text style={styles.username}>@{profile?.username}</Text>
            <Text style={styles.memberText}>SportBuddy Member</Text>
          </View>

          {/* Favourite Sports */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🏅 Favourite Sports</Text>
            <View style={styles.row}>
              {sports.map(sport => (
                <TouchableOpacity
                  key={sport}
                  style={[styles.chip, selectedSports.includes(sport) && styles.chipActive]}
                  onPress={() => toggleSport(sport)}
                >
                  <Text style={[styles.chipText, selectedSports.includes(sport) && styles.chipTextActive]}>
                    {sport}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Level */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚡ Your Level</Text>
            <View style={styles.row}>
              {levels.map(level => (
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
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.button, saving && styles.buttonDisabled]}
            onPress={saveProfile}
            disabled={saving}
          >
            <Text style={styles.buttonText}>
              {saving ? 'Saving...' : 'Save Profile'}
            </Text>
          </TouchableOpacity>

          {success && (
            <Text style={styles.successText}>✅ Profile updated!</Text>
          )}

          {/* Logout */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

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
    maxWidth: 540,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
  },
  avatarBlock: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,200,83,0.2)',
    borderWidth: 2,
    borderColor: '#00C853',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00C853',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  memberText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.3)',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  chipActive: {
    backgroundColor: 'rgba(0,200,83,0.15)',
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
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(0,200,83,0.3)',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successText: {
    textAlign: 'center',
    color: '#00C853',
    fontSize: 14,
    marginBottom: 16,
  },
  logoutButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,0,0,0.3)',
    backgroundColor: 'rgba(255,0,0,0.05)',
    marginTop: 8,
  },
  logoutText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
});