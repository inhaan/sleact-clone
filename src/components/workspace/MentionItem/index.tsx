import useWorkspaceMembers from '@hooks/dataFetch/useWorkspaceMembers';
import { SuggestionDataItem } from 'react-mentions';
import gravatar from 'gravatar';
import SkeletonizedImage from '@components/base/SkeletonizedImage';
import { EachMention } from '@components/common/styles';

interface MentionItemProps {
  workspace?: string;
  suggestion: SuggestionDataItem;
  search: string;
  highlightedDisplay: React.ReactNode;
  index: number;
  focused: boolean;
}

const MentionItem = ({ workspace, suggestion, highlightedDisplay, focused }: MentionItemProps) => {
  const { members } = useWorkspaceMembers(workspace);
  const member = members?.find((member) => member.id === suggestion.id);

  if (!members || !member) return null;
  return (
    <EachMention focus={focused}>
      <SkeletonizedImage
        width={20}
        height={20}
        src={gravatar.url(member.email, { s: '20px', d: 'retro' })}
        alt={member.nickname}
      />
      <span>{highlightedDisplay}</span>
    </EachMention>
  );
};

export default MentionItem;
