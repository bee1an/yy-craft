import { omitObject } from '@yy-ui/utils/src/object'
import { ExtractPropTypes } from 'vue'
import { scrollbarInternalProps } from '../../_internal/scrollbar/src/scrollbar'

export const scrollbarProps = omitObject(scrollbarInternalProps, ['container'])

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
