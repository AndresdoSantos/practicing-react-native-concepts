import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ITask } from '../../App';
import { colors } from '../styles/colors';
import trashImg from '../../assets/trash.png';
import checkImg from '../../assets/check.png';

interface ITaskItem {
  task: ITask;
  onRemove(): void;
  onConclude(): void;
}

export function TaskItem({ task, onRemove, onConclude }: ITaskItem) {
  return (
    <View style={styles.container}>
      <View style={styles.titleAndCheckbox}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            {
              backgroundColor: task.status ? colors.green : '',
              borderColor: task.status ? colors.green : '#B2B2B2',
            },
          ]}
          onPress={onConclude}
        >
          {task.status && <Image source={checkImg} />}
        </TouchableOpacity>
        <Text style={styles.title}>{task.name}</Text>
      </View>

      <TouchableOpacity onPress={onRemove}>
        <Image source={trashImg} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
    paddingHorizontal: 24,
    backgroundColor: '#f3f4f6',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleAndCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: colors.gray1,
    fontFamily: 'Inter_500Medium',
  },
  checkbox: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,

    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
