// queries
import { ALL_EVENTS_QUERY } from '../../utils/queries';
// components
import { HomeBlock, EventItem } from '../../components';

interface SingleEvent {
  eventDate: string;
  eventDescription: string;
  speakerPhoto: object & { url: string };
  slug: string;
  eventSpeaker: string;
  eventTitle: string;
}

type Props = {
  events: object & {
    data: object & {
      eventCollection: object & {
        items: Array<SingleEvent>;
      };
    };
  };
};

export const getStaticProps = async () => {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_APP_SPACE_ID}?access_token=${process.env.NEXT_PUBLIC_APP_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ALL_EVENTS_QUERY }),
    }
  );
  const data = await response.json();

  return {
    props: { events: data },
  };
};

const Events = ({ events }: Props) => {
  const { items } = events?.data.eventCollection;

  return (
    <HomeBlock backgroundColor="#fff" blockTitle="All events">
      {items.map((item: SingleEvent, index: number) => (
        <EventItem
          key={index}
          date={item.eventDate}
          description={item.eventDescription}
          photo={item.speakerPhoto.url}
          slug={item.slug}
          speaker={item.eventSpeaker}
          title={item.eventTitle}
        />
      ))}
    </HomeBlock>
  );
};

export default Events;
