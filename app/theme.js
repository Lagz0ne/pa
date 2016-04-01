import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

import ThemeManager from 'material-ui/lib/styles/theme-manager';

const Theme = {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Open Sans, sans-serif',
  palette: {
    primary1Color: Colors.indigo500,
    primary2Color: Colors.indigo700,
    primary3Color: Colors.indigo100,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey700,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey500,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.4),
    pickerHeaderColor: Colors.cyan500,
  }
};

export default ThemeManager.getMuiTheme(Theme);
