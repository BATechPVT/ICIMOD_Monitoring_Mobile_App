import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import RNFS from "react-native-fs";
import Spinner from "react-native-loading-spinner-overlay";
import Feather from "react-native-vector-icons/Feather";
import { useUpdateEffect } from "react-use";
import { FontSizes } from "../../../theme/FontSizes";
import { ThemeContext } from "../../../theme/theme-context";
import { SheetHeader } from "../../Components/BottomSheetHeader";
import { Button } from "../../Components/Button";
import ErrorAlert from "../../Components/ErrorAlerts";
import { InteractiveCell } from "../../Components/InteractiveCell";
import PickerComponent from "../../Components/Picker";
import { SelectMultiple } from "../../Components/SelectMultiple";
import SuccessAlert from "../../Components/SuccessAlert";
import { statusCodes } from "../../Config/Constants";
import {
  GET_DISTRICTS,
  GET_DIVISIONS,
  GET_INTERVENTIONS,
  GET_IRRIGATION_LIST,
  GET_PLANT_SPECIES,
  GET_PROTECTION_LIST,
  GET_SITE_LIST,
  GET_TEHSIL,
  SAVE_MONITORING
} from "../../Config/URLs";
import { post } from "../../Config/api";

const { height, width } = Dimensions.get("screen");
export interface dropDownInterface {
  id: number;
  name: string;
}

