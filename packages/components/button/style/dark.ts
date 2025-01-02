import { rgba } from '@yy-ui/utils'
import { commonDark } from '@yy-ui/yy-ui'

export const buttonDark = {
  name: 'button',
  vars: {
    buttonHeight: commonDark.heightMedium,
    buttonPadding: '0 15px',
    buttonBorder: '1px solid transparent',
    buttonBorderRadius: commonDark.borderRadius,
    buttonFontSize: commonDark.fontSize,
    buttonTransitionTime: '0.3s',
    cubicBezierEaseInOut: commonDark.cubicBezierEaseInOut,
    buttonColor: '#333639',
    buttonBorderColor: '#e0e0e6',
    buttonBackgroundColor: commonDark.transparent,
    buttonColorHover: commonDark.primaryColorHover,
    buttonBorderColorHover: commonDark.primaryColorHover,
    buttonBackgroundColorHover: commonDark.transparent,
    buttonColorActive: commonDark.primaryColorPressed,
    buttonBorderColorActive: commonDark.primaryColorPressed,
    buttonBackgroundColorActive: commonDark.transparent,
    buttonFontWeightStrong: commonDark.fontWeightStrong
  }
}

export const buttonDarkColors = {
  default: {
    default: {
      buttonColor: commonDark.textColor1,
      buttonBorderColor: commonDark.borderColor,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.primaryColorHover,
      buttonBorderColorHover: commonDark.primaryColorHover,
      buttonBackgroundColorHover: commonDark.transparent,
      buttonColorActive: commonDark.primaryColorPressed,
      buttonBorderColorActive: commonDark.primaryColorPressed,
      buttonBackgroundColorActive: commonDark.transparent
    },
    secondary: {
      buttonColor: commonDark.textColor1,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.buttonColor2,
      buttonColorHover: commonDark.textColor1,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.textColor1,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    tertiary: {
      buttonColor: commonDark.textColor1,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.buttonColor2,
      buttonColorHover: commonDark.textColor1,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.textColor1,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    quaternary: {
      buttonColor: commonDark.textColor1,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.textColor1,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.textColor1,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    dashed: {
      buttonColor: commonDark.textColor1,
      buttonBorderColor: commonDark.borderColor,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.primaryColorHover,
      buttonBorderColorHover: commonDark.primaryColorHover,
      buttonBackgroundColorHover: commonDark.transparent,
      buttonColorActive: commonDark.primaryColorPressed,
      buttonBorderColorActive: commonDark.primaryColorPressed,
      buttonBackgroundColorActive: commonDark.transparent,
      buttonBorderStyle: 'dashed'
    }
  },
  tertiary: {
    default: {
      buttonColor: commonDark.textColor2,
      buttonBorderColor: commonDark.borderColor,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.primaryColorHover,
      buttonBorderColorHover: commonDark.primaryColorHover,
      buttonBackgroundColorHover: commonDark.transparent,
      buttonColorActive: commonDark.primaryColorPressed,
      buttonBorderColorActive: commonDark.primaryColorPressed,
      buttonBackgroundColorActive: commonDark.transparent
    },
    secondary: {
      buttonColor: commonDark.textColor2,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.buttonColor2,
      buttonColorHover: commonDark.textColor2,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.textColor1,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    tertiary: {
      buttonColor: commonDark.textColor2,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.buttonColor2,
      buttonColorHover: commonDark.textColor2,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.textColor1,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    quaternary: {
      buttonColor: commonDark.textColor2,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.textColor2,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.textColor1,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    dashed: {
      buttonColor: commonDark.textColor2,
      buttonBorderColor: commonDark.borderColor,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.primaryColorHover,
      buttonBorderColorHover: commonDark.primaryColorHover,
      buttonBackgroundColorHover: commonDark.transparent,
      buttonColorActive: commonDark.primaryColorPressed,
      buttonBorderColorActive: commonDark.primaryColorPressed,
      buttonBackgroundColorActive: commonDark.transparent,
      buttonBorderStyle: 'dashed'
    }
  },
  primary: {
    default: {
      buttonColor: '#ffffff',
      buttonBorderColor: commonDark.primaryColor,
      buttonBackgroundColor: commonDark.primaryColor,
      buttonColorHover: '#ffffff',
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.primaryColorHover,
      buttonColorActive: '#ffffff',
      buttonBorderColorActive: commonDark.primaryColorPressed,
      buttonBackgroundColorActive: commonDark.primaryColorPressed
    },
    secondary: {
      buttonColor: commonDark.primaryColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: rgba(commonDark.primaryColor, 0.16),
      buttonColorHover: commonDark.primaryColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: rgba(commonDark.primaryColor, 0.22),
      buttonColorActive: commonDark.primaryColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: rgba(commonDark.primaryColor, 0.28)
    },
    tertiary: {
      buttonColor: commonDark.primaryColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.buttonColor2,
      buttonColorHover: commonDark.primaryColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.primaryColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    quaternary: {
      buttonColor: commonDark.primaryColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.primaryColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.primaryColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    dashed: {
      buttonColor: commonDark.primaryColor,
      buttonBorderColor: commonDark.primaryColor,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.primaryColor,
      buttonBorderColorHover: commonDark.primaryColor,
      buttonBackgroundColorHover: commonDark.transparent,
      buttonColorActive: commonDark.primaryColorPressed,
      buttonBorderColorActive: commonDark.primaryColorPressed,
      buttonBackgroundColorActive: commonDark.transparent,
      buttonBorderStyle: 'dashed'
    }
  },
  success: {
    default: {
      buttonColor: '#ffffff',
      buttonBorderColor: commonDark.successColor,
      buttonBackgroundColor: commonDark.successColor,
      buttonColorHover: '#ffffff',
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.successColorHover,
      buttonColorActive: '#ffffff',
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.successColorPressed
    },
    secondary: {
      buttonColor: commonDark.successColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: rgba(commonDark.successColor, 0.16),
      buttonColorHover: commonDark.successColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: rgba(commonDark.successColor, 0.22),
      buttonColorActive: commonDark.successColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: rgba(commonDark.successColor, 0.28)
    },
    tertiary: {
      buttonColor: commonDark.successColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.buttonColor2,
      buttonColorHover: commonDark.successColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.successColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    quaternary: {
      buttonColor: commonDark.successColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.successColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.successColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    dashed: {
      buttonColor: commonDark.successColor,
      buttonBorderColor: commonDark.successColor,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.successColor,
      buttonBorderColorHover: commonDark.successColor,
      buttonBackgroundColorHover: commonDark.transparent,
      buttonColorActive: commonDark.successColorPressed,
      buttonBorderColorActive: commonDark.successColorPressed,
      buttonBackgroundColorActive: commonDark.transparent,
      buttonBorderStyle: 'dashed'
    }
  },
  warning: {
    default: {
      buttonColor: '#ffffff',
      buttonBorderColor: commonDark.warningColor,
      buttonBackgroundColor: commonDark.warningColor,
      buttonColorHover: '#ffffff',
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.warningColorHover,
      buttonColorActive: '#ffffff',
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.warningColorPressed
    },
    secondary: {
      buttonColor: commonDark.warningColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: rgba(commonDark.warningColor, 0.16),
      buttonColorHover: commonDark.warningColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: rgba(commonDark.warningColor, 0.22),
      buttonColorActive: commonDark.warningColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: rgba(commonDark.warningColor, 0.28)
    },
    tertiary: {
      buttonColor: commonDark.warningColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.buttonColor2,
      buttonColorHover: commonDark.warningColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.warningColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    quaternary: {
      buttonColor: commonDark.warningColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.warningColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.warningColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    dashed: {
      buttonColor: commonDark.warningColor,
      buttonBorderColor: commonDark.warningColor,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.warningColor,
      buttonBorderColorHover: commonDark.warningColor,
      buttonBackgroundColorHover: commonDark.transparent,
      buttonColorActive: commonDark.warningColorPressed,
      buttonBorderColorActive: commonDark.warningColorPressed,
      buttonBackgroundColorActive: commonDark.transparent,
      buttonBorderStyle: 'dashed'
    }
  },
  error: {
    default: {
      buttonColor: '#ffffff',
      buttonBorderColor: commonDark.errorColor,
      buttonBackgroundColor: commonDark.errorColor,
      buttonColorHover: '#ffffff',
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.errorColorHover,
      buttonColorActive: '#ffffff',
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.errorColorPressed
    },
    secondary: {
      buttonColor: commonDark.errorColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: rgba(commonDark.errorColor, 0.16),
      buttonColorHover: commonDark.errorColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: rgba(commonDark.errorColor, 0.22),
      buttonColorActive: commonDark.errorColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: rgba(commonDark.errorColor, 0.28)
    },
    tertiary: {
      buttonColor: commonDark.errorColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.buttonColor2,
      buttonColorHover: commonDark.errorColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.errorColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    quaternary: {
      buttonColor: commonDark.errorColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.errorColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.errorColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    dashed: {
      buttonColor: commonDark.errorColor,
      buttonBorderColor: commonDark.errorColor,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.errorColor,
      buttonBorderColorHover: commonDark.errorColor,
      buttonBackgroundColorHover: commonDark.transparent,
      buttonColorActive: commonDark.errorColorPressed,
      buttonBorderColorActive: commonDark.errorColorPressed,
      buttonBackgroundColorActive: commonDark.transparent,
      buttonBorderStyle: 'dashed'
    }
  },
  info: {
    default: {
      buttonColor: '#ffffff',
      buttonBorderColor: commonDark.infoColor,
      buttonBackgroundColor: commonDark.infoColor,
      buttonColorHover: '#ffffff',
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.infoColorHover,
      buttonColorActive: '#ffffff',
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.infoColorPressed
    },
    secondary: {
      buttonColor: commonDark.infoColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: rgba(commonDark.infoColor, 0.16),
      buttonColorHover: commonDark.infoColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: rgba(commonDark.infoColor, 0.22),
      buttonColorActive: commonDark.infoColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: rgba(commonDark.infoColor, 0.28)
    },
    tertiary: {
      buttonColor: commonDark.infoColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.buttonColor2,
      buttonColorHover: commonDark.infoColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.infoColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    quaternary: {
      buttonColor: commonDark.infoColor,
      buttonBorderColor: commonDark.transparent,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.infoColor,
      buttonBorderColorHover: commonDark.transparent,
      buttonBackgroundColorHover: commonDark.buttonColor2Hover,
      buttonColorActive: commonDark.infoColor,
      buttonBorderColorActive: commonDark.transparent,
      buttonBackgroundColorActive: commonDark.buttonColor2Pressed
    },
    dashed: {
      buttonColor: commonDark.infoColor,
      buttonBorderColor: commonDark.infoColor,
      buttonBackgroundColor: commonDark.transparent,
      buttonColorHover: commonDark.infoColor,
      buttonBorderColorHover: commonDark.infoColor,
      buttonBackgroundColorHover: commonDark.transparent,
      buttonColorActive: commonDark.infoColorPressed,
      buttonBorderColorActive: commonDark.infoColorPressed,
      buttonBackgroundColorActive: commonDark.transparent,
      buttonBorderStyle: 'dashed'
    }
  }
}
