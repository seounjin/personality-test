import React, { ReactNode } from 'react';
import { Form } from './FormLayout.style';

interface FormLayoutProps {
  id: string;
  onSubmit: (...props) => void;
  children: ReactNode;
}

const FormLayout = ({
  id,
  onSubmit,
  children,
}: FormLayoutProps): JSX.Element => {
  return (
    <Form id={id} onSubmit={onSubmit}>
      {children}
    </Form>
  );
};

export default FormLayout;