const MonitoringForm = ({ navigation, route }) => {
  const { siteImage } = route.params;
  const [convertedImage, setConnvertedImage] = useState(siteImage);
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [division, setDivision] = useState("Loading Division");
  const [DivisionValue, setDivisionValue] = useState<dropDownInterface>(null);
  const [DistrictValue, setDistrictValue] = useState<dropDownInterface>(null);
  const [TehsilValue, setTehsilValue] = useState<dropDownInterface>(null);
  const [SiteTypeValue, setSiteTypeValue] = useState<dropDownInterface>(null);
  const [selectedInterventions, setSelectedInterventions] = useState([]);

  const [sourceOofIrrigation, setSourceOfIrrigation] =
    useState<dropDownInterface>(null);
  const [protectionMechanism, setProtectionMechanism] =
    useState<dropDownInterface>(null);
  const [siteName, setSiteName] = useState("");
  const [village, setVillage] = useState("");
  const [area, setArea] = useState("");
  const [UnitValue, setUnitValue] = useState(null);
  const [plantSpeciesList, setPlantSpeciesList] = useState([]);
  const [allInterventions, setAllInterventions] = useState([]);
  const [interventionIndex, setInterventionIndex] = useState(0);
  const [plantSpeciesIndex, setplantSpeciesIndex] = useState(0);
  const [lat, setLat] = React.useState(null);
  const [long, setLong] = React.useState(null);
  const [errorMessages, setErrorMessages] = useState({
    division: "",
    district: "",
    tehsil: "",
    siteType: "",
    siteName: "",
    village: "",
    area: "",
    areaUnit: "",
    plantSpecie: "",
    sourceOfIrrigation: "",
    intervention: "",
    protectionMechanism: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const bottomSheetRef = useRef(null);
  const [sheetData, setSheetData] = React.useState({
    activeIndex: "Division",
    data: [],
  });

  useEffect(() => {
    convertImageToString();
    getCurrentLocation();
    const backAction = () => {
      Alert.alert("Are you sure?", "Your current progress will be lost.", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.navigate("DashBoard") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // variables
  const snapPoints = useMemo(() => ["35%", "50%"], []);
  // callbacks

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      setLat(info.coords.latitude);
      setLong(info.coords.longitude);
    });
  };
  const convertImageToString = () => {
    RNFS.readFile(siteImage, "base64").then((res) => {
      setConnvertedImage(res);
    });
  };

  const GetDivision = async () => {
    try {
      axios
        .get(GET_DIVISIONS)
        .then(async (response) => {
          console.log(response.data);
          if (response.status === 200) {
            const updatedData = await response.data.map((value, index) => ({
              ...value,
              name: value.text,
              id: value.intValue,
            }));
            setSheetData({
              activeIndex: "Division",
              data: updatedData,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          if (error.title == undefined) {
            setErrorMessage(error.toString());
          } else {
            setErrorMessage(error.title.toString());
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const GetDistrict = async () => {
    try {
      axios
        .get(GET_DISTRICTS(DivisionValue?.id))
        .then(async (response) => {
          if (response.status === 200) {
            console.log(GET_DISTRICTS(DivisionValue?.id));
            const updatedData = await response.data.map((value, index) => ({
              ...value,
              name: value.text,
              id: value.intValue,
            }));
            setSheetData({
              activeIndex: "District",
              data: updatedData,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          if (error.title == undefined) {
            setErrorMessage(error.toString());
          } else {
            setErrorMessage(error.title.toString());
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const GetTehsil = async () => {
    try {
      axios
        .get(GET_TEHSIL(DistrictValue?.id))
        .then(async (response) => {
          if (response.status === 200) {
            const updatedData = await response.data.map((value, index) => ({
              ...value,
              name: value.text,
              id: value.intValue,
            }));
            setSheetData({
              activeIndex: "Tehsil",
              data: updatedData,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          if (error.title == undefined) {
            setErrorMessage(error.toString());
          } else {
            setErrorMessage(error.title.toString());
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const GetSiteType = async () => {
    try {
      axios
        .get(GET_SITE_LIST(TehsilValue?.id))
        .then(async (response) => {
          if (response.status === 200) {
            const updatedData = await response.data.map((value, index) => ({
              ...value,
              name: value.text,
              id: value.intValue,
            }));
            setSheetData({
              activeIndex: "SiteType",
              data: updatedData,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          if (error.title == undefined) {
            setErrorMessage(error.toString());
          } else {
            setErrorMessage(error.title.toString());
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const GetSpecies = async () => {
    try {
      axios
        .get(GET_PLANT_SPECIES)
        .then(async (response) => {
          if (response.status === 200) {
            const updatedData = await response.data.map((value, index) => ({
              name: value,
              id: index,
            }));
            console.log(response.data);
            setSheetData({
              activeIndex: "SpeciesList",
              data: updatedData,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          if (error.title == undefined) {
            setErrorMessage(error.toString());
          } else {
            setErrorMessage(error.title.toString());
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const GetIrrigationList = async () => {
    try {
      axios
        .get(GET_IRRIGATION_LIST)
        .then(async (response) => {
          if (response.status === 200) {
            const updatedData = await response.data.map((value, index) => ({
              name: value,
              id: index,
            }));
            console.log(response.data);
            setSheetData({
              activeIndex: "IrrigationList",
              data: updatedData,
            });

            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          if (error.title == undefined) {
            setErrorMessage(error.toString());
          } else {
            setErrorMessage(error.title.toString());
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const navigateToInterventions = (allInterventions) =>{
    navigation.navigate("AddIntervention", {
      allInterventions:allInterventions, 
      selectedInterventions:selectedInterventions,
      addInterventionInList: (data)=> {
        addItemIntervention(data)
      }
    })
  }

  const GetInterventions = async () => {
    try {
      axios
        .get(GET_INTERVENTIONS)
        .then(async (response) => {
          if (response.status === 200) {
            console.log(response.data);
            const updatedData = await response.data.map((value, index) => ({
              ...value,
              name: value.text,
              id: value.intValue,
            }));
            setAllInterventions(updatedData);
            navigateToInterventions(updatedData)

            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          if (error.title == undefined) {
            setErrorMessage(error.toString());
          } else {
            setErrorMessage(error.title.toString());
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const GetProtectionList = async () => {
    try {
      axios
        .get(GET_PROTECTION_LIST)
        .then(async (response) => {
          if (response.status === 200) {
            const updatedData = await response.data.map((value, index) => ({
              name: value,
              id: index,
            }));
            console.log(response.data);
            setSheetData({
              activeIndex: "ProtectionList",
              data: updatedData,
            });

            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.title == undefined) {
            setErrorMessage(error.toString());
          } else {
            setErrorMessage(error.title.toString());
          }
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useUpdateEffect(() => {
    bottomSheetRef.current.present();
  }, [sheetData]);

  {
    /* NEXT Function */
  }

  const NextFunction = () => {
    var error = false;
    if (DivisionValue == null) {
      error = true;
      setErrorMessages({ ...errorMessages, division: "Please Select Divion" });
    } else if (DistrictValue == null) {
      error = true;
      console.log("district error");
      setErrorMessages({
        ...errorMessages,
        district: "Please Select District",
      });
    } else if (TehsilValue == null) {
      error = true;
      setErrorMessages({ ...errorMessages, tehsil: "Please Select Tehsil" });
    } else if (SiteTypeValue == null) {
      error = true;
      setErrorMessages({
        ...errorMessages,
        siteType: "Please Select Site Type",
      });
    } else if (siteName == "" || siteName == "") {
      error = true;
      setErrorMessages({
        ...errorMessages,
        siteName: "Please Enter Site Name",
      });
    } else if (
      plantSpeciesList.length < 1 ||
      plantSpeciesList[0]?.name == undefined
    ) {
      error = true;
      setErrorMessages({
        ...errorMessages,
        plantSpecie: "Please Select Plant Specie",
      });
    }

    if (!error) {
      setIsLoading(true);
      const body = {
        id: 0,
        locationPoints: [
          {
            lg: 77,
            lt: 33.3333,
            // lg: long,
            // lt: lat,
          },
        ],
        image: `data:image/jpg;base64,${convertedImage}`,
        divisionId: DistrictValue.id,
        districtId: DistrictValue.id,
        tehsilId: TehsilValue.id,
        siteId: SiteTypeValue.id,
        interventionIds: selectedInterventions.map((a) => a.id)?.toString(),
        interventions:selectedInterventions
      };

      new Promise((resolve, reject) => {
        post(SAVE_MONITORING, body)
          .then((res) => {
            console.log(" success ", res);
            resolve(true);
            setIsLoading(false);
            console.log("ststues code  ", res.status);
            if (res.status == statusCodes.SUCCESS) {
              setShowSuccessAlert(true);
              setTimeout(() => {
                setShowSuccessAlert(false);
                navigation.replace("DashBoard");
              }, 3000);
            } else {
              if (res.title == undefined) {
                setErrorMessage(res.toString());
              } else {
                setErrorMessage(res.title.toString());
              }
            }
          })
          .catch((err) => {
            reject(err);
            if (err.title == undefined) {
              setErrorMessage(err.toString());
            } else {
              setErrorMessage(err.title.toString());
            }
            console.log(err, "err");
          })
          .finally(() => setIsLoading(false));
      });
    }
  };

  useUpdateEffect(() => {
    if (errorMessage !== "") {
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage && errorMessage !== ""]);

  const renderBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        closeOnPress={true}
      />
    ),
    []
  );

  const onSelectValue = (value: any) => {
    bottomSheetRef.current.dismiss();
    switch (sheetData.activeIndex) {
      case "Division":
        setDivisionValue(value);
        setErrorMessages({ ...errorMessages, division: "" });
        break;
      case "District":
        setDistrictValue(value);
        setErrorMessages({ ...errorMessages, district: "" });
        break;
      case "Tehsil":
        setTehsilValue(value);
        setErrorMessages({ ...errorMessages, tehsil: "" });
        break;
      case "SiteType":
        setSiteTypeValue(value);
        setErrorMessages({ ...errorMessages, siteType: "" });
        break;
      case "SpeciesList":
        let updatedSpecies = [...plantSpeciesList];
        updatedSpecies[plantSpeciesIndex] = value;
        setPlantSpeciesList(updatedSpecies);
        setErrorMessages({ ...errorMessages, plantSpecie: "" });
        break;
      case "IrrigationList":
        setSourceOfIrrigation(value);
        setErrorMessages({ ...errorMessages, sourceOfIrrigation: "" });
        break;
      case "ProtectionList":
        setProtectionMechanism(value);
        setErrorMessages({ ...errorMessages, protectionMechanism: "" });
        break;

      default:
        break;
    }
  };
  const addItemSpecies = (() => {
    let key = plantSpeciesList.length;
    return () => {
      plantSpeciesList.push({});
      setPlantSpeciesList(plantSpeciesList.slice());
      key++;
    };
  })();

  const removeItemSpecies = () => {
    plantSpeciesList.pop();
    setPlantSpeciesList(plantSpeciesList.slice());
  };

  const addItemIntervention = ((selectedIntervention) => {
    const temp = [...selectedInterventions]
    temp.push(selectedIntervention)
    setSelectedInterventions([...temp])
  });

  const interventionItem = ({ item }) => {
    return (
      <View style={{marginVertical:4, flexDirection:'row'}}>
        <Text style={{
          color:'black', 
          flex:1,
          textAlignVertical:'center', 
          marginHorizontal:4}}
        > -- {item.selectedIntervention.name}</Text>
        
        <TouchableOpacity
          style={{ backgroundColor: "red", height: 36,
          width: 36,
          borderRadius: 10,
          alignContent:'center',
          justifyContent: "center",
          alignItems: "center" }}
          onPress={()=>{
            setSelectedInterventions([...selectedInterventions.filter((i)=> i.id != item.id)])
          }}
        >
          <Foundation name="minus" size={25} color="white" />
        </TouchableOpacity>

      </View>
    );
  }

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
            onPress={() => {
              Alert.alert(
                "Are you sure?",
                "Your current progress will be lost.",
                [
                  {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel",
                  },
                  {
                    text: "YES",
                    onPress: () => navigation.goBack(""),
                  },
                ]
              );
            }}
          >
            <Feather name="arrow-left" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBack}
            onPress={() => navigation.navigate("DashBoard")}
          >
            <Feather name="home" size={25} color="white" />
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
          Add Monitoring Report
        </Text>
        <View style={styles.Container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.requiredText}>
              All fields marked with an asterisk (*) are required
            </Text>
            {/* DIVISION */}
            <InteractiveCell
              title="Division"
              value={DivisionValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetDivision();
              }}
              errorMessage={errorMessages.division}
            />
            {/* DISTRICT */}
            <InteractiveCell
              title="District"
              value={DistrictValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetDistrict();
              }}
              errorMessage={errorMessages.district}
            />

            {/* TEHSIL */}
            <InteractiveCell
              title="Tehsil"
              value={TehsilValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetTehsil();
              }}
              errorMessage={errorMessages.tehsil}
            />

            {/* Site Type */}
            <InteractiveCell
              title="Site"
              value={SiteTypeValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetSiteType();
              }}
              errorMessage={errorMessages.siteType}
            />

            {/* Site Name */}
            <View>
              <Text style={styles.sectionText}>Site Name *</Text>
              <TextInput
                style={styles.button}
                placeholder={"Enter Site Name"}
                placeholderTextColor="#777"
                value={siteName}
                onChangeText={(siteName) => {
                  setSiteName(siteName);
                  setErrorMessages({
                    ...errorMessages,
                    siteName: "",
                  });
                }}
              />
              {errorMessages.siteName != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorMessages.siteName}
                </Text>
              )}
            </View>
            <View style={{ width: "100%" }}>
              <SelectMultiple
                data={plantSpeciesList}
                title={"Plant Species"}
                onaddItem={() => addItemSpecies()}
                onremoveItem={() => removeItemSpecies()}
                onPressInteractiveCell={(index) => {
                  setplantSpeciesIndex(index);
                  setIsLoading(true);
                  GetSpecies();
                }}
                errorMessage={errorMessages.plantSpecie}
              />
            </View>
            <View style={{ width: "100%" }}>

            <Text style={styles.sectionText}>Interventions *</Text>
            <FlatList
              data={selectedInterventions}
              renderItem={interventionItem}
              keyExtractor={(item)=> item.id.toString()}
              ItemSeparatorComponent={()=><View style={{
                borderBottomColor:theme.modalBackDrop, borderBottomWidth:1, 
              }} />}
            />
            <Button 
              title="Add Intervention"
              onPress={()=> {
                if(allInterventions.length>0) {
                  navigateToInterventions(allInterventions)
      } else {
                    setplantSpeciesIndex(0);
                    setIsLoading(true);
                    GetInterventions(); 
                }}
              }
            />
            </View>

            <InteractiveCell
              title="Protection Mechanism "
              value={protectionMechanism?.name}
              onPress={() => {
                setIsLoading(true);
                GetProtectionList();
              }}
              errorMessage={errorMessages.protectionMechanism}
            />
            <InteractiveCell
              title="Source of Irrigation"
              value={sourceOofIrrigation?.name}
              onPress={() => {
                setIsLoading(true);
                GetIrrigationList();
              }}
              errorMessage={errorMessages.sourceOfIrrigation}
            />

            <Button title="Submit" onPress={() => NextFunction()} />

            {/* <View style={styles.Container}>
              <View>
                <Text style={styles.containerHeading}>Add Site's Location</Text>
                <Text style={styles.requiredText}>
                  Please press "Select Point" Button below to mark a point.
                </Text>
                <Text style={styles.requiredText}>
                  Please add a point after 30 seconds.
                </Text>
              </View>
              <Button
                onPress={() => counter()}
                title=" Select Point"
                style={{
                  height: 60,
                  width: 160,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              />
            </View> */}
            <Spinner
              visible={isLoading}
              textContent={"Loading..."}
              textStyle={{ color: "white" }}
            />
          </ScrollView>
        </View>
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "white" }}
        />
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
      {showSuccessAlert && (
        <SuccessAlert
          text="Monitoring has added successfully!"
          show={showSuccessAlert}
        />
      )}
      {errorAlert && (
        <ErrorAlert
          text="Error!"
          description={errorMessage}
          show={errorAlert}
        />
      )}
    </BottomSheetModalProvider>
  );
};

export default MonitoringForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
    width: width * 0.9,
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
