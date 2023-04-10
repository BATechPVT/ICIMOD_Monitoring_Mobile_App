import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { RadioButton } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import { FontSizes } from "../../theme/FontSizes";
import { ThemeContext } from "../../theme/theme-context";
import { SheetHeader } from "../Components/BottomSheetHeader";
import { Button } from "../Components/Button";
import { InteractiveCell } from "../Components/InteractiveCell";
import PickerComponent from "../Components/Picker";
import { INPUT_TYPE, MAPPING, VIEW_TYPE } from "../Config/Constants";

  const { height, width } = Dimensions.get("screen");

  // Please forgive me this shitty way of doing this. Probably there is a better way to do this with dynamic forms
var fieldValuesTempArray:string[] = []

  const AddIntervention = ({navigation, route}) => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["35%", "50%"], []);
    
    const {allInterventions, selectedInterventions } = route.params

    useEffect(()=>{
console.log('selectedInterventions: ',selectedInterventions.length);
console.log('allInterventions: ',allInterventions.length);
    },[selectedInterventions, allInterventions])

    const { dark, theme, toggle } = React.useContext(ThemeContext);

    const [selectedIntervention, setSelectedIntervention] = useState();
    
    // This is the form to show
    const [fieldsToShow, setFieldsToShow] = useState([]);
  // These are the input values of this form
  const [fieldValues, setFieldValues] = useState<string[]>([])

    const [sheetData, setSheetData] = React.useState({
      activeIndex: "intervention",
      data: allInterventions,
    });

    const renderBackDrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          closeOnPress={true}
        />
      ),
      []
    );

    const onSelectValue = (value) => {
      bottomSheetRef.current.dismiss();
      if(sheetData.activeIndex=='intervention'){
        setSelectedIntervention(value)
        const temp = allInterventions.find((item)=>item.id == value.id)

        const mappings = MAPPING[temp.id]

        fieldValuesTempArray = []
        //Simple update in array was not working, most likely because array is a referece
        // After using spread operator on array within array, the state update worked
        setFieldValues([...fieldValuesTempArray])
        
        //Setting it at last, because we are clearing the values of previous selection as well
        setFieldsToShow(mappings)
      }
    };

    return (
      <BottomSheetModalProvider>
        <View style={[styles.mainContainer, { backgroundColor: theme.primary }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <TouchableOpacity
              style={styles.headerBack}
              onPress={() => {  navigation.goBack("") }}
            >
              <Feather name="arrow-left" size={30} color="white" />
            </TouchableOpacity>
           
          </View>
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              fontSize: FontSizes.extraLarge,
              fontWeight: "bold",
              marginVertical: 10,
              color: theme.buttonTitle,
            }}
          >
            Add Intervention
          </Text>
          <View style={styles.Container}>
            <ScrollView>
              <Text style={styles.requiredText}>
                All fields marked with an asterisk (*) are required
              </Text>
              
              {/* Date of Activity */}
              <View style={{ width: "100%" }}>
              <InteractiveCell
                title="Intervention"
                value={selectedIntervention?.name ?? ''}
                onPress={() => {
                  setSheetData({
                    activeIndex: "intervention",
                    // data: allInterventions
                    data: allInterventions.filter(item => {
                      return !selectedInterventions.find((item2)=>{
                         return item.id==item2.id
                      }) 
                     })
                  })
                  bottomSheetRef.current.present()
                }}
                errorMessage={''}
              />
              
            </View>
              
              {
                selectedIntervention!=null && fieldsToShow?.length>0 &&
                <View style={{marginVertical:16}}>
                  {
                    fieldsToShow.map((item, index)=>{
                      return(
                        <View>
                          {
                            item.Type == VIEW_TYPE.INPUT &&
                            <>
                              <Text style={styles.sectionText}>{item.Label}</Text>
                              <TextInput
                                style={styles.button}
                                placeholder={"Type..."}
                                placeholderTextColor="#777"
                                onChangeText={(text) => {
                                  fieldValuesTempArray[index]=text
                                  setFieldValues(fieldValuesTempArray)
                                }}
                                keyboardType={item.InputType!=null && item.InputType ==INPUT_TYPE.NUMBER ? 'numeric':'default'}
                              />
                            </>
                          }
                          {
                            item.Type == VIEW_TYPE.RADIO &&
                            <View
                              style={{
                                flex:1,
                                justifyContent: "flex-start",
                                marginVertical:8
                              }}
                              >
                                <Text
                                  style={{
                                    color: "black",
                                    fontFamily: "Montserrat-Regular",
                                  }}
                                >
                                  {item.Label}
                                </Text>
                                <RadioButton.Group 
                                  onValueChange={value => {
                                    fieldValuesTempArray[index]=value
                                    //Simple update in array was not working, most likely because array is a referece
                                    // After using spread operator on array within array, the state update worked
                                    setFieldValues([...fieldValuesTempArray])
                                  }}
                                  value={fieldValuesTempArray[index]} >
                                    <View style={{flex:1, padding:4, flexDirection:'row'}}>
                                      <RadioButton.Item label="Yes" value="yes" position="leading" 
                                        status={fieldValuesTempArray[index]=='yes' ? "checked" : "unchecked"}  />
                                      <RadioButton.Item label="No" value="no" position="leading"
                                        status={fieldValuesTempArray[index]=='no' ? "checked" : "unchecked"} 
                                      />
                                    </View>
                                </RadioButton.Group>
                              </View>
                            }
                        </View>
                      )
                    })
                }
                  <Button
                    style={{marginVertical:8}}
                    onPress={() => { 
                      const intervention = {};
                      fieldsToShow.map((item, index)=>{

                        console.log('item: ', item);

                        if(item.Type==VIEW_TYPE.RADIO){
                          if(fieldValues[index]=='yes'){
                            intervention[item.Key] = true
                          }else{
                            intervention[item.Key] = false
                          }
                        } else if(item.InputType == INPUT_TYPE.NUMBER){ //Casting to number becasue backend needs it this way
                          intervention[item.Key] = fieldValues[index]!=''? Number(fieldValues[index]) : 0
                        } 
                        else {
                          intervention[item.Key] = fieldValues[index]
                        }
                      })
                      const selectedInterventionObject = {
                        selectedIntervention:selectedIntervention,
                        id:selectedIntervention.id,
                        ...intervention
                      }
                      route.params.addInterventionInList(selectedInterventionObject);
                      navigation.goBack();
                    }}
                    title="Add" />

                </View>
              }
             
            </ScrollView>
          </View>
          
        </View>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          handleComponent={null}
          backdropComponent={renderBackDrop}
        >
          <View style={{ flex: 1 }}>
            <SheetHeader title={"Select " + sheetData.activeIndex} />
            <PickerComponent
              data={sheetData.data}
              onSelectValue={onSelectValue}
            />
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  };
  
  export default AddIntervention;
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: "#29AC6F",
    },
    headerContainer: {
      flex: 1,
    },
    headerImage: {
      width: width,
      height: "100%",
    },
    headerPosition: {
      position: "absolute",
    },
    headerBackButtonContainer: {
      width: 60,
    },
    headerBack: {
      alignItems: "flex-start",
      justifyContent: "center",
      paddingTop: 5,
      paddingLeft: 10,
      paddingBottom: 10,
    },
    headerTitleContainer: {
      width: width,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitleContainerText: {
      fontFamily: "Montserrat-SemiBold",
      fontSize: 22,
      color: "white",
      textTransform: "capitalize",
    },
    Container: {
      flex: 5,
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    containerHeading: {
      color: "black",
      fontFamily: "Montserrat-Medium",
      fontSize: 18,
    },
    requiredText: {
      color: "#6D6D6D",
      fontFamily: "Montserrat-Regular",
      paddingVertical: 5,
      fontSize: 12,
    },
    sectionText: {
      color: "black",
      fontFamily: "Montserrat-SemiBold",
      paddingVertical: 5,
    },
    button: {
      height: 60,
      marginVertical: 5,
      borderRadius: 10,
      borderColor: "#A8B4BC",
      borderWidth: 1,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#000",
      fontFamily: "Montserrat-Medium",
    },
    buttonText: {
      color: "black",
      fontFamily: "Montserrat-Medium",
    },
    dropdown: {
      height: 200,
      width: width * 0.9,
      marginVertical: 5,
      borderRadius: 10,
      borderColor: "#A8B4BC",
      borderWidth: 1,
      paddingHorizontal: 20,
    },
    dropdownbutton: {
      padding: 10,
    },
    dropdownItem: {
      color: "#34383b",
      fontFamily: "Montserrat-Regular",
    },
    buttonContainer: {
      justifyContent: "center",
      alignItems: "flex-end",
      paddingVertical: 10,
    },
    nextButton: {
      height: 60,
      borderRadius: 10,
      width: 100,
      backgroundColor: "#29AA74",
      justifyContent: "center",
      alignItems: "center",
    },
    nextText: {
      fontFamily: "Montserrat-SemiBold",
      color: "white",
      fontSize: 16,
    },
    item: {
      padding: 10,
      fontSize: 18,
      // height: 44,
      color: "black",
    },
  });
  