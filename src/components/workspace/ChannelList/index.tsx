import { CollapseButton } from '@components/common/styles';
import useChannels from '@hooks/dataFetch/useChannels';
import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface ChannelListProps {
  workspace?: string;
}

const ChannelList = ({ workspace }: ChannelListProps) => {
  const [channelCollpase, setChannelCollapse] = useState(false);
  const { channels } = useChannels(workspace);

  const toggleChanngelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollpase} onClick={toggleChanngelCollapse}>
          <i className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline" />
        </CollapseButton>
        <span>Channels</span>
      </h2>
      <div>
        {!channelCollpase &&
          channels?.map((channel) => (
            <NavLink
              key={channel.id}
              to={`/workspace/${workspace}/channel/${channel.name}`}
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              <span># {channel.name}</span>
            </NavLink>
          ))}
      </div>
    </>
  );
};

export default ChannelList;
