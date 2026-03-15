import { Show, useUser } from '@clerk/expo'
import { useClerk } from '@clerk/expo'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function Page() {
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Show when="signed-out">
        <Text>Please sign in to continue</Text>
      </Show>
      <Show when="signed-in">
        <Text style={styles.greeting}>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <View style={styles.userInfoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{user?.firstName} {user?.lastName}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.emailAddresses[0].emailAddress}</Text>
        </View>
        <Pressable style={styles.button} onPress={() => signOut()}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
      </Show>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  userInfoContainer: {
    gap: 8,
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
})
