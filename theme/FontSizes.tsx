import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const FontSizes = {
  extraSmall: RFValue(10, hp(100)),
  small: RFValue(12, hp(100)),
  medium: RFValue(14, hp(100)),
  large: RFValue(16, hp(100)),
  extraLarge: RFValue(20, hp(100)),
  xxLarge: RFValue(32, hp(100)),
};
