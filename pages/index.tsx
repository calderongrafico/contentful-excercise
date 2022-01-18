// queries
import { UPCOMING_EVENTS_QUERY } from '../utils/queries';
// components
import { HomeBlock, EventItem } from '../components';
interface SingleEvent {
  eventDate: string;
  eventDescription: string;
  speakerPhoto: object & { url: string };
  slug: string;
  eventSpeaker: string;
  eventTitle: string;
}

type Props = {
  upcomingEvents: object & { data: { eventCollection: { items: Array<SingleEvent> } } };
};

export const getStaticProps = async () => {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_APP_SPACE_ID}?access_token=${process.env.NEXT_PUBLIC_APP_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: UPCOMING_EVENTS_QUERY }),
    }
  );
  const data = await response.json();

  return {
    props: { upcomingEvents: data },
  };
};

const Home = ({ upcomingEvents }: Props) => {
  const { items } = upcomingEvents?.data.eventCollection;

  return (
    <>
      <HomeBlock blockTitle="Upcoming Events" backgroundColor="#BFFFFB" showMore="events">
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
    </>
  );
};

export default Home;
