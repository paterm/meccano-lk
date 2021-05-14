import React, { useState } from 'react';
import { classes } from '@utils';
import { IMessage } from '@interfaces';
import Button from '@components/ui/Button/Button';
import Input from '@components/ui/Input/Input';
import Checkbox from '@components/ui/Checkbox/Checkbox';
import defaultAvatar from '@assets/images/defaultAvatar.jpg';
import './AssignmentPanel.css'

const cls = classes('assignment-panel');

interface IAssignmentPanel {
  className?: string
  data: IMessage
  onClose: () => void
}

const fetchUsers = [
  { isChecked: false, user: 'Анна Полякова' },
  { isChecked: false, user: 'Алексей Иванов' },
  { isChecked: false, user: 'Андрей Краснов' },
]

const AssignmentPanel: React.FC<IAssignmentPanel> = (props) => {
  const {
    className: mix,
    onClose,
    // data
  } = props;

  const [users, setUsers] = useState(fetchUsers);
  const [message, setMessage] = useState('');

  const handleSelectUser = (user: string, status: boolean) => {
    const updatedUsers = [...users];
    const currentUser = updatedUsers.find((t) => t.user === user);
    if (currentUser) {
      currentUser.isChecked = status
      setUsers(updatedUsers);
    }
  };

  const handleAssignment = () => {
    setMessage('');
  };

  const handleInputMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div { ...cls('', '', mix) }>
      <Input
        { ...cls('input-search') }
        type="search"
        placeholder="Быстрый поиск тегов"
        size={ 32 }
      />
      <ul { ...cls('user-list') }>
        { users.map(({ user, isChecked }, index) => (
          <li
            { ...cls('user-item') }
            key={ user + index }
          >
            <Checkbox
              { ...cls('checkbox') }
              checked={ isChecked }
              onChange={ (status) => handleSelectUser(user, status) }
            >
              <img
                { ...cls('user-avatar') }
                src={ defaultAvatar }
                alt=""
              />
              <div>{ user }</div>
            </Checkbox>
          </li>
        )) }
      </ul>
      <textarea
        { ...cls('input-message') }
        placeholder="Оставьте комментарий ..."
        onChange={ handleInputMessage }
        value={ message }
      />
      <Button
        { ...cls('button-assign') }
        size={ 36 }
        color="coral"
        filled
        square
        onClick={ handleAssignment }
      >
        Назначить
      </Button>
      <Button
        { ...cls('button-cancel') }
        size={ 36 }
        color="gray"
        square
        onClick={ onClose }
      >
        Отмена
      </Button>
    </div>
  );
};

export default AssignmentPanel;
