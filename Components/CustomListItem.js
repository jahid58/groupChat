import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    console.log(chatName, id);
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "doc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
    return unsubscribe;
  }, []);
  return (
    <ListItem
      key={id}
      onPress={() => enterChat(id, chatName)}
      key={id}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoUrl ||
            "https://files.fm/thumb_show.php?i=3g382ekcn",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
// import React from "react";
// import { View, Text } from "react-native";

// const CustomListItem = () => {
//   return (
//     <View>
//       <Text> this is me</Text>
//     </View>
//   );
// };

// export default CustomListItem;
