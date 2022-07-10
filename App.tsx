import { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useFonts,
  Inter_700Bold,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';

import { TaskItem } from './src/components/TaskItem';

import logoImg from './assets/to.do.png';
import arrowImg from './assets/arrow.png';
import { colors } from './src/styles/colors';

export interface ITask {
  status: boolean;
  name: string;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
    Inter_500Medium,
  });

  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleSubmitTasks = useCallback(() => {
    setTasks((oldState) => [{ name: text, status: false }, ...oldState]);

    setText('');

    Keyboard.dismiss();
  }, [text]);

  const handleConcludeTask = useCallback((taskName: string) => {
    setTasks((oldState) => {
      const findTaskByName = oldState.find((item) => item.name === taskName);

      const newTask: ITask = {
        name: findTaskByName!.name,
        status: !findTaskByName!.status,
      };

      const oldTasks = oldState.filter((items) => items.name !== taskName);

      return [...oldTasks, newTask];
    });
  }, []);

  const handleRemoveTask = useCallback((taskName: string) => {
    setTasks((oldState) => oldState.filter((items) => items.name !== taskName));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Image source={logoImg} />
        <View style={styles.tasksCountWrapper}>
          <Text style={styles.tasksText}>Você tem</Text>
          <Text style={[styles.tasksText, { fontFamily: 'Inter_700Bold' }]}>
            {' '}
            {tasks.length} tarefas
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Adicione uma tarefa"
            placeholderTextColor={colors.gray2}
            onChangeText={setText}
            value={text}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitTasks}
          >
            <View style={styles.inputDivider} />

            <Image source={arrowImg} style={{ marginHorizontal: 12 }} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={tasks}
        style={styles.tasksWrapper}
        keyExtractor={(key) => key.name}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onConclude={() => handleConcludeTask(item.name)}
            onRemove={() => handleRemoveTask(item.name)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    position: 'relative',
    height: 150,
    width: Dimensions.get('screen').width,
    paddingHorizontal: 24,

    backgroundColor: colors.purple,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tasksCountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tasksText: {
    color: colors.white,
    fontFamily: 'Inter_400Regular',
  },
  inputWrapper: {
    position: 'absolute',
    bottom: -27,
    right: 24,
    left: 24,
    height: 56,
    borderRadius: 5,
    paddingLeft: 24,

    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    color: '#000',
    fontFamily: 'Inter_400Regular',
  },
  inputDivider: {
    height: 56,
    width: 1,
    backgroundColor: colors.gray4,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tasksWrapper: {
    marginTop: 52,
  },
});
