import { Alert as FlowbiteAlert } from 'flowbite-react'
import React, { FC, FunctionComponent, ReactNode, SVGProps } from 'react'
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillExclamationCircle,
  AiFillInfoCircle,
  AiFillQuestionCircle,
} from 'react-icons/ai'

type AlertColors = 'success' | 'info' | 'gray' | 'warning' | 'failure'

const icons: Record<AlertColors, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  success: AiFillCheckCircle,
  info: AiFillInfoCircle,
  gray: AiFillQuestionCircle,
  warning: AiFillExclamationCircle,
  failure: AiFillCloseCircle,
}

export const Alert: FC<{ message: string; color: AlertColors; additionalContent?: ReactNode }> = ({
  message,
  color,
  additionalContent,
}) => (
  <FlowbiteAlert color={color} icon={icons[color]} additionalContent={additionalContent}>
    <span className="font-medium">{message}</span>
  </FlowbiteAlert>
)
