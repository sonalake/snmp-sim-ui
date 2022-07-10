import { Button } from 'flowbite-react'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { PageWrapper, StatusDisplay } from '../../components'

export const PageNotFound = () => (
  <PageWrapper>
    <StatusDisplay
      icon="pageNotFound"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extraContent={
        <Link to="/">
          <Button>
            <AiOutlineArrowLeft className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Button>
        </Link>
      }
    />
  </PageWrapper>
)
