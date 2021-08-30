import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useToggle from '../../../hooks/useToggle';
import { RootState } from '../../../redux/modules/reducer';
import UserProfilePresenter from './UserProfilePresenter';

const UserProfileContainer = () => {
    const { me, user, modifyProfileDone } = useSelector((state: RootState) => state.user);

    const [showProfileModal, showProfileModalToggle, setShowProfileModal] = useToggle(false);

    useEffect(() => {
        if (modifyProfileDone) {
            setShowProfileModal(false);
        }
    }, [modifyProfileDone]);

    return (
        <UserProfilePresenter
            user={user}
            isMe={me?.id === user?.id}
            showProfileModal={showProfileModal}
            showProfileModalToggle={showProfileModalToggle}
        />
    );
};

export default UserProfileContainer;
