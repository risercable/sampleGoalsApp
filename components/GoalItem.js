import { View, StyleSheet, Text, Pressable } from 'react-native';

const Item = ({ title, color, onDeleteItem }) => (
    <Pressable
        android_ripple={{ color: '#210644'}}
        onPress={onDeleteItem}
        style={({pressed}) => pressed && styles.pressedItem}
    >
        <View style={[styles.item, { backgroundColor: color }]}>
            <Text style={styles.title}>{title}</Text>
        </View>
    </Pressable>
);

export default function GoalItem({text, color, ...props}) {
    return (
        <Item title={text} color={color} onDeleteItem={props.onDeleteItem} />
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
    pressedItem: {
        opacity: 0.5
    },
    title: {
        fontSize: 18,
    },
});
