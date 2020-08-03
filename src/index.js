import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, Text, StatusBar, StyleSheet } from 'react-native'

import api from './services/api'

export default function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7159c1' />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.title}>{project.title}</Text>
          )}
        />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#7159c1'
	},
	
	title: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold'
	}
})