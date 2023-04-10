import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  MAP_ICONN
} from '../../../assets/Images';
import { FontSizes } from '../../../theme/FontSizes';
import { ThemeContext } from '../../../theme/theme-context';
import { Button } from '../../Components/Button';
import { MAPPING } from '../../Config/Constants';
import { BASE_URL } from '../../Config/URLs';

export default function ReportDetailScreen(props: any) {

  const [loading, setLoading] = React.useState(true);
  const {dark, theme, toggle} = React.useContext(ThemeContext);

  const {item} = props.route.params;

  const rowItems = [
    {
      title: 'District',
      value: item.district,
    },
    {
      title: 'Tehsil',
      value: item.tehsil,
    },
    {
      title: 'Site Name',
      value: item.site,
    }
  ];

  const getRowcolor = (index: number) => {
    if (index % 2 === 0) return theme.cardRowBackGround;
    else return 'black';
  };

  const showInterventionData = () => {

    let view: Array<Element> = [];
    view.push(<Text style={styles.sectionText, {width:'100%', color:'black'}}>Interventions</Text>)

    let mapping;

    if(item?.monitoringVM1!=null) {
      mapping = MAPPING[1]
    } else if(item?.monitoringVM2!=null) {
      mapping = MAPPING[2]
    } else if(item?.monitoringVM3!=null) {
      mapping = MAPPING[3]
    } else if(item?.monitoringVM4!=null) {
      mapping = MAPPING[4]
    } else if(item?.monitoringVM5!=null) {
      mapping = MAPPING[5]
    } else if(item?.monitoringVM6!=null) {
      mapping = MAPPING[6]
    } else if(item?.monitoringVM7!=null) {
      mapping = MAPPING[7]
    } else if(item?.monitoringVM8!=null) {
      mapping = MAPPING[8]
    } else if(item?.monitoringVM9!=null) {
      mapping = MAPPING[9]
    } else if(item?.monitoringVM10!=null) {
      mapping = MAPPING[10]
    } else if(item?.monitoringVM11!=null) {
      mapping = MAPPING[11]
    } else if(item?.monitoringVM12!=null) {
      mapping = MAPPING[12]
    } else if(item?.monitoringVM13!=null) {
      mapping = MAPPING[13]
    } else if(item?.monitoringVM14!=null) {
      mapping = MAPPING[14]
    } else if(item?.monitoringVM15!=null) {
      mapping = MAPPING[15]
    }

    if(mapping!=null || mapping != undefined){
      const keys = Object.keys(item.monitoringVM1);
      const values = Object.values(item.monitoringVM1);

      keys.forEach((key, index) => {
        
        const label = mapping.find((item)=>item.Key==key)  
        
        view.push (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 2,
              marginVertical: 3,
              width: wp(80),
            }}>
            <Text
              style={{
                alignSelf: 'flex-start',
                textAlign: 'left',
                width: '50%',
                color:'black',
                fontSize: FontSizes.small,
              }}>
              {label?.Label}
            </Text>
            <Text
              style={{
                alignSelf: 'flex-start',
                textAlign: 'center',
                width: '10%',
                color:'black',
              }}>
              {':'}
            </Text>

            <Text
              style={{
                alignSelf: 'flex-start',
                width: '40%',
                fontSize: FontSizes.small,
                color:'black',
              }}>
              {values[index]}
            </Text>
          </View>
        )
      });
    } else {
      view.push (
        <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 2,
              marginVertical: 3,
              width: wp(80),
            }}>
            <Text
              style={{
                alignSelf: 'flex-start',
                textAlign: 'left',
                width: '50%',
                color:'black',
                fontSize: FontSizes.small,
              }}>
                No intervention found for this record.
            </Text>
          </View>
      )
    }
      
    return view
  }
  
  return (
    <View style={{flex: 1, backgroundColor: theme.primary}}>
      <Ionicons
        name="arrow-back-sharp"
        size={35}
        color={theme.buttonTitle}
        style={{paddingLeft: 15, paddingTop: 15}}
        onPress={() => props.navigation.goBack('')}
      />
      <Text
        style={{
          textAlign: 'center',
          alignSelf: 'center',
          fontSize: FontSizes.extraLarge,
          fontWeight: 'bold',
          marginBottom: 30,
          marginTop: 10,
          color: theme.buttonTitle,
        }}>
        {'Detail'}
      </Text>
      <View
        style={{
          backgroundColor: theme.backGround,
          paddingHorizontal: wp(8),
          paddingVertical: 20,
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
          flex: 1,
        }}>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 20,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              backgroundColor: theme.cardBackGround,
            }}>
            {item?.imagesPath !== '' && (
              <Image
                source={{uri: BASE_URL + item.imagesPath}}
                resizeMode="contain"
                style={{
                  width: 130,
                  height: 130,
                  bottom: 10,
                  borderRadius: 100,
                  borderWidth: 4,
                  borderColor: theme.buttonTitle,
                }}
              />
            )}
            <View
              style={{
                flex: 1,
                width: wp(80),
                alignItems: 'center',
              }}>
              {rowItems !== null &&
                  rowItems.map((value: any, index: number) => {
                    return (
                      <View
                        key={index.toString()}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: getRowcolor(index),
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 2,
                          marginVertical: 3,
                          width: wp(80),
                        }}>
                        <Text
                          style={{
                            alignSelf: 'flex-start',
                            textAlign: 'left',
                            width: '30%',
                            fontSize: FontSizes.small,
                          }}>
                          {value.title}
                        </Text>
                        <Text
                          style={{
                            alignSelf: 'flex-start',
                            textAlign: 'center',
                            width: '30%',
                          }}>
                          {':'}
                        </Text>

                        <Text
                          style={{
                            alignSelf: 'flex-start',
                            width: '30%',
                            fontSize: FontSizes.small,
                          }}>
                          {value.value !== null &&
                          value.value !== undefined &&
                          value.value !== ''
                            ? value.value
                            : 'N/A'}
                        </Text>
                      </View>
                    );
                  })}
              
              {showInterventionData()}

            </View>

            <View style={{
              alignSelf: 'flex-end'
            }}>
            {item.locationPoints[0]?.lg !== null &&
              item.locationPoints[0]?.lg !== undefined && (
                <Button
                  title="View on Map"
                  onPress={() =>
                    props.navigation.navigate('MapScreen', {
                      item,
                      lat: item.locationPoints[0]?.lg,
                      long: item.locationPoints[0]?.lt,
                    })
                  }
                  style={{height: 40, width: 200}}
                  rightIcon={
                    <Image
                      source={MAP_ICONN}
                      resizeMode="contain"
                      style={{width: 30, height: 30}}
                    />
                  }
                />
              )}
          </View>

          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionText: {
    color: "black",
    fontFamily: "Montserrat-SemiBold",
    paddingVertical: 5,
  },
})