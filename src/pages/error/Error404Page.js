import React from 'react';
import ClientError from '../../components/error/ClientError';
import { PageTitle } from '../../components/common/pageTitle/PageTitle';

const Error404Page = () => {
  return (
    <>
      <PageTitle>{'Error 404'}</PageTitle>
      <ClientError />
    </>
  );
};

export default Error404Page;
