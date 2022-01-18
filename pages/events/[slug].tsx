// vendors
import Image from 'next/image';
// queries
import { ALL_EVENTS_QUERY, EVENT_DETAIL_QUERY } from '../../utils/queries';
// styles
import styles from '../../styles/EventDetail.module.scss';
import React from 'react';

type SingleEvent = {
  slug: string;
};

type Context = {
  context: object;
};

export const getStaticPaths = async () => {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_APP_SPACE_ID}?access_token=${process.env.NEXT_PUBLIC_APP_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ALL_EVENTS_QUERY }),
    }
  );
  const data = await response.json();

  const paths = data.data.eventCollection.items.map((singleEvent: SingleEvent) => {
    return {
      params: { slug: singleEvent.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: Context & { params: { slug: string } }) => {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_APP_SPACE_ID}?access_token=${process.env.NEXT_PUBLIC_APP_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: EVENT_DETAIL_QUERY,
        variables: { slug: context.params.slug },
      }),
    }
  );
  const data = await response.json();

  return {
    props: { detailData: data },
  };
};

const EventDetail: React.FC = ({ detailData }: any) => {
  const { eventDate, eventDescription, eventSpeaker, eventTitle, speakerPhoto } =
    detailData.data.eventCollection.items[0];

  return (
    <div className={styles.eventDetail}>
      <h2>{eventTitle}</h2>
      <span>{eventDate.slice(0, -14)}</span>
      <div className={styles.speaker}>
        <Image src={speakerPhoto.url} layout="fill" alt={eventSpeaker} />
      </div>
      <h4>{eventSpeaker}</h4>
      <p>{eventDescription}</p>
    </div>
  );
};

export default EventDetail;
