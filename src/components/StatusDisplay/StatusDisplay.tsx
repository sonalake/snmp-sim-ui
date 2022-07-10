import React, { FC, ReactNode } from 'react'
import { AiFillCloseCircle, AiFillQuestionCircle, AiOutlineWifi } from 'react-icons/ai'

const iconClassNames = 'w-24 h-24 mt-48 mb-4'

const icons = {
  pageNotFound: <AiFillQuestionCircle className={`${iconClassNames} text-blue-700`} />,
  noConnection: <AiOutlineWifi className={`${iconClassNames} text-gray-400`} />,
  error: <AiFillCloseCircle className={`${iconClassNames} text-red-600`} />,
}

export const StatusDisplay: FC<{
  icon: keyof typeof icons
  title: string
  subTitle?: string
  extraContent?: ReactNode
}> = ({ icon, title, subTitle, extraContent }) => {
  return (
    <div className="flex flex-col items-center">
      {icons[icon]}

      <h1 className="text-2xl mb-5">{title}</h1>

      {subTitle && <h4 className="text-base mb-10">{subTitle}</h4>}

      {extraContent && extraContent}
    </div>
  )
}
