import styles from './TeamMember.module.scss';
import { uploadsUrl } from '@/utils/environment';
import { Commission, Orga } from '@/types';
import defaultImage from '@/../public/images/logo.webp';

export default function TeamMember({
  member,
  role,
  commission,
  image,
}: {
  /** The user to display. */
  member: Orga;
  /** Which role the user has, in the commission we are rendering this component for. */
  role: 'respo' | 'member';
  /** The commission we are rendering. */
  commission: Commission;
  /** The image of the user. If no image is given, it will take the image at the default link. */
  image?: string | undefined;
}) {
  let roleName = '';
  if (commission.id === 'coord') {
    roleName = role === 'respo' ? 'Présidente' : 'Coordinateur';
  } else {
    roleName = role === 'respo' ? 'Responsable' : 'Membre';
  }
  return (
    <div className={styles.member} style={{ '--team-color': commission.color } as React.CSSProperties}>
      <div className={styles.imgContainer}>
        <div className={styles.imageFont}></div>
        <img
          src={
            image ?? (member.photoFilename ? `${uploadsUrl()}/orgas/${member.photoFilename}.webp` : defaultImage.src)
          }
          alt={`${member.name ?? member.username}`}
        />
      </div>
      {member.name && <span>{member.name}</span>}
      {member.username && <span>{member.username}</span>}
      <span>{roleName}</span>
    </div>
  );
}
