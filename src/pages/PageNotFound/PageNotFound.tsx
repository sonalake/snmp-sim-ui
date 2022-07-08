import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillQuestionCircle, AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { PageWrapper } from '../../components'

export const PageNotFound = () => (
  <PageWrapper>
    <div className="flex flex-col items-center">
      <AiFillQuestionCircle className="w-24 h-24 mt-48 mb-4 text-blue-700" />

      <h1 className="text-2xl mb-5">404</h1>

      <h4 className="text-base mb-10">Sorry, the page you visited does not exist.</h4>

      <Link to="/">
        <Button>
          <AiOutlineArrowLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  </PageWrapper>
)
