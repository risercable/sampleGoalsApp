import { View, StyleSheet, Text } from 'react-native';

const Item = ({ title, color }) => (
    <View style={[styles.item, { backgroundColor: color }]}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export default function GoalItem({text, color, ...props}) {
    return (
        <Item title={text} color={color} />
    )
}

const styles =  StyleSheet.create({
    item: {
        backgroundColor: '#e7f3f2',
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 0,
        borderRadius: 5
    },
    title: {
        fontSize: 18,
    },
});
