export interface Event {
    id?: string; // The unique identifier of the event
    prospectId: string;
    type: string; // The type of the event, such as "birthday", "property sale", "insider trading", "gift", etc.
    eventRaw: string; // The raw text of the event, such as a news article or a social media post (or internal link)
    eventHtml: string; // The raw HTML of the event, such as a news article or a social media post (or internal link)
    eventDate: Date; // The date of the event, such as a birthday or a property sale. If none, it will be the date of the event creation.
    eventUrl: string; // The URL of the event, such as a news article or a social media post (or internal link)
    status: string; // The status of the event, such as "new", "viewed", "ignored", etc.
    viewedAt?: Date; // The date when the event was first viewed by the user
    createdAt: Date; // The date when the event was created
    tags?: string[]; // The tags associated with the event, such as "important", "urgent", etc.
}