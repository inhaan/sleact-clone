import { Link } from 'react-router-dom';
import { IWorkspace } from '@typings/db';
import { getHeadChar } from '@utils/stringUtil';
import { WorkspaceButton } from './styles';
import { memo } from 'react';

interface WorkspaceLink {
  workspace: IWorkspace;
}

const WorkspaceLink = ({ workspace }: WorkspaceLink) => {
  return (
    <Link to={`/workspace/${workspace.url}`}>
      <WorkspaceButton>{getHeadChar(workspace.name)}</WorkspaceButton>
    </Link>
  );
};

export default memo(WorkspaceLink);
