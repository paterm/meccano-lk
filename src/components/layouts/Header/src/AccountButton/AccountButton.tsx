import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../../../../interfaces';
import { classes } from '../../../../../utils/helpers';

const cls = classes('')

const AccountButton: React.FC = () => {
  const profile = useSelector((state: IStore) => state.profile);

  return (
    <div >

    </div>
  );
};
