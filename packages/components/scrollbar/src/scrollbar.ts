import { pickObject } from '@yy-ui/utils'
import { ExtractPropTypes } from 'vue'
import { scrollbarInternalProps } from '../../_internal'

export const scrollbarProps = pickObject(scrollbarInternalProps, ['trigger'])

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
