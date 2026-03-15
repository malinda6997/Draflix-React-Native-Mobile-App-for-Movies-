import { useSignUp } from '@clerk/expo'
import { type Href, Link, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export default function SignUpPage() {
  const { signUp, errors, fetchStatus } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [code, setCode] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  const handleSubmit = async () => {
    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      })

      // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const handleVerify = async () => {
    try {
      await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUp.status === 'complete') {
        await signUp.createdSessionId !== null &&
          router.push('/' as Href)
      } else {
        console.error('Sign-up incomplete:', signUp)
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (signUp.status === 'missing_requirements') {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>
          Verify your email
        </Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter verification code"
          placeholderTextColor="#666666"
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        {errors.fields.code && <Text style={styles.error}>{errors.fields.code.message}</Text>}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            fetchStatus === 'fetching' && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleVerify}
          disabled={fetchStatus === 'fetching'}
        >
          <Text style={styles.buttonText}>Verify Email</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>Sign up</Text>
      
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        placeholder="Enter first name"
        placeholderTextColor="#666666"
        onChangeText={(firstName) => setFirstName(firstName)}
      />
      {errors.fields.firstName && (
        <Text style={styles.error}>{errors.fields.firstName.message}</Text>
      )}

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        placeholder="Enter last name"
        placeholderTextColor="#666666"
        onChangeText={(lastName) => setLastName(lastName)}
      />
      {errors.fields.lastName && (
        <Text style={styles.error}>{errors.fields.lastName.message}</Text>
      )}

      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#666666"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        keyboardType="email-address"
      />
      {errors.fields.identifier && (
        <Text style={styles.error}>{errors.fields.identifier.message}</Text>
      )}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#666666"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      {errors.fields.password && <Text style={styles.error}>{errors.fields.password.message}</Text>}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          (!emailAddress || !password || !firstName || !lastName || fetchStatus === 'fetching') &&
            styles.buttonDisabled,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleSubmit}
        disabled={!emailAddress || !password || !firstName || !lastName || fetchStatus === 'fetching'}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>

      {errors && <Text style={styles.debug}>{JSON.stringify(errors, null, 2)}</Text>}

      <View style={styles.linkContainer}>
        <Text>Already have an account? </Text>
        <Link href="/sign-in">
          <Text style={{ color: '#0a7ea4' }}>Sign in</Text>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
    alignItems: 'center',
  },
  error: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: -8,
  },
  debug: {
    fontSize: 10,
    opacity: 0.5,
    marginTop: 8,
  },
})
