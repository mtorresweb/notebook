import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Link, router } from "expo-router";
import { observer } from "@legendapp/state/react";
import { state, getTasks } from "../context/state";
import { useEffect } from "react";

const Index = observer(() => {
	const tasks = state.tasks.get();

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<View style={styles.main}>
			<ScrollView contentContainerStyle={styles.container}>
				{tasks.map((task) => (
					<Pressable
						onPress={() => {
							state.selectedTask.set(task);
							router.replace("/components/editor");
						}}
						key={task.id}
						style={styles.task}
					>
						<Text style={styles.text}>{task.text}</Text>
					</Pressable>
				))}
			</ScrollView>
			<Link style={styles.plus} href="/components/editor">
				<AntDesign name="plus" size={24} color="white" />
			</Link>
		</View>
	);
});

const styles = StyleSheet.create({
	main: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#fff",
		paddingBottom: 50
	},
	container: {
		flex: 1,
		alignItems: "center",
		padding: 50,
		gap: 5
	},
	task: {
		backgroundColor: "#353535",
		padding: 20,
		width: 300,
		borderRadius: 10
	},
	text: {
		fontSize: 17,
		color: "#fff",
		overflow: "hidden"
	},
	plus: {
		fontSize: 24,
		backgroundColor: "#ff9900",
		borderRadius: 50,
		padding: 20,
		alignSelf: "flex-end",
		marginRight: 20
	}
});

export default Index;
