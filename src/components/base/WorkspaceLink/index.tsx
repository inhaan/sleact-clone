import { Link } from 'react-router-dom';
import { IWorkspace } from '@typings/db';
import { getHeadChar } from '@utils/stringUtil';
import { WorkspaceButton } from './styles';
import { memo } from 'react';
import useUserDefault from '@hooks/useUserDefault';

interface WorkspaceLink {
  workspace: IWorkspace;
}

const WorkspaceLink = ({ workspace }: WorkspaceLink) => {
  const { channel } = useUserDefault(workspace);

  const button = <WorkspaceButton>{getHeadChar(workspace.name)}</WorkspaceButton>;

  if (!channel) {
    return button;
  }
  return <Link to={`/workspace/${workspace.url}/channel/${channel?.name}`}>{button}</Link>;
};

export default memo(WorkspaceLink);
