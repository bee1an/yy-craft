import { omitObject } from '@yy-ui/utils'
import { ExtractPropTypes } from 'vue'
import { scrollbarInternalProps } from '../../_internal'

export const scrollbarProps = omitObject(scrollbarInternalProps, ['container'])

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
