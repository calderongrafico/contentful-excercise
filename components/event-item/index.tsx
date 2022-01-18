// vendors
import Image from 'next/image';
import Link from 'next/link';
// styles
import styles from '../../styles/EventItem.module.scss';

type Props = {
  date: string;
  description: string;
  photo: string;
  slug: string;
  speaker: string;
  title: string;
};

export const EventItem = ({ date, description, photo, slug, speaker, title }: Props) => {
  return (
    <div className={styles.eventItem}>
      <div className={styles.eventSpeaker}>
        <div className={styles.image}>
          <Image src={photo} layout="fill" alt={speaker} />
        </div>
        <span>{speaker}</span>
      </div>
      <div className={styles.eventInfo}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div>
          <span>{date.slice(0, -14)}</span>
          <Link href={`/events/${slug}`}>Take me there</Link>
        </div>
      </div>
    </div>
  );
};
