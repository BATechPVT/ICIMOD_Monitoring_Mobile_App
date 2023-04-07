import React, {
  useCallback,
  useState
} from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Foundation from "react-native-vector-icons/Foundation";
import { ThemeContext } from "../../theme/theme-context";
import { InteractiveCell } from "./InteractiveCell";

const { height, width } = Dimensions.get("screen");

export const SelectMultiple = (props) => {
  const {
    data,
    specieCallback,
    title,
    onPressInteractiveCell,
    errorMessage,
    showControls = true 
  } = props;
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [dataSource, setDataSource] = useState([{ key: 0 }]);

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
        }}
      />
    );
  };

  const specieFunction = useCallback((Speciesfromchild) => {
    stockArray.push(Speciesfromchild);
  }, []);

  const addItem = (() => {
    let key = dataSource.length;
    return () => {
      dataSource.push({
        key,
      });
      setDataSource(dataSource.slice());
      key++;
    };
  })();

  const removeItem = () => {
    if (dataSource.length > 1) {
      dataSource.pop();
      setDataSource(dataSource.slice());
    }
  };
  const ItemView = ({ item, index }) => {
    return (
      // Flat List Item
      <InteractiveCell
        title={props.title}
        value={data[index]?.name}
        onPress={() => {
          props.onPressInteractiveCell(index);
        }}
      />
    );
  };
  return (
    <View style={{ flex: 1, width: widthPercentageToDP(80) }}>
      <ScrollView
        nestedScrollEnabled={true}
        horizontal={true}
        style={{
          width: widthPercentageToDP(80),
          flex: 1,
        }}
      >
        <FlatList
          nestedScrollEnabled={true}
          data={dataSource}
          contentContainerStyle={{ width: widthPercentageToDP(80) }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </ScrollView>
      {errorMessage !== "" && (
        <Text style={{ color: "red", padding: 7 }}>{errorMessage}</Text>
      )}
      
      {
        showControls && 
      <View style={styles.addMinusContainer}>
        <TouchableOpacity
          style={[styles.addMinus, { backgroundColor: theme.primary }]}
          onPress={addItem}
        >
          <Foundation name="plus" size={25} color="white" />
        </TouchableOpacity>
        <View
          style={{
            width: 20,
          }}
        />
        <TouchableOpacity
          style={[styles.addMinus, { backgroundColor: "red" }]}
          onPress={removeItem}
        >
          <Foundation name="minus" size={25} color="white" />
        </TouchableOpacity>
      </View>
    }
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    // height: 44,
    color: "black",
  },
  addMinusContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 8,
  },
  addMinus: {
    height: 45,
    width: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  metaDataContainer: {
    flex: 1,
  },
});
