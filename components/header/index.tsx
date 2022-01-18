// vendors
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
// queries
import { HEADER_QUERY } from '../../utils/queries';
// styles
import styles from '../../styles/Header.module.scss';

interface NavItem {
  link: string;
  name: string;
}

export const Header: React.FC = () => {
  const [headerData, setHeaderData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const router = useRouter();
  const handleShowMenu = (): void => setShowMenu(!showMenu);

  useEffect(() => {
    const fetchHeaderData = async () => {
      const response = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_APP_SPACE_ID}?access_token=${process.env.NEXT_PUBLIC_APP_ACCESS_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: HEADER_QUERY }),
        }
      );
      const data = await response.json();
      setHeaderData(data);
      setIsLoading(false);
    };
    fetchHeaderData();
  }, []);

  if (isLoading) return <span>Loading...</span>;

  const { header } = headerData?.data;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer} onClick={() => router.push('/')}>
          <Image src={header.logo.url} alt="Startup Team A" width="250" height="70" />
        </div>
        <button onClick={handleShowMenu}>
          <Image src="/menu-icon.png" alt="Menu" width="100" height="100" />
        </button>
      </header>
      {showMenu && (
        <div className={styles.menu}>
          <button className={styles.closeMenu} onClick={handleShowMenu}>
            X
          </button>
          <ul>
            {header.navigationMenuItems.map((item: NavItem, index: number) => (
              <li onClick={handleShowMenu} key={index}>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
