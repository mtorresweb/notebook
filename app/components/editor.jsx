import {
	StyleSheet,
	Text,
	ScrollView,
	View,
	TextInput,
	ToastAndroid
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { observer } from "@legendapp/state/react";
import { state } from "../../context/state";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import uuid from "react-native-uuid";

const Editor = observer(() => {
	const selectedTask = state.selectedTask.get();
	const [value, setValue] = useState(selectedTask.id ? selectedTask.text : "");

	useEffect(() => {
		console.log(selectedTask, "selectedTask");
	}, [selectedTask]);

	const addTask = async () => {
		try {
			let tasks = state.tasks.get();

			if (selectedTask.id) {
				tasks = tasks.filter((task) => task.id !== selectedTask.id);
			}

			let newTask = {
				id: uuid.v4(),
				text: value
			};

			tasks.unshift(newTask);

			state.tasks.set(tasks);

			await AsyncStorage.setItem("tasks", JSON.stringify(tasks));

			if (selectedTask.id) {
				ToastAndroid.show("Task updated", ToastAndroid.SHORT);
				state.selectedTask.set(newTask);
			} else {
				ToastAndroid.show("Task added", ToastAndroid.SHORT);
			}
		} catch (error) {
			console.log(error, "writing error");
			ToastAndroid.show("Error saving task", ToastAndroid.SHORT);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.header}>
				<Link
					onPress={() => {
						state.selectedTask.set({
							id: null,
							text: ""
						});
					}}
					style={styles.buttons}
					href="/"
				>
					<AntDesign name="back" size={25} color="#ff9900" />
				</Link>
				<AntDesign
					style={styles.buttons}
					onPress={addTask}
					name="check"
					size={25}
					color="#ff9900"
				/>
			</View>
			<TextInput
				value={value}
				onChangeText={setValue}
				autoFocus={true}
				multiline={true}
				style={styles.input}
				placeholder={"Start typing"}
			></TextInput>
		</ScrollView>
	);
});

const styles = StyleSheet.create({
	container: {
		flexGrow: 1
	},
	header: {
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	input: {
		padding: 10,
		textAlignVertical: "top",
		margin: 20,
		fontSize: 18,
		flexGrow: 1
	},
	buttons: {
		padding: 10
	}
});

export default Editor;
