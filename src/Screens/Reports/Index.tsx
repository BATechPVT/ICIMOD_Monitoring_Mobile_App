import moment from 'moment';
import React, { useEffect } from 'react';
import {
  Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { REPORT_DIST_ICON, REPORT_NAME_ICON, REPORT_OCCURANCE_ICON, VIEW_REPORT_ICON } from '../../../assets/Images';
import { FontSizes } from '../../../theme/FontSizes';
import { ThemeContext } from '../../../theme/theme-context';
import { statusCodes } from '../../Config/Constants';
import { BASE_URL, GET_LIST } from '../../Config/URLs';
import { get } from '../../Config/api';

export default function ReportDashBoard(props: any) {
  const [activeSections, setActiveSections] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [allReports, setAllReports] = React.useState([]);
  const {dark, theme, toggle} = React.useContext(ThemeContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log(' hy ');
    setLoading(true);
    const apiResponse = await get(GET_LIST);
    console.log(' status ', apiResponse.status);
    if (apiResponse.status === statusCodes.SUCCESS) {
      setAllReports(apiResponse.data);
    } 
    setLoading(false);
  };
  const _renderSectionTitle = (section: any, isActive: boolean) => {
    return null;
    return (
      <View style={{}}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const _renderHeader = (
    section: any,
    index: number,
    isActive: boolean,
    sections: any,
  ) => {
    return (
      <Animatable.View
        duration={300}
        transition="top"
        easing="ease-in-back"
        style={{backgroundColor: 'transparent'}}>
        <View
          style={{
            height: 90,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginVertical: 10,
          }}>
          {section?.imagesPath !== '' && (
            <Image
              source={{uri: BASE_URL + section?.imagesPath}}
              resizeMode="contain"
              style={{height: 50, width: 50, borderRadius: 100}}
            />
          )}
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={REPORT_NAME_ICON}
                style={{height: 20, width: 20}}
              />
              <Text
                style={{
                  fontWeight: '500',
                  paddingLeft: 5,
                  color: theme.textColor,
                }}>
                {section?.site}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={REPORT_DIST_ICON}
                style={{height: 20, width: 20}}
              />
              <Text
                style={{
                  fontWeight: '500',
                  paddingLeft: 5,
                  color: theme.cardIconColor,
                }}>
                {section?.district}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}>
              <AntDesign name="calendar" size={14} color={theme.textColor} />
              <Text
                style={{
                  fontWeight: '500',
                  paddingLeft: 5,
                  fontSize: FontSizes.extraSmall,
                  color: theme.textColor,
                }}>
                {moment.utc(section?.addedAt).fromNow()}
              </Text>
            </View>
          </View>
          <AntDesign
            name={isActive ? 'down' : 'right'}
            size={20}
            color={theme.cardIconColor}
          />
        </View>
        {/* </TouchableOpacity> */}
      </Animatable.View>
    );
  };

  const _renderContent = (
    section: any,
    index: number,
    isActive: boolean,
    sections: any,
  ) => {
    return (
      <Animatable.View
        duration={300}
        transition="top"
        easing="ease-in-back"
        style={{backgroundColor: 'transparent'}}>
        <View
          style={{
            alignSelf: 'center',
            paddingHorizontal: 20,
            paddingBottom: 14,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: theme.cardRowBackGround,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 2,
              marginVertical: 3,
              width: '100%',
            }}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
              <Ionicons
                name="ios-locate-outline"
                color={theme.secondary}
                size={26}
              />
              <Text style={{paddingLeft: 12, fontSize: FontSizes.extraSmall}}>
                Created By
              </Text>
            </View>
            <Text style={{flex: 1}}>{': ' + section.createBy}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'black',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 2,
              marginVertical: 3,
              width: '100%',
            }}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
              <Image
                source={VIEW_REPORT_ICON}
                resizeMode="contain"
                style={{height: 20, width: 20, tintColor: theme.secondary}}
              />
              <Text style={{paddingLeft: 12, fontSize: FontSizes.extraSmall}}>
                Status
              </Text>
            </View>
            <Text style={{flex: 1}}>
              {section.approvalStatus == 0
                ? ': Pending'
                : section.approvalStatus == 2
                ? ': Approved'
                : ': Rejected'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: theme.cardRowBackGround,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 2,
              marginVertical: 3,
              width: '100%',
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
              <Image
                source={REPORT_OCCURANCE_ICON}
                resizeMode="contain"
                style={{height: 20, width: 20}}
              />
              <Text style={{paddingLeft: 12, fontSize: FontSizes.extraSmall}}>
                Tehsil
              </Text>
            </View>
            <Text style={{flex: 1}}>{': ' + section.tehsil}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ReportDetailScreen', {
                item: section,
              })
            }>
            <View
              style={{
                alignSelf: 'flex-end',
                backgroundColor: theme.primary,
                height: 50,
                width: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign
                name="arrowright"
                size={24}
                color={theme.buttonTitle}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    );
  };

  const _updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
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
        {'Monitoring Reports'}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
            }}>
            <Accordion
              sections={allReports}
              activeSections={activeSections}
              renderSectionTitle={_renderSectionTitle}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
              containerStyle={{
                paddingVertical: 20,
                width: '100%',
                backgroundColor: theme.cardBackGround,
              }}
              // renderAsFlatList
              touchableComponent={TouchableWithoutFeedback}
              sectionContainerStyle={{
                borderLeftWidth: 3,
                borderLeftColor: theme.primary,
                width: wp(80),
                backgroundColor: theme.cardBackGround,
                marginHorizontal: 2,
                marginVertical: 10,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 0.5},
                shadowOpacity: 0.4,
                shadowRadius: 1,
                elevation: 5,
              }}
            />
          </View>
        </ScrollView>
      </View>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: theme.primary}}
      />
    </View>
  );
}
