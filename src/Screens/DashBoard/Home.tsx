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
import {VIEW_MONITORING, ADD_MONITORING} from '../../../assets/Images';
import {
  ANR_LOGO,
  APP_LOGO,
  DISTRIBUTION_LOGO,
  NURSERIES_LOGO,
  PLANTATION_LOGO,
  SOWING_LOGO,
  FOREST_LOGO,
} from '../../../assets/Images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const Data = [
  {
    id: 0,
    title: 'Add Monitoring Report',
    icon: ADD_MONITORING,
    key: dataTypes.addMonitoring,
  },
  {
    id: 1,
    title: 'View Monitoring Report',
    icon: VIEW_MONITORING,
    key: dataTypes.viewMonitoring,
  },
];
export default function HomeScreen(props: any) {
  const [loading, setLoading] = React.useState(true);
  const {dark, theme, toggle} = React.useContext(ThemeContext);

  const navigateOptions = (key: any) => {
    if (key == dataTypes.addMonitoring) {
      props.navigation.navigate('CameraScreen');
    } else {
      props.navigation.navigate('ReportDashBoard');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.primary}}>
      <Text
        style={{
          textAlign: 'center',
          alignSelf: 'center',
          fontSize: FontSizes.extraLarge,
          fontWeight: 'bold',
          marginVertical: 40,
          color: theme.buttonTitle,
        }}>
        MONITORING EVALUATION
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
          {Data !== null &&
            Data.length > 0 &&
            Data.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() => navigateOptions(item.key)}
                  key={index.toString()}
                  activeOpacity={0.9}>
                  <View
                    style={{
                      height: 170,
                      width: wp(38),
                      backgroundColor: theme.cardBackGround,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 10,
                      marginHorizontal: 5,
                      borderRadius: 30,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 0.9},
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 7,
                    }}>
                    <Image
                      source={item.icon}
                      resizeMode="contain"
                      style={{height: 70, width: 70}}
                    />
                    <Text
                      style={{
                        fontWeight: '500',
                        color: theme.primary,
                        fontSize: FontSizes.medium,
                        width: '70%',
                        alignSelf: 'center',
                        textAlign: 'center',
                        paddingTop: 10,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}
