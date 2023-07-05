import React from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

import { PageWrapper, StatusDisplay } from '../../components';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';

export const PageNotFound = () => (
  <PageWrapper>
    <StatusDisplay
      icon='pageNotFound'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extraContent={
        <Link to='/'>
          <Button>
            <ButtonIcon as={HiOutlineArrowLeft} />
            Back
          </Button>
        </Link>
      }
    />
  </PageWrapper>
);
