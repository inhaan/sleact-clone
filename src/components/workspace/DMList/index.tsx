import { CollapseButton } from '@components/common/styles';
import useUsers from '@hooks/dataFetch/useUsers';
import useWorkspaceMembers from '@hooks/dataFetch/useWorkspaceMembers';
import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface DMListProps {
  workspace?: string;
}

const DMList = ({ workspace }: DMListProps) => {
  const [dmCollapse, setDmCollapse] = useState(false);
  const { members } = useWorkspaceMembers(workspace);
  const { user } = useUsers();

  const toggleDmCollapse = useCallback(() => {
    setDmCollapse((prev) => !prev);
  }, []);

  return (
    <>
      <h2>
        <CollapseButton collapse={dmCollapse} onClick={toggleDmCollapse}>
          <i className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline" />
        </CollapseButton>
        <span>Direct Messages</span>
      </h2>
      <div>
        {!dmCollapse &&
          members?.map((member) => {
            const isOnline = true;
            return (
              <NavLink
                key={member.id}
                to={`/workspace/${workspace}/dm/${member.id}`}
                className={({ isActive }) => (isActive ? 'selected' : '')}
              >
                <i
                  className={`c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence  ${
                    isOnline ? 'c-presence--active c-icon--presence-online' : 'c-icon--presence-offline'
                  }`}
                />
                <span>{member.nickname}</span>
                {member.id === (user && user.id) && <span>&nbsp;(me)</span>}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default DMList;
