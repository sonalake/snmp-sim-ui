import React from 'react'
import { HiOutlineArrowLeft, HiQuestionMarkCircle } from 'react-icons/hi'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { PageWrapper } from '../../components'

export const PageNotFound = () => {
  return (
    <PageWrapper>
      <div className="w-full h-full m-auto flex flex-col items-center justify-center">
        <HiQuestionMarkCircle className="mb-2 h-10 w-10" />

        <h1>404</h1>

        <h4>Sorry, the page you visited does not exist.</h4>

        <Link to="/" className="mt-8">
          <Button>
            <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </PageWrapper>
  )
}
