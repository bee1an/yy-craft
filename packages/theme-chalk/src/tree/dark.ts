import { rgba } from '@yy-craft/utils'
import { commonDark } from '../common'

export const treeDark = {
	name: 'tree',
	vars: () => ({
		treeWrapperPadding: '2px 0',
		treePadding: '1px 0',
		treeBackgroundColorHover: '#f5f5f5',
		treeBorder: '2px solid ' + commonDark.primaryColor,
		treeBottomBorderPos: '-4px',
		treeBottomBorderHeight: '2px',
		treeBottomBorderBackgroundColor: commonDark.primaryColor,
		treeTextFontSize: '14px',
		treeExpandedIconRotate: '90deg',
		treeSelectedBackgroundColor: rgba(commonDark.primaryColor, 0.1),
		treeIndentSize: '21px',
		treeIconSize: '24px',
		treeIconTransitionTime: '0.3s'
	})
}
