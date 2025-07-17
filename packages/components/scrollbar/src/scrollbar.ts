import type { ExtractPropTypes } from 'vue'
import { omitObject } from '@yy-craft/utils/src/object'
import { scrollbarInternalProps } from '../../_internal/scrollbar/src/scrollbar'

export const scrollbarProps = omitObject(scrollbarInternalProps, ['container'])

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
