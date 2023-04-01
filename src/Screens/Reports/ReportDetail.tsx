import React, {useCallback, useMemo, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {FontSizes} from '../../../theme/FontSizes';
import {ThemeContext} from '../../../theme/theme-context';
import {statusCodes, dataTypes} from '../../Config/Constants';
import {
  ANR_LOGO,
  APP_LOGO,
  DISTRIBUTION_LOGO,
  NURSERIES_LOGO,
  PLANTATION_LOGO,
  SOWING_LOGO,
  FOREST_LOGO,
  MAP_ICONN,
} from '../../../assets/Images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from '../../Components/Button';
import {getData} from '../../Config/localStorage';
import {get} from '../../Config/api';
import {GET_LIST, BASE_URL} from '../../Config/URLs';
export default function ReportDetailScreen(props: any) {
  const [loading, setLoading] = React.useState(true);
  const {dark, theme, toggle} = React.useContext(ThemeContext);

  const {item} = props.route.params;
  console.log(item.locationPoints[0]?.lt);
  const rowItems = [
    {
      title: 'Site Name',
      value: item.site,
    },
    {
      title: 'Protection Mechanism',
      value: item.monitoringVM2?.protection_mechanism?.toString(),
    },
    {
      title: 'Source Of Irrigation',
      value: item.monitoringVM2?.source_Of_Irrigation?.toString(),
    },
    {
      title: 'Effectiveness',
      value: item.monitoringVM5?.effectiveness,
    },
    {
      title: 'Suitability Of Species',
      value: item.monitoringVM6?.suitabilityOfspecies,
    },
    {
      title: 'Suitable Plants',
      value: item.monitoringVM11?.size_of_plantable_suitable_plants,
    },

    {
      title: 'Area',
      value: item.monitoringVM11?.area,
    },

    {
      title: 'Layout',
      value: item.monitoringVM11?.layout,
    },
    {
      title: 'Weeding Effects',
      value: item.monitoringVM12?.weedingeffects,
    },

    {
      title: 'Effects',
      value: item.monitoringVM14?.effect_and_impact,
    },
  ];
  const getRowcolor = (index: number) => {
    if (index % 2 === 0) return theme.cardRowBackGround;
    else return theme.cardBackGround;
  };
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
              <ScrollView>
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
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              alignSelf: 'flex-end',
              position: 'absolute',
              bottom: 60,
              right: 10,
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
        </ScrollView>
      </View>
    </View>
  );
}
