// vendors
import Link from 'next/link';
// styles
import styles from '../../styles/HomeBlock.module.scss';

type Props = {
  backgroundColor: string;
  blockTitle: string;
  children: any;
  showMore?: string;
};

export const HomeBlock = ({ backgroundColor, blockTitle, children, showMore }: Props) => {
  return (
    <div style={{ backgroundColor }} className={styles.homeBlock} role="block-wrapper">
      <h2>{blockTitle}</h2>
      <div className={styles.homeBlockContainer} role="block-content">{children}</div>
      {showMore && (
        <div className={styles.showMore} role="show-more">
          <Link href={`/${showMore}`}>{`Show more ${showMore}`}</Link>
        </div>
      )}
    </div>
  );
};
