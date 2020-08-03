import React, { useState, useEffect } from 'react'
import { 
  SafeAreaView, 
  FlatList, 
  Text, 
  StatusBar, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native'

import api from './services/api'

export default function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'React Native'
    })

    const project = response.data

    setProjects([ ...projects, project ])
  }

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

        <TouchableOpacity 
          activeOpacity={0.6} 
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
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
  },
  
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontSize: 16,
		fontWeight: 'bold'
  }
})