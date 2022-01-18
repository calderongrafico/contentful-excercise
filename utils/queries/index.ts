export const HEADER_QUERY = `query GetHeader {
  header(id: "3oFMh915ziybDQE8t5rxpd") {
    logo {
      url
    }
    navigationMenuItems
  }
}`;

export const UPCOMING_EVENTS_QUERY = `query GetUpcomingEvents {
  eventCollection(where: {eventDate_lt: "2022-06-30"}, order: eventDate_ASC) {
    items {
      eventDate
      eventTitle
      eventSpeaker
      eventDescription
      slug
      speakerPhoto {
        url
      }
    }
  }
}
`;

export const ALL_EVENTS_QUERY = `query GetAllEvents {
  eventCollection(order: eventDate_ASC) {
    items {
      eventDate
      eventTitle
      eventSpeaker
      eventDescription
      slug
      speakerPhoto {
        url
      }
    }
  }
}
`;

export const EVENT_DETAIL_QUERY = `query GetEventDetail($slug: String) {
  eventCollection(where: {slug: $slug}) {
    items {
      eventTitle
      eventSpeaker
      speakerPhoto {
        url
      }
      eventDate
      eventDescription
    }
  }
}
`;
